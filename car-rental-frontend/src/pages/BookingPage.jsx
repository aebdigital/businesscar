import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import Button from '../components/Button';
import CarImage from '../components/CarImage';
import DatePicker from '../components/DatePicker';
import { carsAPI, bookingAPI, authAPI } from '../services/api';

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedCarId = searchParams.get('car');
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [bookingResult, setBookingResult] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [unavailableDates, setUnavailableDates] = useState([]);
  
  const [formData, setFormData] = useState({
    // Step 1: Rental Details
    pickupDate: null,
    returnDate: null,
    pickupLocation: {
      name: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'US'
    },
    returnLocation: {
      name: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'US'
    },
    
    // Step 2: Personal Information (for new customers)
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    dateOfBirth: '',
    licenseNumber: '',
    licenseExpiry: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'US'
    },
    
    // Step 3: Extras
    additionalDrivers: [],
    specialRequests: '',
    // Extras for pricing (if needed)
    gps: false,
    childSeat: false,
    fullInsurance: false
  });

  const steps = [
    { number: 1, title: 'Rental Details' },
    { number: 2, title: 'Customer Info' },
    { number: 3, title: 'Review & Confirm' }
  ];

  // Predefined locations
  const locations = [
    {
      name: 'Downtown Office',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US'
    },
    {
      name: 'Airport Location',
      address: 'JFK Airport Terminal 1',
      city: 'Queens',
      state: 'NY',
      postalCode: '11430',
      country: 'US'
    },
    {
      name: 'Midtown Branch',
      address: '456 5th Avenue',
      city: 'New York',
      state: 'NY',
      postalCode: '10018',
      country: 'US'
    }
  ];

  // Load selected car and current user
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Parse URL parameters for pre-filled data
        const pickupDateParam = searchParams.get('pickupDate');
        const returnDateParam = searchParams.get('returnDate');
        const pickupLocationParam = searchParams.get('pickupLocation');
        const returnLocationParam = searchParams.get('returnLocation');
        
        // Load current user if logged in
        const user = await authAPI.getCurrentUser();
        setCurrentUser(user);
        
        // If user is logged in, pre-fill form data
        if (user) {
          setFormData(prev => ({
            ...prev,
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
            phone: user.phone || '',
            dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split('T')[0] : '',
            licenseNumber: user.licenseNumber || '',
            licenseExpiry: user.licenseExpiry ? user.licenseExpiry.split('T')[0] : '',
            address: user.address || prev.address
          }));
        }
        
        // Pre-fill dates and locations from URL parameters
        setFormData(prev => ({
          ...prev,
          pickupDate: pickupDateParam ? new Date(pickupDateParam) : prev.pickupDate,
          returnDate: returnDateParam ? new Date(returnDateParam) : prev.returnDate,
          pickupLocation: pickupLocationParam ? { name: pickupLocationParam } : prev.pickupLocation,
          returnLocation: returnLocationParam ? { name: returnLocationParam } : prev.returnLocation,
        }));
        
        // Load selected car
        if (selectedCarId) {
          const car = await carsAPI.getCarDetails(selectedCarId);
          setSelectedCar(car);
          
          // Load initial availability for next 6 months
          const startDate = new Date();
          const endDate = new Date();
          endDate.setMonth(endDate.getMonth() + 6);
          
          try {
            const availability = await carsAPI.getCarAvailability(selectedCarId, startDate, endDate);
            setUnavailableDates(availability.unavailableDates || []);
          } catch (err) {
            console.warn('Could not load availability:', err);
            setUnavailableDates([]);
          }
        } else {
          navigate('/fleet');
        }
      } catch (err) {
        console.error('Failed to load data:', err);
        setError('Failed to load booking data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedCarId, navigate, searchParams]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleDateSelect = (field, date) => {
    setFormData(prev => {
      const updated = {
        ...prev,
        [field]: date
      };
      
      // If pickup date is selected and is after return date, clear return date
      if (field === 'pickupDate' && prev.returnDate && date >= prev.returnDate) {
        updated.returnDate = null;
      }
      
      return updated;
    });
  };

  const handleLocationChange = (locationType, locationIndex) => {
    const selectedLocation = locations[locationIndex];
    setFormData(prev => ({
      ...prev,
      [locationType]: selectedLocation
    }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate dates
      const pickupDate = new Date(formData.pickupDate);
      const returnDate = new Date(formData.returnDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (pickupDate < today) {
        throw new Error('Dátum prevzatia nemôže byť v minulosti');
      }

      if (returnDate <= pickupDate) {
        throw new Error('Dátum vrátenia musí byť po dátume prevzatia');
      }

      // Prepare booking data
      const bookingData = {
        selectedCarId,
        startDate: formData.pickupDate.toISOString().split('T')[0],
        endDate: formData.returnDate.toISOString().split('T')[0],
        pickupLocation: formData.pickupLocation,
        dropoffLocation: formData.returnLocation,
        additionalDrivers: formData.additionalDrivers,
        specialRequests: formData.specialRequests
      };

      // Prepare customer data for new customers
      let customerData = null;
      if (!currentUser) {
        // Debug logging
        console.log('Raw form data before validation:', {
          firstName: formData.firstName,
          lastName: formData.lastName, 
          email: formData.email,
          phone: formData.phone,
          licenseNumber: formData.licenseNumber,
          licenseExpiry: formData.licenseExpiry,
          dateOfBirth: formData.dateOfBirth
        });

        // Validate required fields (check for both null/undefined and empty strings)
        const requiredFields = {
          firstName: formData.firstName?.trim(),
          lastName: formData.lastName?.trim(),
          email: formData.email?.trim(),
          phone: formData.phone?.trim(),
          licenseNumber: formData.licenseNumber?.trim(),
          licenseExpiry: formData.licenseExpiry?.trim(),
          dateOfBirth: formData.dateOfBirth?.trim()
        };

        // Check for missing required fields
        const missingFields = Object.entries(requiredFields)
          .filter(([key, value]) => !value || value === '')
          .map(([key]) => key);

        console.log('Missing fields:', missingFields);
        console.log('Required fields after trim:', requiredFields);

        if (missingFields.length > 0) {
          throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
        }

        // Validate phone number (ensure it's a string and remove any formatting)
        if (!formData.phone || formData.phone.trim() === '') {
          throw new Error('Phone number is required');
        }
        
        const cleanPhone = formData.phone.toString().replace(/\D/g, '');
        console.log('Phone validation:', {
          original: formData.phone,
          cleaned: cleanPhone,
          length: cleanPhone.length
        });
        
        if (cleanPhone.length < 10) {
          throw new Error('Please provide a valid phone number (minimum 10 digits)');
        }

        // Validate license expiry date  
        if (!formData.licenseExpiry || formData.licenseExpiry.trim() === '') {
          throw new Error('License expiry date is required');
        }
        
        const licenseExpiryDate = new Date(formData.licenseExpiry);
        console.log('License expiry validation:', {
          original: formData.licenseExpiry,
          asDate: licenseExpiryDate,
          isValid: !isNaN(licenseExpiryDate.getTime()),
          today: today
        });
        
        if (isNaN(licenseExpiryDate.getTime())) {
          throw new Error('Please provide a valid license expiry date');
        }
        
        if (licenseExpiryDate <= today) {
          throw new Error('License expiry date must be in the future');
        }

        customerData = {
          firstName: requiredFields.firstName,
          lastName: requiredFields.lastName,
          email: requiredFields.email,
          password: formData.password?.trim() || 'customer123', // Default password if not provided
          phone: cleanPhone, // Use the cleaned phone number
          licenseNumber: requiredFields.licenseNumber,
          licenseExpiry: formData.licenseExpiry, // Should be in YYYY-MM-DD format
          dateOfBirth: formData.dateOfBirth, // Should be in YYYY-MM-DD format
          address: formData.address?.street?.trim() ? formData.address : {
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            postalCode: '10001',
            country: 'US'
          }
        };

        // Debug logging
        console.log('Sending customer data:', customerData);
        console.log('Form data:', formData);
        console.log('License Expiry:', formData.licenseExpiry, 'Type:', typeof formData.licenseExpiry);
        console.log('Phone:', formData.phone, 'Cleaned Phone:', cleanPhone, 'Length:', cleanPhone.length);
        console.log('All Required Fields:', requiredFields);
        
        console.log('Final booking data:', bookingData);
        console.log('Final customer data:', customerData);
      }

      // Complete booking
      const result = await bookingAPI.completeBooking(bookingData, customerData);
      
      setBookingResult(result);
      setCurrentStep(4); // Move to confirmation step
      
    } catch (err) {
      console.error('Booking failed:', err);
      setError(err.message || 'Rezervácia sa nepodarila. Skúste to znovu.');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!selectedCar || !formData.pickupDate || !formData.returnDate) return 0;
    
    const days = Math.ceil((formData.returnDate - formData.pickupDate) / (1000 * 60 * 60 * 24));
    let total = selectedCar.dailyRate * days;
    
    // Add extras if needed
    if (formData.gps) total += 5 * days;
    if (formData.childSeat) total += 8 * days;
    if (formData.fullInsurance) total += 25 * days;
    
    return total;
  };

  const calculateDays = () => {
    if (!formData.pickupDate || !formData.returnDate) return 0;
    return Math.ceil((formData.returnDate - formData.pickupDate) / (1000 * 60 * 60 * 24));
  };

  if (loading && !selectedCar) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-gray-600">Načítavajú sa detaily rezervácie...</p>
        </div>
      </div>
    );
  }

  if (error && !selectedCar) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Chyba rezervácie</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => navigate('/fleet')}>
            Späť na flotilu
          </Button>
        </div>
      </div>
    );
  }

  // Confirmation step
  if (currentStep === 4 && bookingResult) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-green-500 mb-6">
              <CheckCircleIcon className="w-16 h-16 mx-auto" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-gray-600 mb-8">
              Your reservation has been successfully created.
            </p>
            
            {/* New account credentials info */}
            {bookingResult.credentials && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">
                  🎉 Account Created Successfully!
                </h3>
                <p className="text-blue-800 mb-4">
                  We've created a customer account for you. Save these login credentials:
                </p>
                <div className="bg-white rounded-md p-4 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <strong>Email:</strong><br />
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">{bookingResult.credentials.email}</code>
                    </div>
                    <div>
                      <strong>Password:</strong><br />
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">{bookingResult.credentials.password}</code>
                    </div>
                  </div>
                </div>
                <p className="text-blue-700 mt-3 text-sm">
                  You can use these credentials to log in and manage your reservations in the future.
                </p>
              </div>
            )}
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Reservation Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div>
                  <strong>Reservation Number:</strong><br />
                  {bookingResult.reservation.reservationNumber || bookingResult.reservation._id}
                </div>
                <div>
                  <strong>Vehicle:</strong><br />
                  {bookingResult.car.brand} {bookingResult.car.model} ({bookingResult.car.year})
                </div>
                <div>
                  <strong>Pickup Date:</strong><br />
                  {formData.pickupDate?.toLocaleDateString()}
                </div>
                <div>
                  <strong>Return Date:</strong><br />
                  {formData.returnDate?.toLocaleDateString()}
                </div>
                <div>
                  <strong>Total Cost:</strong><br />
                  ${bookingResult.costs.totalCost}{bookingResult.costs.deposit > 0 ? ` (including $${bookingResult.costs.deposit} deposit)` : ''}
                </div>
                <div>
                  <strong>Rental Days:</strong><br />
                  {bookingResult.costs.days} days
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/fleet')}>
                Browse More Cars
              </Button>
              <Button variant="outline" onClick={() => navigate('/')}>
                Back to Home
              </Button>
              {bookingResult.credentials && (
                <Button variant="accent" onClick={() => {
                  // Auto-login the user with new credentials
                  authAPI.login(bookingResult.credentials.email, bookingResult.credentials.password)
                    .then(() => {
                      navigate('/reservations'); // Assuming there's a reservations page
                    })
                    .catch(() => {
                      navigate('/'); // Fallback to home if login fails
                    });
                }}>
                  Login to Your Account
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Booking</h1>
          <p className="text-gray-600 mt-2">
            Just a few steps to secure your rental car
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Steps */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Booking Progress</h3>
              <div className="space-y-4">
                {steps.map((step) => (
                  <div key={step.number} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step.number 
                        ? 'bg-accent text-black' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {currentStep > step.number ? (
                        <CheckCircleIcon className="h-5 w-5" />
                      ) : (
                        step.number
                      )}
                    </div>
                    <span className={`ml-3 ${
                      currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* Selected Car Summary */}
              {selectedCar && (
                <div className="mt-8 border-t pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Selected Vehicle</h4>
                  <div className="space-y-3">
                    <CarImage
                      car={selectedCar}
                      size="medium"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-medium">{selectedCar.brand} {selectedCar.model}</p>
                      <p className="text-sm text-gray-600">{selectedCar.category}</p>
                      <div className="mt-2">
                        <p className="text-lg font-bold text-primary">${selectedCar.dailyRate}/day</p>
                        {formData.pickupDate && formData.returnDate && (
                          <div className="text-sm text-gray-600 mt-1">
                            <p>{calculateDays()} days = ${calculateTotal()}</p>
                            <p>Deposit: ${selectedCar.deposit}</p>
                            <p className="font-semibold">Total: ${calculateTotal() + selectedCar.deposit}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                  <div className="flex">
                    <div className="text-red-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Booking Error</h3>
                      <p className="text-sm text-red-700 mt-1">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Step 1: Rental Details */}
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Rental Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pickup Date *
                        </label>
                        <DatePicker
                          selectedDate={formData.pickupDate}
                          onDateSelect={(date) => handleDateSelect('pickupDate', date)}
                          minDate={new Date()}
                          unavailableDates={unavailableDates}
                          carId={selectedCarId}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Return Date *
                        </label>
                        <DatePicker
                          selectedDate={formData.returnDate}
                          onDateSelect={(date) => handleDateSelect('returnDate', date)}
                          minDate={formData.pickupDate ? new Date(formData.pickupDate.getTime() + 86400000) : new Date()}
                          unavailableDates={unavailableDates}
                          carId={selectedCarId}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pickup Location *
                        </label>
                        <select
                          onChange={(e) => handleLocationChange('pickupLocation', parseInt(e.target.value))}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                          required
                        >
                          <option value="">Select pickup location</option>
                          {locations.map((location, index) => (
                            <option key={index} value={index}>
                              {location.name} - {location.city}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Return Location *
                        </label>
                        <select
                          onChange={(e) => handleLocationChange('returnLocation', parseInt(e.target.value))}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                          required
                        >
                          <option value="">Select return location</option>
                          {locations.map((location, index) => (
                            <option key={index} value={index}>
                              {location.name} - {location.city}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-8">
                      <Button 
                        type="button" 
                        onClick={nextStep}
                        disabled={!formData.pickupDate || !formData.returnDate || !formData.pickupLocation.name || !formData.returnLocation.name}
                      >
                        Next Step
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Customer Information */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      {currentUser ? 'Confirm Your Information' : 'Customer Information'}
                    </h2>
                    
                    {currentUser ? (
                      <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                        <p className="text-green-800">Welcome back, {currentUser.firstName}! Your information is pre-filled below.</p>
                      </div>
                    ) : (
                      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                        <p className="text-blue-800">Please provide your information to create your customer account.</p>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                          required
                          disabled={!!currentUser}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                          required
                          disabled={!!currentUser}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                          required
                          disabled={!!currentUser}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(555) 123-4567"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                          required
                          disabled={!!currentUser}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Enter your phone number with or without formatting
                        </p>
                      </div>
                      
                      {!currentUser && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password *
                          </label>
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                            required
                            minLength={6}
                          />
                        </div>
                      )}
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date of Birth *
                        </label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                          required
                          disabled={!!currentUser}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Driver's License Number *
                        </label>
                        <input
                          type="text"
                          name="licenseNumber"
                          value={formData.licenseNumber}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                          required
                          disabled={!!currentUser}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          License Expiry Date *
                        </label>
                        <input
                          type="date"
                          name="licenseExpiry"
                          value={formData.licenseExpiry}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                          required
                          disabled={!!currentUser}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Your driver's license must be valid throughout the rental period
                        </p>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Address</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Street Address *
                          </label>
                          <input
                            type="text"
                            name="address.street"
                            value={formData.address.street}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                            required
                            disabled={!!currentUser}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            City *
                          </label>
                          <input
                            type="text"
                            name="address.city"
                            value={formData.address.city}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                            required
                            disabled={!!currentUser}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            State *
                          </label>
                          <input
                            type="text"
                            name="address.state"
                            value={formData.address.state}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                            required
                            disabled={!!currentUser}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Postal Code *
                          </label>
                          <input
                            type="text"
                            name="address.postalCode"
                            value={formData.address.postalCode}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                            required
                            disabled={!!currentUser}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-8">
                      <Button type="button" variant="outline" onClick={prevStep}>
                        Previous
                      </Button>
                      <Button type="button" onClick={nextStep}>
                        Next Step
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Review & Confirm */}
                {currentStep === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Review & Confirm</h2>
                    
                    {/* Booking Summary */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <strong>Vehicle:</strong><br />
                          {selectedCar?.brand} {selectedCar?.model} ({selectedCar?.year})
                        </div>
                        <div>
                          <strong>Category:</strong><br />
                          {selectedCar?.category}
                        </div>
                        <div>
                          <strong>Pickup:</strong><br />
                          {formData.pickupDate?.toLocaleDateString()}<br />
                          {formData.pickupLocation.name}
                        </div>
                        <div>
                          <strong>Return:</strong><br />
                          {formData.returnDate?.toLocaleDateString()}<br />
                          {formData.returnLocation.name}
                        </div>
                        <div>
                          <strong>Duration:</strong><br />
                          {calculateDays()} days
                        </div>
                        <div>
                          <strong>Customer:</strong><br />
                          {formData.firstName} {formData.lastName}<br />
                          {formData.email}
                        </div>
                      </div>
                    </div>

                    {/* Pricing Breakdown */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-semibold mb-4">Pricing Breakdown</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Daily Rate ({calculateDays()} days):</span>
                          <span>${calculateTotal()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Security Deposit:</span>
                          <span>${selectedCar?.deposit || 0}</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                          <span>Total Amount:</span>
                          <span>${calculateTotal() + (selectedCar?.deposit || 0)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Requests (Optional)
                      </label>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="Any special requests or requirements..."
                      />
                    </div>

                    {/* Terms and Conditions */}
                    <div className="mb-6">
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          required
                          className="mt-1 text-accent focus:ring-accent"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          I agree to the <a href="/terms" className="text-accent hover:underline">Terms and Conditions</a> and <a href="/privacy" className="text-accent hover:underline">Privacy Policy</a>
                        </span>
                      </label>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={prevStep}>
                        Previous
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={loading}
                        className="flex items-center"
                      >
                        {loading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Processing...
                          </>
                        ) : (
                          'Confirm Booking'
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage; 