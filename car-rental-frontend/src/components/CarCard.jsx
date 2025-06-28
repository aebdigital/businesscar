import { Link } from 'react-router-dom';
import { 
  UsersIcon, 
  CogIcon, 
  GlobeAltIcon,
  CalendarIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import CarImage from './CarImage';

const CarCard = ({ car, selectedDates, unavailableDates = [], isPromo = false }) => {
  // API data structure mapping
  const {
    _id: id,
    brand,
    model,
    year,
    dailyRate,
    deposit,
    category,
    features,
    transmission,
    fuelType,
    seats,
    description,
    status,
    power,
    images
  } = car;

  // Combine brand and model for display name
  const carName = `${brand} ${model}`;
  
  // Show only available cars or all cars in fleet view
  const isAvailable = status === 'available';

  // Check if car is available for selected dates
  const isAvailableForDates = selectedDates?.pickupDate && selectedDates?.returnDate ? 
    (() => {
      const currentDate = new Date(selectedDates.pickupDate);
      while (currentDate <= selectedDates.returnDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        if (unavailableDates.includes(dateStr)) {
          return false;
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return true;
    })() : true;

  // Build URL with selected dates as query parameters
  const buildCarUrl = () => {
    const baseUrl = `/car/${id}`;
    if (selectedDates?.pickupDate && selectedDates?.returnDate) {
      const params = new URLSearchParams({
        pickupDate: selectedDates.pickupDate.toISOString().split('T')[0],
        returnDate: selectedDates.returnDate.toISOString().split('T')[0]
      });
      return `${baseUrl}?${params.toString()}`;
    }
    return baseUrl;
  };

  // Build booking URL with prefilled data for direct reservation
  const buildBookingUrl = () => {
    const params = new URLSearchParams({
      car: id
    });
    
    if (selectedDates?.pickupDate) {
      params.append('pickupDate', selectedDates.pickupDate.toISOString().split('T')[0]);
    }
    
    if (selectedDates?.returnDate) {
      params.append('returnDate', selectedDates.returnDate.toISOString().split('T')[0]);
    }
    
    if (selectedDates?.pickupTime) {
      params.append('pickupTime', selectedDates.pickupTime);
    }
    
    if (selectedDates?.returnTime) {
      params.append('returnTime', selectedDates.returnTime);
    }
    
    return `/booking?${params.toString()}`;
  };

  // Get fuel type display
  const getFuelDisplay = () => {
    switch(fuelType) {
      case 'petrol': return 'BENZÍN';
      case 'diesel': return 'DIESEL';
      case 'electric': return 'ELEKTRICKÉ';
      case 'hybrid': return 'HYBRID';
      default: return fuelType?.toUpperCase() || 'DIESEL';
    }
  };

  // Get transmission display
  const getTransmissionDisplay = () => {
    switch(transmission) {
      case 'manual': return 'MANUÁL';
      case 'automatic': return 'AUTOMAT';
      default: return transmission?.toUpperCase() || 'AUTOMAT';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 relative">
      {/* AKCIA Banner */}
      {isPromo && (
        <div className="absolute top-0 left-0 z-10">
          <div className="bg-red-600 text-white px-4 py-2 text-sm font-bold transform -rotate-45 -translate-x-3 -translate-y-1 origin-top-left">
            AKCIA
          </div>
        </div>
      )}

      {/* Category Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-medium">
          {category?.includes('SUV') || category?.includes('4X4') ? '4X4' : 
           category?.includes('Premium') ? 'PREMIUM' :
           category?.includes('Úžitkové') ? 'VAN' : 
           category?.includes('Ekonomická') ? 'ECO' : 'AUTO'}
        </span>
      </div>

      {/* Car Image */}
      <div className="relative h-48 bg-gray-100">
        {images && images.length > 0 ? (
          <img 
            src={images[0].url || images[0]} 
            alt={carName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      {/* Car Details */}
      <div className="p-6">
        {/* Brand and Model */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {brand?.toUpperCase()} <span className="font-normal">{model?.toUpperCase()}</span>
          </h2>
          <p className="text-lg text-green-600 font-semibold">
            od <span className="text-2xl">{dailyRate}€</span>/deň
          </p>
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {/* Seats */}
          <div className="text-center">
            <div className="border-2 border-gray-300 rounded p-3 mb-2">
              <UsersIcon className="h-6 w-6 mx-auto text-gray-600" />
            </div>
            <span className="text-sm font-semibold text-gray-800">{seats || 5}</span>
          </div>

          {/* Transmission */}
          <div className="text-center">
            <div className="border-2 border-gray-300 rounded p-3 mb-2">
              <CogIcon className="h-6 w-6 mx-auto text-gray-600" />
            </div>
            <span className="text-sm font-semibold text-gray-800">{getTransmissionDisplay()}</span>
          </div>

          {/* Fuel Type */}
          <div className="text-center">
            <div className="border-2 border-gray-300 rounded p-3 mb-2">
              <GlobeAltIcon className="h-6 w-6 mx-auto text-gray-600" />
            </div>
            <span className="text-sm font-semibold text-gray-800">{getFuelDisplay()}</span>
          </div>

          {/* Power */}
          <div className="text-center">
            <div className="border-2 border-gray-300 rounded p-3 mb-2">
              <svg className="h-6 w-6 mx-auto text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-800">{power || '140kW'}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            to={buildBookingUrl()}
            className="bg-green-600 text-white px-4 py-3 rounded text-center font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
          >
            <CalendarIcon className="h-5 w-5 mr-2" />
            REZERVOVAŤ
          </Link>
          <Link
            to={buildCarUrl()}
            className="border-2 border-green-600 text-green-600 px-4 py-3 rounded text-center font-semibold hover:bg-green-50 transition-colors duration-200 flex items-center justify-center"
          >
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            POZRIEŤ VIAC
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard; 