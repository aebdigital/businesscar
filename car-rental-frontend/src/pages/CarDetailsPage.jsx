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
import 'photoswipe/dist/photoswipe.css';
import '../photoswipe-custom.css';
import { Gallery, Item } from 'react-photoswipe-gallery';

// Car images - get car-specific image or fallback
const getCarImage = (carId) => {
  const carImages = {
    'skoda-citigo': '/auta/skoda-citigo.jpg',
    'toyota-aygox': '/auta/toyota-aygo.jpg',
    'vw-beetle': '/auta/beetle.jpg',
    'hyundai-kona': '/auta/hyundai-kona.jpg',
    'skoda-octavia': '/auta/skoda-octavia.jpeg',
    'vw-passat-variant': '/auta/vw-passat-variant.jpg',
    'mercedes-cla-220': '/auta/mercedes-cla-220.jpg',
    'mercedes-c-combi': '/auta/mercedes-c-combi-automat.jpg',
    'skoda-kodiaq': '/auta/skoda kodiaq.jpg',
    'peugeot-5008': '/auta/peugeot 5008.jpg',
    'mercedes-glc': '/auta/mercedes glc automat.jpg',
    'mercedes-v-class': '/auta/merc-vclass-automat.jpeg'
  };
  return carImages[carId] || '/hero3.jpeg';
};

// Static car data - matching HomePage cars
const staticCarsData = [
  {
    _id: 'skoda-citigo',
    brand: 'Škoda',
    model: 'Citigo',
    fullName: 'Škoda Citigo',
    dailyRate: 25,
    power: '55',
    transmission: 'automatic',
    seats: 5,
    fuelType: 'gasoline',
    year: 2022,
    description: 'Kompaktné mestské auto, ideálne na parkovanie a jazdu po meste. Ekonomická spotreba a nízke náklady.'
  },
  {
    _id: 'toyota-aygox',
    brand: 'Toyota',
    model: 'AygoX',
    fullName: 'Toyota AygoX',
    dailyRate: 40,
    power: '72',
    transmission: 'automatic',
    seats: 4,
    fuelType: 'gasoline',
    year: 2023,
    description: 'Moderné malé SUV s výrazným dizajnom. Perfektné na mestskú jazdu aj víkendové výlety.'
  },
  {
    _id: 'vw-beetle',
    brand: 'VW',
    model: 'Beetle',
    fullName: 'VW Beetle',
    dailyRate: 50,
    power: '105',
    transmission: 'automatic',
    seats: 4,
    fuelType: 'gasoline',
    year: 2019,
    description: 'Ikonický dizajn s modernou technikou. Jedinečný zážitok z jazdy v štýlovom vozidle.'
  },
  {
    _id: 'hyundai-kona',
    brand: 'Hyundai',
    model: 'Kona',
    fullName: 'Hyundai Kona',
    dailyRate: 50,
    power: '120',
    transmission: 'automatic',
    seats: 5,
    fuelType: 'gasoline',
    year: 2023,
    description: 'Kompaktné SUV s dynamickým dizajnom. Skvelá voľba pre rodinu aj dobrodružstvá.'
  },
  {
    _id: 'skoda-octavia',
    brand: 'Škoda',
    model: 'Octavia',
    fullName: 'Škoda Octavia',
    dailyRate: 40,
    power: '150',
    transmission: 'automatic',
    seats: 5,
    fuelType: 'diesel',
    year: 2023,
    description: 'Priestranné kombi s vynikajúcim pomerom cena/výkon. Ideálne na dlhé cesty.'
  },
  {
    _id: 'vw-passat-variant',
    brand: 'VW',
    model: 'Passat Variant',
    fullName: 'VW Passat Variant',
    dailyRate: 50,
    power: '150',
    transmission: 'automatic',
    seats: 5,
    fuelType: 'diesel',
    year: 2022,
    description: 'Prémiové kombi s veľkým batožinovým priestorom. Komfort na najvyššej úrovni.'
  },
  {
    _id: 'mercedes-cla-220',
    brand: 'Mercedes',
    model: 'CLA 220 CDI',
    fullName: 'Mercedes CLA 220 CDI',
    dailyRate: 75,
    power: '177',
    transmission: 'automatic',
    seats: 5,
    fuelType: 'diesel',
    year: 2023,
    description: 'Elegantný sedan s dynamickým dizajnom. Luxus a výkon v jednom.'
  },
  {
    _id: 'mercedes-c-combi',
    brand: 'Mercedes',
    model: 'C Combi',
    fullName: 'Mercedes C Combi',
    dailyRate: 75,
    power: '170',
    transmission: 'automatic',
    seats: 5,
    fuelType: 'diesel',
    year: 2023,
    description: 'Prémiové kombi s najnovšími technológiami. Priestor a luxus pre celú rodinu.'
  },
  {
    _id: 'skoda-kodiaq',
    brand: 'Škoda',
    model: 'Kodiaq',
    fullName: 'Škoda Kodiaq',
    dailyRate: 70,
    power: '190',
    transmission: 'automatic',
    seats: 5,
    fuelType: 'diesel',
    year: 2023,
    description: 'Veľké SUV s priestorom pre 7 osôb. Ideálne na rodinné výlety.'
  },
  {
    _id: 'peugeot-5008',
    brand: 'Peugeot',
    model: '5008',
    fullName: 'Peugeot 5008',
    dailyRate: 70,
    power: '180',
    transmission: 'automatic',
    seats: 7,
    fuelType: 'diesel',
    year: 2023,
    description: '7-miestne SUV s moderným interiérom. Komfort a priestor pre veľkú rodinu.'
  },
  {
    _id: 'mercedes-glc',
    brand: 'Mercedes',
    model: 'GLC',
    fullName: 'Mercedes GLC',
    dailyRate: 110,
    power: '204',
    transmission: 'automatic',
    seats: 5,
    fuelType: 'diesel',
    year: 2023,
    description: 'Prémiové SUV s vynikajúcimi jazdenými vlastnosťami. Luxus na každej ceste.'
  },
  {
    _id: 'mercedes-v-class',
    brand: 'Mercedes',
    model: 'V-Class',
    fullName: 'Mercedes V-Class',
    dailyRate: 120,
    power: '190',
    transmission: 'automatic',
    seats: 8,
    fuelType: 'diesel',
    year: 2023,
    description: 'Luxusný VAN pre väčšie skupiny. Maximálny komfort a priestor.'
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
      className="fixed left-0 right-0 z-40 py-3 px-4 flex items-center justify-center"
      style={{
        top: '80px',
        backgroundColor: '#2563eb',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
      }}
    >
      <p style={{color: '#ffffff', fontWeight: '600', textAlign: 'center'}}>
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
    // Step 2: Additional services
    childSeat0to9: false,
    childSeat10to24: false,
    boosterSeat: false,
    // Step 3: Personal info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    note: '',
    // Step 4: Agreements
    businessTerms: false,
    dataProcessing: false
  });

  const steps = [
    { number: 1, title: 'Vozidlo & Dátumy', icon: CheckIcon },
    { number: 2, title: 'Dodatočné služby', icon: ShieldCheckIcon },
    { number: 3, title: 'Osobné údaje', icon: UserIcon },
    { number: 4, title: 'Potvrdenie', icon: DocumentTextIcon }
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

  // Add body class when timer is active to make header solid
  useEffect(() => {
    if (currentStep >= 2 && reservationStartTime) {
      document.body.classList.add('force-black-header-mobile');
    } else {
      document.body.classList.remove('force-black-header-mobile');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('force-black-header-mobile');
    };
  }, [currentStep, reservationStartTime]);

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
    let total = days * getPricePerDay(days);
    // Add child seat costs
    if (bookingData.childSeat0to9) total += 10 * days;
    if (bookingData.childSeat10to24) total += 10 * days;
    if (bookingData.boosterSeat) total += 5 * days;
    return total;
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

    if (currentStep === 3) {
      // Validate personal info
      if (!bookingData.firstName || !bookingData.lastName || !bookingData.email || !bookingData.phone) {
        alert('Prosím vyplňte všetky povinné údaje');
        return;
      }
    }

    if (currentStep < 4) {
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
          style={{ backgroundImage: 'url(/hero3.jpeg)' }}
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
                    ? 'scale-110'
                    : currentStep > step.number
                    ? ''
                    : ''
                }`}
                style={{
                  borderWidth: '3px',
                  borderColor: currentStep >= step.number ? '#2563eb' : '#d1d5db',
                  backgroundColor: currentStep >= step.number ? '#2563eb' : '#f3f4f6',
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
                <div className="flex-1 h-1 mx-4 rounded-full bg-gray-400" />
              )}
            </div>
          ))}
        </div>

        {/* Main Content - Two Columns: 60% left, 40% right */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Column - Car Gallery and Info (3 of 5 columns = 60%) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Photo Gallery with Lightbox */}
            <Gallery
              options={{
                bgOpacity: 0.9,
                showHideOpacity: true,
                padding: { top: 20, bottom: 20, left: 20, right: 20 },
                arrowPrev: true,
                arrowNext: true,
                zoom: true,
                close: true,
                counter: true,
                bgClass: 'photoswipe-custom-bg' // We will add global CSS for this
              }}
            >
              <div className="space-y-3">
                {/* Main large image - 2x taller */}
                <div className="rounded-xl overflow-hidden shadow-lg cursor-pointer hover:opacity-95 transition-opacity">
                  <Item
                    original={getCarImage(car._id)}
                    thumbnail={getCarImage(car._id)}
                    width="1200"
                    height="800"
                  >
                    {({ ref, open }) => (
                      <img
                        ref={ref}
                        onClick={open}
                        src={getCarImage(car._id)}
                        alt={`${car.brand} ${car.model}`}
                        className="w-full h-96 md:h-[500px] object-cover"
                      />
                    )}
                  </Item>
                </div>

                {/* 4 Smaller gallery images in one row */}
                <div className="grid grid-cols-4 gap-3">
                  {[1, 2, 3].map((index) => (
                    <div key={index} className="rounded-xl overflow-hidden shadow-lg cursor-pointer hover:opacity-95 transition-opacity">
                      <Item
                        original={getCarImage(car._id)}
                        thumbnail={getCarImage(car._id)}
                        width="1200"
                        height="800"
                      >
                        {({ ref, open }) => (
                          <img
                            ref={ref}
                            onClick={open}
                            src={getCarImage(car._id)}
                            alt={`${car.brand} ${car.model} - ${index}`}
                            className="w-full h-24 object-cover"
                          />
                        )}
                      </Item>
                    </div>
                  ))}
                  
                  {/* +10 more indicator - acts as a trigger for the last visible image in gallery */}
                  <div className="rounded-xl overflow-hidden shadow-lg relative cursor-pointer group hover:opacity-95 transition-opacity">
                    <Item
                      original={getCarImage(car._id)}
                      thumbnail={getCarImage(car._id)}
                      width="1200"
                      height="800"
                    >
                      {({ ref, open }) => (
                        <div onClick={open} className="relative w-full h-24">
                          <img
                            ref={ref}
                            src={getCarImage(car._id)}
                            alt={`${car.brand} ${car.model} - more`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/60 transition-colors">
                            <span className="text-xl font-bold text-white">+10</span>
                          </div>
                        </div>
                      )}
                    </Item>
                  </div>
                </div>
              </div>
            </Gallery>

            {/* Car Specs */}
            <div
              className="bg-white rounded-xl p-6 border border-gray-200"
              style={{ boxShadow: 'inset 0 1px 2px #ffffff30, 0 1px 2px #00000030, 0 2px 4px #00000015' }}
            >
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
            <div
              className="bg-white rounded-xl p-6 border border-gray-200"
              style={{ boxShadow: 'inset 0 1px 2px #ffffff30, 0 1px 2px #00000030, 0 2px 4px #00000015' }}
            >
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
          <div
            className="lg:col-span-2 rounded-xl p-6 shadow-lg h-fit sticky"
            style={{ backgroundColor: '#2563eb', top: '125px', marginBottom: currentStep >= 2 && reservationStartTime ? '80px' : '0' }}
          >
            <h2 className="text-xl font-semibold mb-6" style={{color: '#ffffff', textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'}}>
              {currentStep === 1 && 'Prenájom vozidla'}
              {currentStep === 2 && 'Dodatočné služby'}
              {currentStep === 3 && 'Kontaktné informácie'}
              {currentStep === 4 && 'Súhrn objednávky'}
            </h2>

            {/* Step 1: Vehicle & Dates */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2" style={{color: '#ffffff'}}>Prevzatie</label>
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
                  <label className="block text-sm mb-2" style={{color: '#ffffff'}}>Čas prevzatia</label>
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
                  <label className="block text-sm mb-2" style={{color: '#ffffff'}}>Vrátenie</label>
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
                  <label className="block text-sm mb-2" style={{color: '#ffffff'}}>Čas vrátenia</label>
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

            {/* Step 2: Additional Services */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-3">
                  {/* Child seat 0-9 months */}
                  <label
                    className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all ${
                      bookingData.childSeat0to9 ? 'bg-white/20' : 'bg-blue-700/50'
                    }`}
                    style={{border: bookingData.childSeat0to9 ? '2px solid #ffffff' : '2px solid transparent'}}
                  >
                    <input
                      type="checkbox"
                      checked={bookingData.childSeat0to9}
                      onChange={(e) => handleInputChange('childSeat0to9', e.target.checked)}
                      className="w-5 h-5 rounded border-blue-400 bg-blue-700 accent-white"
                    />
                    <div className="flex-1">
                      <p className="font-medium" style={{color: '#ffffff'}}>Detská autosedačka (0 - 9 mesiacov)</p>
                      <p className="text-sm" style={{color: 'rgba(255,255,255,0.7)'}}>Pre najmenších cestujúcich</p>
                    </div>
                    <span className="font-semibold" style={{color: '#ffffff'}}>+10€/deň</span>
                  </label>

                  {/* Child seat 10-24 months */}
                  <label
                    className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all ${
                      bookingData.childSeat10to24 ? 'bg-white/20' : 'bg-blue-700/50'
                    }`}
                    style={{border: bookingData.childSeat10to24 ? '2px solid #ffffff' : '2px solid transparent'}}
                  >
                    <input
                      type="checkbox"
                      checked={bookingData.childSeat10to24}
                      onChange={(e) => handleInputChange('childSeat10to24', e.target.checked)}
                      className="w-5 h-5 rounded border-blue-400 bg-blue-700 accent-white"
                    />
                    <div className="flex-1">
                      <p className="font-medium" style={{color: '#ffffff'}}>Detská autosedačka (10 - 24 mesiacov)</p>
                      <p className="text-sm" style={{color: 'rgba(255,255,255,0.7)'}}>Pre batoľatá</p>
                    </div>
                    <span className="font-semibold" style={{color: '#ffffff'}}>+10€/deň</span>
                  </label>

                  {/* Booster seat 3-4 years */}
                  <label
                    className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all ${
                      bookingData.boosterSeat ? 'bg-white/20' : 'bg-blue-700/50'
                    }`}
                    style={{border: bookingData.boosterSeat ? '2px solid #ffffff' : '2px solid transparent'}}
                  >
                    <input
                      type="checkbox"
                      checked={bookingData.boosterSeat}
                      onChange={(e) => handleInputChange('boosterSeat', e.target.checked)}
                      className="w-5 h-5 rounded border-blue-400 bg-blue-700 accent-white"
                    />
                    <div className="flex-1">
                      <p className="font-medium" style={{color: '#ffffff'}}>Detský podsedák (3 - 4 roky)</p>
                      <p className="text-sm" style={{color: 'rgba(255,255,255,0.7)'}}>Pre väčšie deti</p>
                    </div>
                    <span className="font-semibold" style={{color: '#ffffff'}}>+5€/deň</span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 3: Personal Info */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2" style={{color: '#ffffff'}}>Meno *</label>
                    <input
                      type="text"
                      value={bookingData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full bg-blue-700 text-white border border-blue-500 rounded-lg px-4 py-3 placeholder-blue-300"
                      placeholder="Meno"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2" style={{color: '#ffffff'}}>Priezvisko *</label>
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
                  <label className="block text-sm mb-2" style={{color: '#ffffff'}}>Email *</label>
                  <input
                    type="email"
                    value={bookingData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full bg-blue-700 text-white border border-blue-500 rounded-lg px-4 py-3 placeholder-blue-300"
                    placeholder="vas@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2" style={{color: '#ffffff'}}>Telefón *</label>
                  <input
                    type="tel"
                    value={bookingData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full bg-blue-700 text-white border border-blue-500 rounded-lg px-4 py-3 placeholder-blue-300"
                    placeholder="+421 XXX XXX XXX"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2" style={{color: '#ffffff'}}>Poznámka</label>
                  <textarea
                    value={bookingData.note}
                    onChange={(e) => handleInputChange('note', e.target.value)}
                    className="w-full bg-blue-700 text-white border border-blue-500 rounded-lg px-4 py-3 placeholder-blue-300 resize-none"
                    placeholder="Vaše poznámky alebo špeciálne požiadavky..."
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="bg-blue-700 rounded-lg p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between" style={{color: '#ffffff'}}>
                      <span>Vozidlo:</span>
                      <span>{car.brand} {car.model}</span>
                    </div>
                    <div className="flex justify-between" style={{color: '#ffffff'}}>
                      <span>Počet dní:</span>
                      <span>{calculateDays()}</span>
                    </div>
                    <div className="flex justify-between" style={{color: '#ffffff'}}>
                      <span>Cena za deň:</span>
                      <span>{getPricePerDay(calculateDays())}€</span>
                    </div>
                    {(bookingData.childSeat0to9 || bookingData.childSeat10to24 || bookingData.boosterSeat) && (
                      <div className="pt-2 border-t border-blue-500">
                        <p className="font-medium mb-1" style={{color: '#ffffff'}}>Dodatočné služby:</p>
                        {bookingData.childSeat0to9 && (
                          <div className="flex justify-between" style={{color: '#ffffff'}}>
                            <span>Detská autosedačka (0-9 mes.)</span>
                            <span>+{10 * calculateDays()}€</span>
                          </div>
                        )}
                        {bookingData.childSeat10to24 && (
                          <div className="flex justify-between" style={{color: '#ffffff'}}>
                            <span>Detská autosedačka (10-24 mes.)</span>
                            <span>+{10 * calculateDays()}€</span>
                          </div>
                        )}
                        {bookingData.boosterSeat && (
                          <div className="flex justify-between" style={{color: '#ffffff'}}>
                            <span>Detský podsedák (3-4 r.)</span>
                            <span>+{5 * calculateDays()}€</span>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="flex justify-between pt-2" style={{color: '#ffffff'}}>
                      <span>Meno:</span>
                      <span>{bookingData.firstName} {bookingData.lastName}</span>
                    </div>
                    <div className="flex justify-between" style={{color: '#ffffff'}}>
                      <span>Email:</span>
                      <span>{bookingData.email}</span>
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
                    <span className="text-sm" style={{color: '#ffffff'}}>
                      Súhlasím s{' '}
                      <a href="/terms" className="hover:underline font-medium" style={{color: '#ffffff'}}>obchodnými podmienkami</a>
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bookingData.dataProcessing}
                      onChange={(e) => handleInputChange('dataProcessing', e.target.checked)}
                      className="mt-1 w-5 h-5 rounded border-blue-400 bg-blue-700 text-white"
                    />
                    <span className="text-sm" style={{color: '#ffffff'}}>
                      Súhlasím so{' '}
                      <a href="/privacy" className="hover:underline font-medium" style={{color: '#ffffff'}}>spracovaním osobných údajov</a>
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Price Summary */}
            <div className="mt-6 pt-4 border-t border-blue-400">
              {calculateDays() > 0 && (
                <div className="flex justify-between mb-2" style={{color: '#ffffff'}}>
                  <span>{calculateDays()} dní x {getPricePerDay(calculateDays())}€</span>
                  <span>{calculateTotalPrice()}€</span>
                </div>
              )}
              <div className="flex justify-between font-semibold" style={{fontSize: '1.4rem', color: '#ffffff'}}>
                <span>Celková cena:</span>
                <span>{calculateTotalPrice()}€</span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-6 flex gap-3">
              {currentStep > 1 && (
                <button
                  onClick={handlePrevStep}
                  className="flex-1 py-3 px-4 rounded-lg transition-colors"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                >
                  Späť
                </button>
              )}
              {currentStep < 4 ? (
                <button
                  onClick={handleNextStep}
                  className="flex-1 py-3 px-4 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2 group"
                  style={{backgroundColor: '#22c55e', color: '#ffffff'}}
                >
                  Pokračovať v objednávke
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
              ) : (
                <button
                  onClick={handleSubmitBooking}
                  className="flex-1 py-3 px-4 rounded-lg hover:opacity-90 transition-colors font-semibold"
                  style={{backgroundColor: '#22c55e', color: '#ffffff'}}
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
