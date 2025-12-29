import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  BoltIcon,
  GlobeAltIcon,
  CogIcon,
  UsersIcon,
  CheckIcon,
  ShieldCheckIcon,
  UserIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import DatePicker from '../components/DatePicker';
import SEOHead from '../components/SEOHead';

// Car images - using hero.jpg as placeholder
const getCarImage = () => {
  return '/hero.jpg';
};

// Static car data
const staticCarsData = [
  {
    _id: 'audi-a6',
    brand: 'AUDI',
    model: 'A6',
    fullName: 'AUDI A6',
    dailyRate: 90,
    power: '250',
    transmission: 'automatic',
    seats: 5,
    fuelType: 'gasoline',
    year: 2024,
    description: 'Elegantná a výkonná limuzína, ktorá kombinuje luxus s pokročilou technológiou.'
  },
  {
    _id: 'bmw-540i-xdrive',
    brand: 'BMW',
    model: '540i xDrive',
    fullName: 'BMW 540I XDRIVE',
    dailyRate: 90,
    power: '250',
    transmission: 'automatic',
    seats: 5,
    fuelType: 'gasoline',
    year: 2024,
    description: 'Športová limuzína s pohonom všetkých kolies pre výnimočný zážitok z jazdy.'
  },
  {
    _id: 'audi-s4',
    brand: 'AUDI',
    model: 'S4',
    fullName: 'AUDI S4',
    dailyRate: 90,
    power: '255',
    transmission: 'automatic',
    seats: 5,
    fuelType: 'diesel',
    year: 2024,
    description: 'Vysoko výkonné kombi s pokročilým pohonom quattro.'
  },
  {
    _id: 'audi-s6',
    brand: 'AUDI',
    model: 'S6',
    fullName: 'AUDI S6',
    dailyRate: 100,
    power: '255',
    transmission: 'automatic',
    seats: 5,
    fuelType: 'diesel',
    year: 2024,
    description: 'Prémiové kombi s výnimočným výkonom a priestorom.'
  },
  {
    _id: 'maserati-levante',
    brand: 'MASERATI',
    model: 'Levante',
    fullName: 'MASERATI LEVANTE',
    dailyRate: 130,
    power: '316',
    transmission: 'automatic',
    seats: 5,
    fuelType: 'gasoline',
    year: 2024,
    description: 'Luxusné SUV s talianskym štýlom a výnimočným výkonom.'
  },
  {
    _id: 'bmw-840i-xdrive',
    brand: 'BMW',
    model: '840i xDrive',
    fullName: 'BMW 840I XDRIVE',
    dailyRate: 140,
    power: '250',
    transmission: 'automatic',
    seats: 4,
    fuelType: 'gasoline',
    year: 2024,
    description: 'Elegantné kupé s pokročilou technológiou a výnimočným dizajnom.'
  },
  {
    _id: 'bmw-x7-xdrive-40d',
    brand: 'BMW',
    model: 'X7 xDrive 40d',
    fullName: 'BMW X7 XDRIVE 40D',
    dailyRate: 200,
    power: '259',
    transmission: 'automatic',
    seats: 7,
    fuelType: 'diesel',
    year: 2024,
    description: 'Luxusné SUV s priestorom pre celú rodinu a najnovšími technológiami.'
  }
];

// Reservation Timer Component
const ReservationTimer = ({ startTime, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(0, 600 - elapsed);
      setTimeLeft(remaining);

      if (remaining === 0) {
        onExpire?.();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, onExpire]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 py-3 px-4 text-center"
      style={{
        backgroundColor: '#2563eb',
        boxShadow: '0 -4px 6px rgba(0, 0, 0, 0.3)'
      }}
    >
      <p className="text-white font-semibold">
        Vaše vozidlo je rezervované: {minutes}:{seconds.toString().padStart(2, '0')}
      </p>
    </div>
  );
};

const CarDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [reservationStartTime, setReservationStartTime] = useState(null);

  const [bookingData, setBookingData] = useState({
    pickupDate: null,
    returnDate: null,
    pickupTime: '08:00',
    returnTime: '08:00',
    // Step 2: Personal info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Step 3: Agreements
    businessTerms: false,
    dataProcessing: false
  });

  const steps = [
    { number: 1, title: 'Vozidlo & Dátumy', icon: CheckIcon },
    { number: 2, title: 'Osobné údaje', icon: UserIcon },
    { number: 3, title: 'Potvrdenie', icon: DocumentTextIcon }
  ];

  // Load car data
  useEffect(() => {
    setLoading(true);
    const foundCar = staticCarsData.find(c => c._id === id);
    if (foundCar) {
      setCar({
        ...foundCar,
        status: 'available',
        pricing: {
          rates: {
            '2-3days': foundCar.dailyRate,
            '4-10days': Math.round(foundCar.dailyRate * 0.9),
            '11-20days': Math.round(foundCar.dailyRate * 0.85),
            '21-29days': Math.round(foundCar.dailyRate * 0.8),
            '30-60days': Math.round(foundCar.dailyRate * 0.75)
          },
          deposit: 500
        }
      });
    } else {
      setError('Vozidlo sa nenašlo');
    }
    setLoading(false);
  }, [id]);

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        slots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const calculateDays = () => {
    if (!bookingData.pickupDate || !bookingData.returnDate) return 0;
    const diff = bookingData.returnDate - bookingData.pickupDate;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getPricePerDay = (days) => {
    if (!car?.pricing?.rates) return car?.dailyRate || 0;
    const rates = car.pricing.rates;
    if (days >= 2 && days <= 3) return rates['2-3days'];
    if (days >= 4 && days <= 10) return rates['4-10days'];
    if (days >= 11 && days <= 20) return rates['11-20days'];
    if (days >= 21 && days <= 29) return rates['21-29days'];
    if (days >= 30) return rates['30-60days'];
    return rates['2-3days'];
  };

  const calculateTotalPrice = () => {
    const days = calculateDays();
    if (days === 0) return 0;
    return days * getPricePerDay(days);
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validate dates
      if (!bookingData.pickupDate || !bookingData.returnDate) {
        alert('Prosím vyberte dátum prevzatia a vrátenia');
        return;
      }
      if (calculateDays() < 2) {
        alert('Minimálna dĺžka rezervácie sú 2 dni');
        return;
      }
      // Start reservation timer when moving to step 2
      setReservationStartTime(Date.now());
    }

    if (currentStep === 2) {
      // Validate personal info
      if (!bookingData.firstName || !bookingData.lastName || !bookingData.email || !bookingData.phone) {
        alert('Prosím vyplňte všetky povinné údaje');
        return;
      }
    }

    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmitBooking = () => {
    if (!bookingData.businessTerms || !bookingData.dataProcessing) {
      alert('Prosím odsúhlaste obchodné podmienky a spracovanie údajov');
      return;
    }
    // Here would be the booking submission logic
    alert('Rezervácia bola úspešne odoslaná! Kontaktujeme vás čoskoro.');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Vozidlo sa nenašlo</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Späť na hlavnú stránku
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title={`${car.brand} ${car.model} - Prenájom | Business Car`}
        description={car.description}
      />

      {/* Show timer only on step 2 and 3 */}
      {currentStep >= 2 && reservationStartTime && (
        <ReservationTimer
          startTime={reservationStartTime}
          onExpire={() => {
            alert('Čas rezervácie vypršal. Prosím začnite znova.');
            setCurrentStep(1);
            setReservationStartTime(null);
          }}
        />
      )}

      {/* Hero Section - 30vh */}
      <section className="relative h-[30vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/hero.jpg)' }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </section>

      <div className="px-4 md:px-8 lg:px-16 py-8">
        {/* Car Name - Above Steps */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'Monument Extended, sans-serif' }}>
          {car.brand} {car.model}
        </h1>

        {/* Steps Indicator - Bigger and more prominent */}
        <div className="flex items-center justify-start gap-2 mb-10 p-4 bg-white rounded-xl shadow-sm">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div
                className={`flex items-center justify-center w-14 h-14 rounded-full transition-all ${
                  currentStep === step.number
                    ? 'bg-blue-600 border-blue-600 scale-110'
                    : currentStep > step.number
                    ? 'bg-blue-600 border-blue-600'
                    : 'border-gray-300 bg-gray-100'
                }`}
                style={{
                  borderWidth: '3px',
                  borderColor: currentStep >= step.number ? '#2563eb' : '#d1d5db',
                  boxShadow: currentStep === step.number ? '0 0 20px 5px rgba(37, 99, 235, 0.5)' : 'none'
                }}
              >
                {currentStep > step.number ? (
                  <CheckIcon className="w-7 h-7" style={{color: '#ffffff'}} />
                ) : (
                  <span className="font-bold text-xl" style={{color: currentStep === step.number ? '#ffffff' : '#9ca3af'}}>{step.number}</span>
                )}
              </div>
              <span
                className={`ml-3 text-base font-semibold ${
                  currentStep === step.number
                    ? 'text-blue-600'
                    : currentStep > step.number
                    ? 'text-gray-900'
                    : 'text-gray-400'
                }`}
              >
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-4 rounded-full ${currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Main Content - Two Columns: 60% left, 40% right */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Column - Car Gallery and Info (3 of 5 columns = 60%) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Photo Gallery */}
            <div className="space-y-3">
              {/* Main large image - 2x taller */}
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src={getCarImage(car._id)}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-96 md:h-[500px] object-cover"
                />
              </div>
              {/* 4 Smaller gallery images in one row */}
              <div className="grid grid-cols-4 gap-3">
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={getCarImage(car._id)}
                    alt={`${car.brand} ${car.model} - 2`}
                    className="w-full h-24 object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={getCarImage(car._id)}
                    alt={`${car.brand} ${car.model} - 3`}
                    className="w-full h-24 object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={getCarImage(car._id)}
                    alt={`${car.brand} ${car.model} - 4`}
                    className="w-full h-24 object-cover"
                  />
                </div>
                {/* +10 more indicator with darker overlay and white text */}
                <div className="rounded-xl overflow-hidden shadow-lg relative cursor-pointer group">
                  <img
                    src={getCarImage(car._id)}
                    alt={`${car.brand} ${car.model} - more`}
                    className="w-full h-24 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center group-hover:bg-black/80 transition-colors">
                    <span className="text-2xl font-bold" style={{color: '#ffffff'}}>+10</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Car Specs */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Špecifikácie vozidla</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <BoltIcon className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Výkon</p>
                    <p className="font-medium text-gray-900">{car.power} kW</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CogIcon className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Prevodovka</p>
                    <p className="font-medium text-gray-900">
                      {car.transmission === 'automatic' ? 'Automat' : 'Manuál'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <GlobeAltIcon className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Palivo</p>
                    <p className="font-medium text-gray-900">
                      {car.fuelType === 'gasoline' ? 'Benzín' : car.fuelType === 'diesel' ? 'Nafta' : car.fuelType}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <UsersIcon className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Počet miest</p>
                    <p className="font-medium text-gray-900">{car.seats}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Price List */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cenník prenájmu</h3>
              <div className="space-y-2">
                {Object.entries(car.pricing.rates).map(([duration, price]) => (
                  <div key={duration} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">
                      {duration.replace('days', ' dni').replace('-', '-')}
                    </span>
                    <span className="font-semibold text-blue-600">{price}€ / deň</span>
                  </div>
                ))}
                <div className="flex justify-between py-2 pt-4">
                  <span className="font-medium text-gray-900">Depozit</span>
                  <span className="font-semibold text-gray-900">{car.pricing.deposit}€</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Panel (2 of 5 columns = 40%) */}
          <div className="lg:col-span-2 rounded-xl p-6 shadow-lg h-fit sticky top-24" style={{ backgroundColor: '#2563eb' }}>
            <h2 className="text-xl font-semibold mb-6" style={{color: '#ffffff', textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'}}>Prenájom vozidla</h2>

            {/* Step 1: Vehicle & Dates */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-blue-100 mb-2">Prevzatie</label>
                  <DatePicker
                    selectedDate={bookingData.pickupDate}
                    onDateSelect={(date) => handleInputChange('pickupDate', date)}
                    minDate={new Date()}
                    isReturnPicker={false}
                    className="w-full"
                    variant="light"
                  />
                </div>
                <div>
                  <label className="block text-sm text-blue-100 mb-2">Čas prevzatia</label>
                  <select
                    value={bookingData.pickupTime}
                    onChange={(e) => handleInputChange('pickupTime', e.target.value)}
                    className="w-full bg-blue-700 text-white border border-blue-500 rounded-lg px-4 py-3"
                  >
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-blue-100 mb-2">Vrátenie</label>
                  <DatePicker
                    selectedDate={bookingData.returnDate}
                    onDateSelect={(date) => handleInputChange('returnDate', date)}
                    minDate={bookingData.pickupDate ? new Date(bookingData.pickupDate.getTime() + 86400000 * 2) : new Date()}
                    isReturnPicker={true}
                    className="w-full"
                    variant="light"
                  />
                </div>
                <div>
                  <label className="block text-sm text-blue-100 mb-2">Čas vrátenia</label>
                  <select
                    value={bookingData.returnTime}
                    onChange={(e) => handleInputChange('returnTime', e.target.value)}
                    className="w-full bg-blue-700 text-white border border-blue-500 rounded-lg px-4 py-3"
                  >
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Personal Info */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-blue-100 mb-2">Meno *</label>
                    <input
                      type="text"
                      value={bookingData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full bg-blue-700 text-white border border-blue-500 rounded-lg px-4 py-3 placeholder-blue-300"
                      placeholder="Meno"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-blue-100 mb-2">Priezvisko *</label>
                    <input
                      type="text"
                      value={bookingData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full bg-blue-700 text-white border border-blue-500 rounded-lg px-4 py-3 placeholder-blue-300"
                      placeholder="Priezvisko"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-blue-100 mb-2">Email *</label>
                  <input
                    type="email"
                    value={bookingData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full bg-blue-700 text-white border border-blue-500 rounded-lg px-4 py-3 placeholder-blue-300"
                    placeholder="vas@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm text-blue-100 mb-2">Telefón *</label>
                  <input
                    type="tel"
                    value={bookingData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full bg-blue-700 text-white border border-blue-500 rounded-lg px-4 py-3 placeholder-blue-300"
                    placeholder="+421 XXX XXX XXX"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="bg-blue-700 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">Súhrn objednávky</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-blue-200">
                      <span>Vozidlo:</span>
                      <span className="text-white">{car.brand} {car.model}</span>
                    </div>
                    <div className="flex justify-between text-blue-200">
                      <span>Počet dní:</span>
                      <span className="text-white">{calculateDays()}</span>
                    </div>
                    <div className="flex justify-between text-blue-200">
                      <span>Cena za deň:</span>
                      <span className="text-white">{getPricePerDay(calculateDays())}€</span>
                    </div>
                    <div className="flex justify-between text-blue-200">
                      <span>Meno:</span>
                      <span className="text-white">{bookingData.firstName} {bookingData.lastName}</span>
                    </div>
                    <div className="flex justify-between text-blue-200">
                      <span>Email:</span>
                      <span className="text-white">{bookingData.email}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bookingData.businessTerms}
                      onChange={(e) => handleInputChange('businessTerms', e.target.checked)}
                      className="mt-1 w-5 h-5 rounded border-blue-400 bg-blue-700 text-white"
                    />
                    <span className="text-sm text-blue-100">
                      Súhlasím s{' '}
                      <a href="/terms" className="text-white hover:underline font-medium">obchodnými podmienkami</a>
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bookingData.dataProcessing}
                      onChange={(e) => handleInputChange('dataProcessing', e.target.checked)}
                      className="mt-1 w-5 h-5 rounded border-blue-400 bg-blue-700 text-white"
                    />
                    <span className="text-sm text-blue-100">
                      Súhlasím so{' '}
                      <a href="/privacy" className="text-white hover:underline font-medium">spracovaním osobných údajov</a>
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Price Summary */}
            <div className="mt-6 pt-4 border-t border-blue-400">
              {calculateDays() > 0 && (
                <div className="flex justify-between mb-2 text-blue-200">
                  <span>{calculateDays()} dní x {getPricePerDay(calculateDays())}€</span>
                  <span className="text-white">{calculateTotalPrice()}€</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-semibold">
                <span className="text-white">Celková cena:</span>
                <span className="text-white">{calculateTotalPrice()}€</span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-6 flex gap-3">
              {currentStep > 1 && (
                <button
                  onClick={handlePrevStep}
                  className="flex-1 py-3 px-4 border border-white text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Späť
                </button>
              )}
              {currentStep < 3 ? (
                <button
                  onClick={handleNextStep}
                  className="flex-1 py-3 px-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
                >
                  Pokračovať v objednávke
                </button>
              ) : (
                <button
                  onClick={handleSubmitBooking}
                  className="flex-1 py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
                >
                  Odoslať rezerváciu
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add padding at bottom if timer is shown */}
      {currentStep >= 2 && reservationStartTime && <div className="h-16" />}
    </div>
  );
};

export default CarDetailsPage;
