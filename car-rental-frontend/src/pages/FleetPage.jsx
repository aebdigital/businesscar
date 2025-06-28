import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  FunnelIcon, 
  AdjustmentsHorizontalIcon, 
  CalendarIcon, 
  ClockIcon,
  ChevronDownIcon,
  ChevronUpIcon 
} from '@heroicons/react/24/outline';
import CarCard from '../components/CarCard';
import Button from '../components/Button';
import { carsAPI } from '../services/api';
import Image4 from '../assets/4.webp';

const FleetPage = () => {
  const [searchParams] = useSearchParams();
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [fallbackMessage, setFallbackMessage] = useState('');
  
  // Enhanced date and time selection
  const [rentalDetails, setRentalDetails] = useState({
    pickupDate: null,
    pickupTime: '08:00',
    returnDate: null,
    returnTime: '08:00'
  });

  // Comprehensive filters
  const [filters, setFilters] = useState({
    // Basic filters
    vehicleClass: searchParams.get('category') || '',
    pickupTime: '08:00',
    returnTime: '08:00',
    seats: '',
    transmission: '',
    fuelType: '',
    
    // Advanced filters
    unlimitedKm: false,
    petsAllowed: false,
    childSeat: false,
    navigation: false,
    roofBox: false,
    internationalTravel: false,
    
    // Automatic services for out-of-hours
    pickupOutOfHours: false,
    returnOutOfHours: false,
    
    sortBy: 'price-asc'
  });

  // Vehicle class definitions with specific models
  const vehicleClasses = [
    {
      id: 'ekonomicka',
      name: 'Ekonomická trieda',
      models: ['Skoda Fabia', 'Renault Clio']
    },
    {
      id: 'stredna',
      name: 'Stredná trieda', 
      models: ['Kia ceed', 'Skoda Octavia']
    },
    {
      id: 'vyssia',
      name: 'Vyššia trieda',
      models: ['Skoda Superb', 'Kia Sportage']
    },
    {
      id: 'viacmiestne',
      name: 'Viacmiestne vozidlá',
      models: ['Renault Trafic', 'Opel Vivaro']
    },
    {
      id: 'uzitkove',
      name: 'Úžitkové vozidlá (dodávky)',
      models: ['Renault Master', 'Fiat Ducato']
    },
    {
      id: 'karavany',
      name: 'Karavany',
      models: ['Novastar 420CP', 'Weinsberg W51']
    },
    {
      id: 'motorky',
      name: 'Motorky',
      models: ['Honda Africa Twin']
    },
    {
      id: 'sportove',
      name: 'Športové autá',
      models: ['Audi RS6']
    },
    {
      id: 'elektromobily',
      name: 'Elektromobily',
      models: ['Tesla 3', 'Renault Megane E-Tech']
    }
  ];

  // Time slots in 30-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(time);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Opening hours (8:00 - 17:00 weekdays, 9:00 - 12:00 Saturday, closed Sunday)
  const isOutOfHours = (date, time) => {
    if (!date || !time) return false;
    
    const day = date.getDay(); // 0 = Sunday, 6 = Saturday
    const [hours, minutes] = time.split(':').map(Number);
    const timeInMinutes = hours * 60 + minutes;
    
    if (day === 0) return true; // Sunday - closed
    
    if (day === 6) { // Saturday
      return timeInMinutes < 9 * 60 || timeInMinutes >= 12 * 60;
    }
    
    // Weekdays
    return timeInMinutes < 8 * 60 || timeInMinutes >= 17 * 60;
  };

  // Initialize from URL parameters
  useEffect(() => {
    const pickupDateParam = searchParams.get('pickupDate');
    const returnDateParam = searchParams.get('returnDate');
    
    if (pickupDateParam || returnDateParam) {
      const updatedDetails = {
        ...rentalDetails,
        pickupDate: pickupDateParam ? new Date(pickupDateParam) : null,
        returnDate: returnDateParam ? new Date(returnDateParam) : null
      };
      setRentalDetails(updatedDetails);
    }
  }, [searchParams]);

  // Load cars from API
  useEffect(() => {
    const loadCars = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch cars from backend API
        const carsData = await carsAPI.getAvailableCars();
        
        setCars(carsData);
        applyFilters(carsData, filters, rentalDetails);
      } catch (err) {
        console.error('Failed to load cars:', err);
        setError('Failed to load cars. Please try again later.');
        setCars([]);
        setFilteredCars([]);
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  // Re-apply filters when rental details change (from URL params or user input)
  useEffect(() => {
    if (cars.length > 0) {
      applyFilters(cars, filters, rentalDetails);
    }
  }, [rentalDetails, cars]);

  // Apply filters and handle fallback scenarios
  const applyFilters = (carList, currentFilters, currentRentalDetails) => {
    let filtered = [...carList];
    let showFallback = false;
    
    // Store original search for fallback
    const originalFilters = { ...currentFilters };
    
    // Filter by vehicle class
    if (currentFilters.vehicleClass) {
      filtered = filtered.filter(car => car.category === currentFilters.vehicleClass);
    }

    // Filter by seats
    if (currentFilters.seats) {
      filtered = filtered.filter(car => car.seats >= parseInt(currentFilters.seats));
    }

    // Filter by transmission
    if (currentFilters.transmission) {
      filtered = filtered.filter(car => car.transmission === currentFilters.transmission);
    }

    // Filter by fuel type
    if (currentFilters.fuelType) {
      filtered = filtered.filter(car => car.fuelType === currentFilters.fuelType);
    }

    // Filter by advanced features
    if (currentFilters.unlimitedKm) {
      filtered = filtered.filter(car => car.features?.includes('unlimitedKm'));
    }
    if (currentFilters.petsAllowed) {
      filtered = filtered.filter(car => car.features?.includes('petsAllowed'));
    }
    if (currentFilters.navigation) {
      filtered = filtered.filter(car => car.features?.includes('navigation'));
    }
    if (currentFilters.roofBox) {
      filtered = filtered.filter(car => car.features?.includes('roofBox'));
    }

    // Filter by date availability if dates are selected
    if (currentRentalDetails.pickupDate && currentRentalDetails.returnDate) {
      const availableCars = filtered.filter(car => {
        return isCarAvailableForDates(car, currentRentalDetails.pickupDate, currentRentalDetails.returnDate);
      });
      
      if (availableCars.length === 0 && filtered.length > 0) {
        // No cars available for selected dates - show fallback
        showFallback = true;
        // Show all available cars for the date, sorted by price
        filtered = carList.filter(car => 
          isCarAvailableForDates(car, currentRentalDetails.pickupDate, currentRentalDetails.returnDate)
        );
        setFallbackMessage(
          `Vami vybrané vozidlo momentálne nie je dostupné. Zobrazujeme dostupné alternatívy pre zadaný dátum vzostupne podľa ceny.`
        );
      } else {
        filtered = availableCars;
        setFallbackMessage('');
      }
    } else {
      setFallbackMessage('');
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (currentFilters.sortBy) {
        case 'price-asc':
          return a.dailyRate - b.dailyRate;
        case 'price-desc':
          return b.dailyRate - a.dailyRate;
        case 'name':
          return `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`);
        case 'year':
          return b.year - a.year;
        default:
          return a.dailyRate - b.dailyRate;
      }
    });

    setFilteredCars(filtered);
  };

  // Check car availability for date range
  const isCarAvailableForDates = (car, startDate, endDate) => {
    if (!car.unavailableDates || car.unavailableDates.length === 0) return true;
    
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      if (car.unavailableDates.includes(dateStr)) {
        return false;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return true;
  };

  // Handle rental details change
  const handleRentalDetailChange = (field, value) => {
    const updatedDetails = {
      ...rentalDetails,
      [field]: value
      };
      
    // Auto-enable out-of-hours services
    if (field === 'pickupDate' || field === 'pickupTime') {
      const outOfHours = isOutOfHours(updatedDetails.pickupDate, updatedDetails.pickupTime);
      setFilters(prev => ({ ...prev, pickupOutOfHours: outOfHours }));
    }
    
    if (field === 'returnDate' || field === 'returnTime') {
      const outOfHours = isOutOfHours(updatedDetails.returnDate, updatedDetails.returnTime);
      setFilters(prev => ({ ...prev, returnOutOfHours: outOfHours }));
    }

    setRentalDetails(updatedDetails);
    applyFilters(cars, filters, updatedDetails);
  };

  // Handle filter change
  const handleFilterChange = (filterType, value) => {
    const updatedFilters = {
      ...filters,
      [filterType]: value
    };
    setFilters(updatedFilters);
    applyFilters(cars, updatedFilters, rentalDetails);
  };

  // Clear all filters
  const clearFilters = () => {
    const clearedFilters = {
      vehicleClass: '',
      pickupTime: '08:00',
      returnTime: '08:00',
      seats: '',
      transmission: '',
      fuelType: '',
      unlimitedKm: false,
      petsAllowed: false,
      childSeat: false,
      navigation: false,
      roofBox: false,
      internationalTravel: false,
      pickupOutOfHours: false,
      returnOutOfHours: false,
      sortBy: 'price-asc'
    };
    setFilters(clearedFilters);
    setRentalDetails({
      pickupDate: null,
      pickupTime: '08:00',
      returnDate: null,
      returnTime: '08:00'
    });
    applyFilters(cars, clearedFilters, {
      pickupDate: null,
      pickupTime: '08:00',
      returnDate: null,
      returnTime: '08:00'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Načítavame vozidlá...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Chyba pri načítaní vozidiel</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Skúsiť znova
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mini Hero Section */}
      <div 
        className="relative h-[20vh] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${Image4})`
        }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full" style={{ maxWidth: '90rem' }}>
          <h1 className="text-3xl font-bold text-white">
            Ponuka vozidiel
          </h1>
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{ maxWidth: '90rem' }}>
        {/* Date and Time Selection */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pickup */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dátum prevzatia
              </label>
                  <input
                    type="date"
                    value={rentalDetails.pickupDate ? rentalDetails.pickupDate.toISOString().split('T')[0] : ''}
                    onChange={(e) => handleRentalDetailChange('pickupDate', e.target.value ? new Date(e.target.value) : null)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 h-10 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Čas prevzatia
                  </label>
                  <select
                    value={rentalDetails.pickupTime}
                    onChange={(e) => handleRentalDetailChange('pickupTime', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 h-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>
              {filters.pickupOutOfHours && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-yellow-800 text-sm">
                    ⚠️ Vyzdvihnutie mimo otváracích hodín - automaticky pridané do služieb
                  </p>
                </div>
              )}
            </div>

            {/* Return */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dátum vrátenia
              </label>
                  <input
                    type="date"
                    value={rentalDetails.returnDate ? rentalDetails.returnDate.toISOString().split('T')[0] : ''}
                    onChange={(e) => handleRentalDetailChange('returnDate', e.target.value ? new Date(e.target.value) : null)}
                    min={rentalDetails.pickupDate ? new Date(rentalDetails.pickupDate.getTime() + 86400000).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 h-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Čas vrátenia
                  </label>
                  <select
                    value={rentalDetails.returnTime}
                    onChange={(e) => handleRentalDetailChange('returnTime', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 h-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>
              {filters.returnOutOfHours && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-yellow-800 text-sm">
                    ⚠️ Odovzdanie mimo otváracích hodín - automaticky pridané do služieb
                  </p>
                </div>
              )}
            </div>
          </div>
          

        </div>

        {/* Fallback Message */}
        {fallbackMessage && (
          <div className="bg-orange-50 border border-orange-200 rounded-md p-4 mb-6">
            <p className="text-orange-800">{fallbackMessage}</p>
            </div>
          )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Filters Sidebar */}
          <div className="lg:w-1/5">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-32">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FunnelIcon className="h-5 w-5 mr-2" />
                  Filtre
                </h3>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-green-600 hover:text-green-700"
                >
                  Zrušiť všetko
                </button>
              </div>

              {/* Vehicle Class Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trieda vozidla
                </label>
                <select
                  value={filters.vehicleClass}
                  onChange={(e) => handleFilterChange('vehicleClass', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Všetky triedy</option>
                  {vehicleClasses.map(cls => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
                {filters.vehicleClass && (
                  <p className="text-xs text-gray-500 mt-1">
                    {vehicleClasses.find(c => c.id === filters.vehicleClass)?.models.join(', ')}
                  </p>
                )}
              </div>

              {/* Seats Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Počet miest
                </label>
                <select
                  value={filters.seats}
                  onChange={(e) => handleFilterChange('seats', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Ľubovoľný počet</option>
                  <option value="2">2+ miest</option>
                  <option value="3">3+ miest</option>
                  <option value="5">5+ miest</option>
                  <option value="7">7+ miest</option>
                  <option value="9">9+ miest</option>
                </select>
              </div>

              {/* Transmission Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prevodovka
                </label>
                <select
                  value={filters.transmission}
                  onChange={(e) => handleFilterChange('transmission', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Všetky typy</option>
                  <option value="automatic">Automat</option>
                  <option value="manual">Manuál</option>
                </select>
              </div>

              {/* Fuel Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Palivo
                </label>
                <select
                  value={filters.fuelType}
                  onChange={(e) => handleFilterChange('fuelType', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Všetky typy</option>
                  <option value="petrol">Benzín</option>
                  <option value="diesel">Diesel</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="electric">Elektro</option>
                  <option value="lpg">Plyn</option>
                </select>
              </div>

              {/* Advanced Filters Toggle */}
              <div className="mb-4">
                <button
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100"
                >
                  <span>Rozšírené možnosti</span>
                  {showAdvancedFilters ? 
                    <ChevronUpIcon className="h-4 w-4" /> : 
                    <ChevronDownIcon className="h-4 w-4" />
                  }
                </button>
              </div>

              {/* Advanced Filters */}
              <div className={`space-y-4 overflow-hidden transition-all duration-300 ${showAdvancedFilters ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.unlimitedKm}
                      onChange={(e) => handleFilterChange('unlimitedKm', e.target.checked)}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Bez obmedzenia km</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.petsAllowed}
                      onChange={(e) => handleFilterChange('petsAllowed', e.target.checked)}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Domáce zvieratá povolené</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.childSeat}
                      onChange={(e) => handleFilterChange('childSeat', e.target.checked)}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Detská sedačka</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.navigation}
                      onChange={(e) => handleFilterChange('navigation', e.target.checked)}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Navigácia</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.roofBox}
                      onChange={(e) => handleFilterChange('roofBox', e.target.checked)}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Strešný box</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.internationalTravel}
                      onChange={(e) => handleFilterChange('internationalTravel', e.target.checked)}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Cestujem do zahraničia</span>
                  </label>
                </div>
              </div>



              {/* Out of Hours Services Display */}
              {(filters.pickupOutOfHours || filters.returnOutOfHours) && (
                <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <h4 className="text-sm font-medium text-blue-900 mb-2">Automaticky pridané služby:</h4>
                  {filters.pickupOutOfHours && (
                    <p className="text-xs text-blue-800">• Vyzdvihnutie mimo otv. hodín</p>
                  )}
                  {filters.returnOutOfHours && (
                    <p className="text-xs text-blue-800">• Odovzdanie mimo otv. hodín</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Cars Grid */}
          <div className="lg:w-4/5">
            {/* Sort Filter Above Grid */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">
                  Zoradiť podľa:
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="price-asc">Cena: Od najnižšej</option>
                  <option value="price-desc">Cena: Od najvyššej</option>
                  <option value="name">Názov: A-Z</option>
                  <option value="year">Rok: Najnovšie prvé</option>
                </select>
              </div>
              <div className="text-sm text-gray-500">
                {filteredCars.length} {filteredCars.length === 1 ? 'vozidlo' : filteredCars.length < 5 ? 'vozidlá' : 'vozidiel'} nájdených
            </div>
          </div>

            {filteredCars.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Žiadne vozidlá sa nenašli</h3>
                <p className="text-gray-500 mb-4">
                  Skúste upraviť filtre alebo dátumy pre zobrazenie dostupných vozidiel.
                </p>
                <Button onClick={clearFilters} className="bg-green-600 hover:bg-green-700">
                  Zrušiť filtre
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
                {filteredCars.map(car => (
                  <CarCard 
                    key={car._id} 
                    car={car} 
                    selectedDates={rentalDetails}
                    unavailableDates={car.unavailableDates || []}
                    outOfHoursServices={{
                      pickupOutOfHours: filters.pickupOutOfHours,
                      returnOutOfHours: filters.returnOutOfHours
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FleetPage; 