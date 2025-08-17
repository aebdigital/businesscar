import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  CheckCircleIcon, 
  CheckIcon, 
  CalendarDaysIcon,
  ShieldCheckIcon,
  CogIcon,
  UserIcon,
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import Button from '../components/Button';
import CarImage from '../components/CarImage';
import DatePicker from '../components/DatePicker';
import { carsAPI, bookingAPI, authAPI } from '../services/api';
import Image1 from '../assets/1.jpg';

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedCarId = searchParams.get('car');
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [completedSteps, setCompletedSteps] = useState([]);
  
  // Generate time slots in 30-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour < 20; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(time);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();
  
  const [formData, setFormData] = useState({
    // Rental details (always visible on right side)
    pickupDate: null,
    returnDate: null,
    pickupTime: '08:00',
    returnTime: '08:00',
    pickupLocation: {
      name: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'SK'
    },
    returnLocation: {
      name: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'SK'
    },
    
    // Step 3: Personal Information (for new customers)
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
      country: 'SK'
    },
    
    // Step 2: Insurance packages
    selectedInsurance: '',
    
    // Step 3: Additional services
    additionalDrivers: [],
    specialRequests: '',
    gps: false,
    childSeat: false,
    wheelChair: false
  });

  const steps = [
    { 
      number: 1, 
      title: 'Dátum a miesto', 
      icon: CalendarDaysIcon,
      description: 'Vyberte dátum a miesto vyzdvihnutia' 
    },
    { 
      number: 2, 
      title: 'Poistenie', 
      icon: ShieldCheckIcon,
      description: 'Zvoľte si poistný balíček' 
    },
    { 
      number: 3, 
      title: 'Dodatočné služby', 
      icon: CogIcon,
      description: 'Pridajte si dodatočné služby' 
    },
    { 
      number: 4, 
      title: 'Osobné údaje', 
      icon: UserIcon,
      description: 'Vyplňte osobné informácie' 
    }
  ];

  // Insurance packages
  const insurancePackages = [
    {
      id: 'basic',
      name: 'Základné poistenie',
      price: 0,
      description: 'Povinné ručenie a havarijné poistenie',
      features: [
        'Povinné ručenie',
        'Základné havarijné poistenie',
        'Spoluúčasť 500€'
      ]
    },
    {
      id: 'standard',
      name: 'Štandardné poistenie',
      price: 8,
      description: 'Rozšírené poistenie s nižšou spoluúčasťou',
      features: [
        'Všetko zo základného balíčka',
        'Znížená spoluúčasť na 200€',
        'Poistenie skiel a svetiel',
        'Krádež vozidla'
      ],
      recommended: true
    },
    {
      id: 'premium',
      name: 'Prémiové poistenie',
      price: 15,
      description: 'Kompletné poistenie bez spoluúčasti',
      features: [
        'Všetko zo štandardného balíčka',
        'Bez spoluúčasti (0€)',
        'Poistenie pneumatík a ráfikov',
        'Asistenčná služba 24/7',
        'Náhradné vozidlo pri poruche'
      ]
    }
  ];

  // Additional services
  const additionalServices = [
    {
      id: 'gps',
      name: 'GPS navigácia',
      price: 3,
      description: 'Moderné GPS zariadenie s aktuálnymi mapami'
    },
    {
      id: 'childSeat',
      name: 'Detská sedačka',
      price: 5,
      description: 'Bezpečná detská sedačka pre rôzne vekové kategórie'
    },
    {
      id: 'wheelChair',
      name: 'Invalidný vozík',
      price: 10,
      description: 'Prenosný invalidný vozík'
    },
    {
      id: 'additionalDriver',
      name: 'Dodatočný vodič',
      price: 12,
      description: 'Povolenie pre ďalšieho vodiča'
    }
  ];

  // Predefined locations - Slovak locations (Bratislava)
  const locations = [
    {
      name: 'Centrum - Bratislava',
      address: 'Hlavná 123',
      city: 'Bratislava',
      state: 'Bratislavský kraj',
      postalCode: '821 08',
      country: 'SK'
    },
    {
      name: 'Letisko - M. R. Štefánika',
      address: 'Letisko M. R. Štefánika',
      city: 'Bratislava',
      state: 'Bratislavský kraj',
      postalCode: '823 05',
      country: 'SK'
    },
    {
      name: 'Petržalka - Bratislava',
      address: 'Petržalská 456',
      city: 'Bratislava',
      state: 'Bratislavský kraj',
      postalCode: '851 01',
      country: 'SK'
    },
    {
      name: 'Ružinov - Bratislava',
      address: 'Ružinovská 789',
      city: 'Bratislava',
      state: 'Bratislavský kraj',
      postalCode: '821 01',
      country: 'SK'
    },
    {
      name: 'Nové Mesto - Bratislava',
      address: 'Nové Mesto 321',
      city: 'Bratislava',
      state: 'Bratislavský kraj',
      postalCode: '831 01',
      country: 'SK'
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
        const pickupTimeParam = searchParams.get('pickupTime');
        const returnTimeParam = searchParams.get('returnTime');
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
        
        // Pre-fill dates, times and locations from URL parameters
        setFormData(prev => ({
          ...prev,
          pickupDate: pickupDateParam ? new Date(pickupDateParam) : prev.pickupDate,
          returnDate: returnDateParam ? new Date(returnDateParam) : prev.returnDate,
          pickupTime: pickupTimeParam || prev.pickupTime,
          returnTime: returnTimeParam || prev.returnTime,
          pickupLocation: pickupLocationParam ? 
            locations.find(loc => loc.name === pickupLocationParam) || { name: pickupLocationParam, address: '', city: 'Bratislava', state: 'Bratislavský kraj', postalCode: '', country: 'SK' } : 
            prev.pickupLocation,
          returnLocation: returnLocationParam ? 
            locations.find(loc => loc.name === returnLocationParam) || { name: returnLocationParam, address: '', city: 'Bratislava', state: 'Bratislavský kraj', postalCode: '', country: 'SK' } : 
            prev.returnLocation,
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
            console.warn('Nepodarilo sa načítať údaje rezervácie:', err);
            setUnavailableDates([]);
          }
        } else {
          setError('Nebol vybratý žiadny automobil');
        }
      } catch (err) {
        console.error('Chyba pri načítavaní dát:', err);
        setError('Chyba pri načítavaní dát');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedCarId, searchParams]);

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
    setFormData(prev => ({
      ...prev,
      [field]: date
    }));
  };

  const handleLocationChange = (locationType, locationIndex) => {
    if (locationIndex === '' || locationIndex < 0) {
      setFormData(prev => ({
        ...prev,
        [locationType]: { name: '', address: '', city: '', state: '', postalCode: '', country: 'SK' }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [locationType]: locations[locationIndex]
      }));
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      // Mark current step as completed
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps(prev => [...prev, currentStep]);
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStep1Valid = () => {
    return formData.pickupDate && formData.returnDate && 
           formData.pickupLocation.name && formData.returnLocation.name;
  };

  const isStep2Valid = () => {
    return formData.selectedInsurance !== '';
  };

  const isStep3Valid = () => {
    return true; // Additional services are optional
  };

  const isStep4Valid = () => {
    return formData.firstName && formData.lastName && formData.email && formData.phone && 
           formData.dateOfBirth && formData.licenseNumber && formData.licenseExpiry &&
           formData.address.street && formData.address.city && formData.address.postalCode &&
           (!currentUser ? formData.password : true);
  };

  const canNavigateToStep = (stepNumber) => {
    if (stepNumber === 1) return true;
    if (stepNumber === 2) return completedSteps.includes(1) || isStep1Valid();
    if (stepNumber === 3) return completedSteps.includes(2) || (isStep1Valid() && isStep2Valid());
    if (stepNumber === 4) return completedSteps.includes(3) || (isStep1Valid() && isStep2Valid() && isStep3Valid());
    return false;
  };

  const goToStep = (stepNumber) => {
    if (canNavigateToStep(stepNumber)) {
      setCurrentStep(stepNumber);
    }
  };

  const handleInsuranceSelect = (insuranceId) => {
    setFormData(prev => ({
      ...prev,
      selectedInsurance: insuranceId
    }));
  };

  const handleServiceToggle = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedCar || !isStep4Valid()) {
      setError('Prosím vyplňte všetky požadované údaje');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Prepare booking data
      const bookingData = {
        selectedCarId: selectedCarId,
        startDate: formData.pickupDate.toISOString(),
        endDate: formData.returnDate.toISOString(),
        pickupLocation: formData.pickupLocation,
        dropoffLocation: formData.returnLocation,
        additionalDrivers: formData.additionalDrivers,
        specialRequests: formData.specialRequests
      };

      // Prepare customer data (if new customer)
      const customerData = currentUser ? null : {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        dateOfBirth: formData.dateOfBirth,
        licenseNumber: formData.licenseNumber,
        licenseExpiry: formData.licenseExpiry,
        address: formData.address
      };

      // Complete booking
      await bookingAPI.completeBooking(bookingData, customerData);
      navigate('/thank-you'); // Go to thank you page
      
    } catch (err) {
      console.error('Booking failed:', err);
      setError(err.message || 'Rezervácia neúspešná. Skúste to prosím znova.');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!selectedCar || !formData.pickupDate || !formData.returnDate) return 0;
    const days = Math.ceil((formData.returnDate - formData.pickupDate) / (1000 * 60 * 60 * 24));
    let total = selectedCar.dailyRate * days;
    
    // Add insurance cost
    const selectedInsurancePackage = insurancePackages.find(pkg => pkg.id === formData.selectedInsurance);
    if (selectedInsurancePackage) {
      total += selectedInsurancePackage.price * days;
    }
    
    // Add additional services
    additionalServices.forEach(service => {
      if (formData[service.id]) {
        total += service.price * days;
      }
    });
    
    return total;
  };

  const calculateDays = () => {
    if (!formData.pickupDate || !formData.returnDate) return 0;
    return Math.ceil((formData.returnDate - formData.pickupDate) / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
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


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mini Hero Section */}
      <div 
        className="relative h-[15vh] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${Image1})`
        }}
      >
      </div>

      {/* Progress Steps at Top */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-5xl mx-auto">
            {/* Step boxes */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {steps.map((step) => {
                const Icon = step.icon;
                const isCompleted = completedSteps.includes(step.number);
                const isCurrent = currentStep === step.number;
                const isAccessible = canNavigateToStep(step.number);
                
                return (
                  <div 
                    key={step.number}
                    onClick={() => isAccessible && goToStep(step.number)}
                    className={`relative p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                      isCompleted 
                        ? 'border-green-500 bg-green-50 text-green-700' 
                        : isCurrent
                        ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg'
                        : isAccessible
                        ? 'border-gray-300 bg-white text-gray-600 hover:border-blue-300 hover:bg-blue-50'
                        : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center mb-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                        isCompleted 
                          ? 'bg-green-500 text-white' 
                          : isCurrent
                          ? 'bg-blue-500 text-white'
                          : isAccessible
                          ? 'bg-gray-300 text-gray-600'
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        {isCompleted ? (
                          <CheckIcon className="h-6 w-6" />
                        ) : (
                          <Icon className="h-6 w-6" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm opacity-75">{step.description}</p>
                    
                    {/* Active indicator */}
                    {isCurrent && (
                      <div className="absolute top-0 right-0 w-4 h-4 bg-blue-500 rounded-full -mt-2 -mr-2 animate-pulse"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Side - Form Content */}
          <div className="lg:col-span-3">
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
                      <h3 className="text-sm font-medium text-red-800">Chyba</h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>{error}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Step 1: Date and Place Pickup */}
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                      Dátum a miesto vyzdvihnutia
                    </h2>
                    
                    <div className="space-y-6">
                      {/* Location Selection */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <MapPinIcon className="inline h-5 w-5 mr-2" />
                            Miesto vyzdvihnutia *
                          </label>
                          <select
                            value={formData.pickupLocation.name ? locations.findIndex(loc => loc.name === formData.pickupLocation.name) : ''}
                            onChange={(e) => handleLocationChange('pickupLocation', parseInt(e.target.value))}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          >
                            <option value="">Vyberte miesto prevzatia</option>
                            {locations.map((location, index) => (
                              <option key={index} value={index}>
                                {location.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <MapPinIcon className="inline h-5 w-5 mr-2" />
                            Miesto vrátenia *
                          </label>
                          <select
                            value={formData.returnLocation.name ? locations.findIndex(loc => loc.name === formData.returnLocation.name) : ''}
                            onChange={(e) => handleLocationChange('returnLocation', parseInt(e.target.value))}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          >
                            <option value="">Vyberte miesto vrátenia</option>
                            {locations.map((location, index) => (
                              <option key={index} value={index}>
                                {location.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Date Selection */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <CalendarDaysIcon className="inline h-5 w-5 mr-2" />
                            Dátum vyzdvihnutia *
                          </label>
                          <DatePicker
                            selectedDate={formData.pickupDate}
                            onDateSelect={(date) => handleDateSelect('pickupDate', date)}
                            minDate={new Date()}
                            unavailableDates={unavailableDates}
                            carId={selectedCarId}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <CalendarDaysIcon className="inline h-5 w-5 mr-2" />
                            Dátum vrátenia *
                          </label>
                          <DatePicker
                            selectedDate={formData.returnDate}
                            onDateSelect={(date) => handleDateSelect('returnDate', date)}
                            minDate={formData.pickupDate ? new Date(formData.pickupDate.getTime() + 86400000) : new Date()}
                            unavailableDates={unavailableDates}
                            carId={selectedCarId}
                            className="w-full"
                          />
                        </div>
                      </div>

                      {/* Time Selection */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <ClockIcon className="inline h-5 w-5 mr-2" />
                            Čas vyzdvihnutia
                          </label>
                          <select
                            value={formData.pickupTime}
                            onChange={(e) => handleInputChange({ target: { name: 'pickupTime', value: e.target.value } })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {timeSlots.map(time => (
                              <option key={time} value={time}>{time}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <ClockIcon className="inline h-5 w-5 mr-2" />
                            Čas vrátenia
                          </label>
                          <select
                            value={formData.returnTime}
                            onChange={(e) => handleInputChange({ target: { name: 'returnTime', value: e.target.value } })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {timeSlots.map(time => (
                              <option key={time} value={time}>{time}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-8">
                      <Button variant="outline" onClick={() => navigate(-1)}>
                        Späť
                      </Button>
                      <Button 
                        type="button" 
                        onClick={nextStep}
                        disabled={!isStep1Valid()}
                      >
                        Ďalší krok
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Insurance Packages */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                      Vyberte si poistný balíček
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {insurancePackages.map((insurance) => (
                        <div
                          key={insurance.id}
                          onClick={() => handleInsuranceSelect(insurance.id)}
                          className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                            formData.selectedInsurance === insurance.id
                              ? 'border-blue-500 bg-blue-50 shadow-lg'
                              : 'border-gray-300 bg-white hover:border-blue-300 hover:shadow-md'
                          }`}
                        >
                          {insurance.recommended && (
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                Odporúčané
                              </span>
                            </div>
                          )}
                          
                          <div className="text-center mb-4">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{insurance.name}</h3>
                            <div className="text-3xl font-bold text-blue-600 mb-2">
                              {insurance.price === 0 ? 'Zahrnuté' : `${insurance.price}€/deň`}
                            </div>
                            <p className="text-gray-600 text-sm">{insurance.description}</p>
                          </div>
                          
                          <ul className="space-y-2">
                            {insurance.features.map((feature, index) => (
                              <li key={index} className="flex items-center text-sm text-gray-700">
                                <CheckIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          
                          {formData.selectedInsurance === insurance.id && (
                            <div className="absolute top-4 right-4">
                              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                <CheckIcon className="h-4 w-4 text-white" />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between mt-8">
                      <Button variant="outline" onClick={prevStep}>
                        Späť
                      </Button>
                      <Button 
                        type="button" 
                        onClick={nextStep}
                        disabled={!isStep2Valid()}
                      >
                        Ďalší krok
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Additional Services */}
                {currentStep === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                      Dodatočné služby
                    </h2>
                    <p className="text-gray-600 text-center mb-8">
                      Vyberte si dodatočné služby pre vaše pohodlie (voliteľné)
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {additionalServices.map((service) => (
                        <div
                          key={service.id}
                          onClick={() => handleServiceToggle(service.id)}
                          className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                            formData[service.id]
                              ? 'border-blue-500 bg-blue-50 shadow-lg'
                              : 'border-gray-300 bg-white hover:border-blue-300 hover:shadow-md'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
                              <p className="text-gray-600 text-sm">{service.description}</p>
                            </div>
                            <div className="ml-4 text-right">
                              <div className="text-2xl font-bold text-blue-600">{service.price}€/deň</div>
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-2 ${
                                formData[service.id]
                                  ? 'border-blue-500 bg-blue-500'
                                  : 'border-gray-300'
                              }`}>
                                {formData[service.id] && (
                                  <CheckIcon className="h-4 w-4 text-white" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between mt-8">
                      <Button variant="outline" onClick={prevStep}>
                        Späť
                      </Button>
                      <Button 
                        type="button" 
                        onClick={nextStep}
                      >
                        Ďalší krok
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 4: Personal Information */}
                {currentStep === 4 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Osobné údaje
                    </h2>
                    
                    {currentUser && (
                      <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                        <p className="text-green-800">Vitajte späť, {currentUser.firstName}! Vaše údaje sú predvyplnené nižšie.</p>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Meno*"
                          className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                          disabled={!!currentUser}
                        />
                      </div>
                                              <div>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Priezvisko*"
                          className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                          disabled={!!currentUser}
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Telefónne číslo*"
                          className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                          disabled={!!currentUser}
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="E-mail*"
                          className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                          disabled={!!currentUser}
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="licenseNumber"
                          value={formData.licenseNumber}
                          onChange={handleInputChange}
                          placeholder="Číslo občianskeho preukazu*"
                          className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                          disabled={!!currentUser}
                        />
                      </div>
                      <div>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          placeholder="Rodné číslo (bez lomítka)*"
                          className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                          disabled={!!currentUser}
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="licenseExpiry"
                          value={formData.licenseExpiry}
                          onChange={handleInputChange}
                          placeholder="Číslo vodičského preukazu*"
                          className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                          disabled={!!currentUser}
                        />
                      </div>
                      
                                             {!currentUser && (
                        <div>
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Heslo*"
                            className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                            minLength={6}
                          />
                        </div>
                      )}
                    </div>

                    {/* Address Section */}
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-left">Kontaktné údaje *</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <input
                            type="text"
                            name="address.street"
                            value={formData.address.street}
                            onChange={handleInputChange}
                            placeholder="Adresa*"
                            className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                            disabled={!!currentUser}
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            name="address.city"
                            value={formData.address.city}
                            onChange={handleInputChange}
                            placeholder="Mesto*"
                            className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                            disabled={!!currentUser}
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            name="address.postalCode"
                            value={formData.address.postalCode}
                            onChange={handleInputChange}
                            placeholder="Smerovacíe číslo*"
                            className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                            disabled={!!currentUser}
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            name="address.state"
                            value={formData.address.state}
                            onChange={handleInputChange}
                            placeholder="Krajina*"
                            className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                            disabled={!!currentUser}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Document Upload Section */}
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-left">Identifikačné údaje</h3>
                      <div className="space-y-2">
                        <div className="border border-gray-300 rounded-lg px-4 py-2 flex justify-between items-center">
                          <div className="text-left">
                            <p className="text-gray-700 text-sm">Občiansky preukaz - predná strana</p>
                            <p className="text-gray-400 text-xs">Vyberte súbor</p>
                          </div>
                          <span className="text-blue-600 text-sm cursor-pointer hover:text-blue-700">Choose file</span>
                        </div>
                        <div className="border border-gray-300 rounded-lg px-4 py-2 flex justify-between items-center">
                          <div className="text-left">
                            <p className="text-gray-700 text-sm">Občiansky preukaz - zadná strana</p>
                            <p className="text-gray-400 text-xs">Vyberte súbor</p>
                          </div>
                          <span className="text-blue-600 text-sm cursor-pointer hover:text-blue-700">Choose file</span>
                        </div>
                        <div className="border border-gray-300 rounded-lg px-4 py-2 flex justify-between items-center">
                          <div className="text-left">
                            <p className="text-gray-700 text-sm">Vodičský preukaz - predná strana</p>
                            <p className="text-gray-400 text-xs">Vyberte súbor</p>
                          </div>
                          <span className="text-blue-600 text-sm cursor-pointer hover:text-blue-700">Choose file</span>
                        </div>
                        <div className="border border-gray-300 rounded-lg px-4 py-2 flex justify-between items-center">
                          <div className="text-left">
                            <p className="text-gray-700 text-sm">Vodičský preukaz - zadná strana</p>
                            <p className="text-gray-400 text-xs">Vyberte súbor</p>
                          </div>
                          <span className="text-blue-600 text-sm cursor-pointer hover:text-blue-700">Choose file</span>
                        </div>
                      </div>
                    </div>

                    {/* Agreement Section */}
                    <div className="mt-8">
                      <div className="flex items-center gap-2 mb-4">
                        <input
                          type="checkbox"
                          id="businessTerms"
                          className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                          required
                        />
                        <label htmlFor="businessTerms" className="text-gray-900 text-sm">
                          Súhlasím so <span className="text-blue-600 underline">všeobecnými obchodnými podmienkami</span> *
                        </label>
                      </div>
                      <div className="flex items-center gap-2 mb-6">
                        <input
                          type="checkbox"
                          id="dataProcessing"
                          className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                          required
                        />
                        <label htmlFor="dataProcessing" className="text-gray-900 text-sm">
                          Súhlasím so <span className="text-blue-600 underline">spracovaním osobných údajov</span> *
                        </label>
                      </div>
                      
                      <div className="text-center">
                        <Button type="submit" disabled={loading || !isStep4Valid()}>
                          {loading ? 'Spracováva sa...' : 'Potvrdiť objednávku'}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-8">
                      <Button variant="outline" onClick={prevStep}>
                        Späť
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Right Side - Rental Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
              {/* Selected Car - Full Width Image */}
              {selectedCar && (
                <div className="mb-6">
                  <CarImage
                    car={selectedCar}
                    size="medium"
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6 pb-0">
                    <h4 className="font-semibold text-gray-900">{selectedCar.brand} {selectedCar.model}</h4>
                    <p className="text-sm text-gray-600 capitalize">{selectedCar.category}</p>
                  </div>
                </div>
              )}
              
              <div className="p-6">{/* Container for rest of content */}

              {/* Booking Summary */}
              <div className="mb-6">
                {/* Date & Time and Locations - Side by Side */}
                {((formData.pickupDate && formData.returnDate) || (formData.pickupLocation.name || formData.returnLocation.name)) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Dates */}
                    {formData.pickupDate && formData.returnDate && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm">Dátumy</h4>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Vyzdvihnutie:</span>
                            <span className="font-medium">
                              {formData.pickupDate.toLocaleDateString()} {formData.pickupTime}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Vrátenie:</span>
                            <span className="font-medium">
                              {formData.returnDate.toLocaleDateString()} {formData.returnTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Locations */}
                    {(formData.pickupLocation.name || formData.returnLocation.name) && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm">Miesta</h4>
                        <div className="space-y-1 text-xs">
                          {formData.pickupLocation.name && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Vyzdvihnutie:</span>
                              <span className="font-medium">{formData.pickupLocation.name}</span>
                            </div>
                          )}
                          {formData.returnLocation.name && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Vrátenie:</span>
                              <span className="font-medium">{formData.returnLocation.name}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Pricing Summary */}
              {selectedCar && formData.pickupDate && formData.returnDate && (
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Cenový rozpis</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Vozidlo ({calculateDays()} dní):</span>
                      <span className="font-medium">{selectedCar.dailyRate * calculateDays()}€</span>
                    </div>
                    
                    {/* Insurance cost */}
                    {formData.selectedInsurance && (() => {
                      const insurance = insurancePackages.find(pkg => pkg.id === formData.selectedInsurance);
                      return insurance && insurance.price > 0 ? (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{insurance.name}:</span>
                          <span className="font-medium">{insurance.price * calculateDays()}€</span>
                        </div>
                      ) : null;
                    })()}
                    
                    {/* Additional services costs */}
                    {additionalServices.map(service => 
                      formData[service.id] && (
                        <div key={service.id} className="flex justify-between text-sm">
                          <span className="text-gray-600">{service.name}:</span>
                          <span className="font-medium">{service.price * calculateDays()}€</span>
                        </div>
                      )
                    )}
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Záloha:</span>
                      <span className="font-medium">{selectedCar.deposit}€</span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Celkom:</span>
                        <span className="text-blue-600">{calculateTotal() + selectedCar.deposit}€</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              </div> {/* End of p-6 container */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage; 