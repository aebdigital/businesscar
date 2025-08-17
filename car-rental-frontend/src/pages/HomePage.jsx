import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarIcon,
  ClockIcon,
  ShieldCheckIcon,
  MagnifyingGlassIcon,
  StarIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CheckIcon,
  TruckIcon,
  BuildingStorefrontIcon,
  PaperAirplaneIcon,
  MapIcon,
  GlobeAltIcon,
  UsersIcon,
  CogIcon,
  BoltIcon,
  FireIcon
} from '@heroicons/react/24/outline';
import CarCard from '../components/CarCard';
import Carousel from '../components/Carousel';
import { carsAPI } from '../services/api';
import SkodaHero from '../assets/skoda_hero.webp';
import Image1 from '../assets/1.jpg';
import Image2 from '../assets/2.jpg';
import Image3 from '../assets/3.jpg';
import Image4 from '../assets/4.webp';
import Image5 from '../assets/5.jpeg';
import EkonomickeImg from '../assets/ekonomicke.avif';
import PremiumImg from '../assets/premium.avif';
import ViacmiestneImg from '../assets/viacmiestne vozidla 7 a 9 miestne_edited.avif';
import UzitkovaImg from '../assets/uzitkove.avif';
import SportoveImg from '../assets/sportove.jpg';
import MotocykleImg from '../assets/motocykle.png';
import KaravanyImg from '../assets/karavany.jpg';

const HomePage = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [carType, setCarType] = useState('');
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Popular cars data (3 selected cars)
  const popularCars = [
    {
      _id: 'pop1',
      brand: 'Škoda',
      model: 'Citigo',
      image: '/src/assets/skoda-city-gi.webp',
      price: 20, // Monthly rate divided by 30 (roughly) for lowest price
      seats: 4,
      transmission: 'automatic',
      fuelType: 'benzín',
      doors: 4,
      power: '60kW',
      fuel: '4.5L/100km'
    },
    {
      _id: 'pop2',
      brand: 'Toyota',
      model: 'AygoX',
      image: '/src/assets/toyota-aygo.jpg',
      price: 25,
      seats: 4,
      transmission: 'manuál',
      fuelType: 'benzín',
      doors: 4,
      power: '72kW',
      fuel: '4.8L/100km'
    },
    {
      _id: 'pop3',
      brand: 'Hyundai',
      model: 'Kona',
      image: '/src/assets/Hyundai-Kona.jpg',
      price: 28,
      seats: 5,
      transmission: 'automatic',
      fuelType: 'hybrid',
      doors: 4,
      power: '104kW',
      fuel: '4.2L/100km'
    }
  ];

  // Carousel images
  const carouselImages = [
    { src: Image1, alt: 'RIVAL Autopožičovňa - Vozidlo 1' },
    { src: Image2, alt: 'RIVAL Autopožičovňa - Vozidlo 2' },
    { src: Image3, alt: 'RIVAL Autopožičovňa - Vozidlo 3' },
    { src: Image4, alt: 'RIVAL Autopožičovňa - Vozidlo 4' },
    { src: Image5, alt: 'RIVAL Autopožičovňa - Vozidlo 5' }
  ];

  // Load cars from API
  useEffect(() => {
    const loadCars = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch cars from backend API
        const carsData = await carsAPI.getAvailableCars();
        setCars(carsData);
      } catch (err) {
        console.error('Failed to load cars:', err);
        setError('Failed to load cars. Please try again later.');
        setCars([]);
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  // Map homepage category names to FleetPage filter values
  const getCategoryFilterValue = (categoryName) => {
    const categoryMap = {
      'EKONOMICKÉ': 'ekonomicka',
      'EKONOMICKÁ': 'ekonomicka',
      'STREDNÁ TRIEDA': 'stredna',
      'STREDNÁ': 'stredna', 
      'VYŠŠIA TRIEDA': 'vyssia',
      'VYŠŠIA': 'vyssia',
      'VIACMIESTNE': 'viacmiestne',
      'ÚŽITKOVÉ': 'uzitkove',
      'MOTOCYKLE': 'motorky',
      'KARAVANY': 'karavany',
      'ŠPORTOVÉ': 'sportove'
    };
    return categoryMap[categoryName] || '';
  };

  // Handle category click
  const handleCategoryClick = (categoryName) => {
    const categoryValue = getCategoryFilterValue(categoryName);
    if (categoryValue) {
      window.location.href = `/fleet?category=${categoryValue}`;
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (startDate) params.append('pickupDate', startDate);
    if (endDate) params.append('returnDate', endDate);
    if (carType) params.append('category', carType);
    window.location.href = `/fleet?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section 
        className="relative h-[80vh] bg-cover bg-center bg-no-repeat flex flex-col"
        style={{ backgroundImage: `url(${SkodaHero})` }}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Content Container */}
        <div className="relative z-10 flex-1 flex flex-col">
          {/* Spacer for header */}
          <div className="h-20"></div>
          
          {/* Main Content */}
          <div className="flex-1 flex items-center">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full" style={{ maxWidth: '90rem' }}>
              <div className="text-white max-w-2xl">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Požičajte si auto - Vyhľadajte,<br />
                  Porovnajte a Ušetrite
                </h1>
                
                {/* Feature List */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center space-x-3">
                    <CheckIcon className="h-5 w-5 text-green-400" />
                    <span className="text-lg">Bezplatné stornovanie väčšiny rezervácií</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckIcon className="h-5 w-5 text-green-400" />
                    <span className="text-lg">Viac ako 60 000 pobočiek</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckIcon className="h-5 w-5 text-green-400" />
                    <span className="text-lg">Zákaznícka podpora vo viac ako 30 jazykoch</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Booking Form */}
          <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2">
            <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '90rem' }}>
              <div className="bg-white rounded-lg shadow-xl p-6 pb-12 relative" style={{ borderTopLeftRadius: '0' }}>
                {/* Single Container Top Left - Outside */}
                <div className="absolute left-0" style={{ top: '-37px' }}>
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-t-md text-sm font-medium bg-white text-black border border-gray-200" style={{ borderBottom: 'none', borderTopLeftRadius: '0.375rem', borderTopRightRadius: '0.375rem' }}>
                    <TruckIcon className="h-4 w-4 text-black" />
                    <span>Požičanie auta</span>
                  </div>
                </div>
                
                {/* Booking Form */}
                <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                  {/* Pick-up Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Miesto vyzdvihnutia
                    </label>
                    <div className="relative">
                      <MapPinIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Bratislava, Slovensko"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        defaultValue="Bratislava, Slovensko"
                      />
                    </div>
                  </div>
                  
                  {/* Return Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Miesto odovzdania
                    </label>
                    <div className="relative">
                      <MapPinIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Bratislava, Slovensko"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        defaultValue="Bratislava, Slovensko"
                      />
                    </div>
                  </div>
                  
                  {/* Pick-up Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dátum vyzdvihnutia
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      defaultValue="2024-03-09"
                    />
                  </div>
                  
                  {/* Drop-off Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dátum vrátenia
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      defaultValue="2024-03-10"
                    />
                  </div>
                </form>
                
                {/* Search Button - Centered on Edge */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                  <button
                    type="submit"
                    onClick={handleSearchSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-colors duration-200 flex items-center space-x-2 shadow-lg"
                  >
                    <MagnifyingGlassIcon className="h-5 w-5" />
                    <span>Hľadať autá</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Cars Section */}
      <section className="pt-32 pb-16 bg-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '90rem' }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Obľúbené vozidlá</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCars.map((car) => (
              <Link key={car._id} to={`/car/${car._id}`} className="block">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
                  {/* Car Image */}
                  <div className="h-64 bg-gray-200">
                    <img
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Car Details */}
                  <div className="p-4">
                    {/* Header */}
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {car.brand} {car.model}
                      </h3>
                    </div>
                    
                    {/* 2x3 Grid Specifications */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <UsersIcon className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-gray-700">{car.seats} sedadiel</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <FireIcon className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-gray-700">{car.fuel}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <CogIcon className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-gray-700">{car.transmission}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <TruckIcon className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-gray-700">{car.fuelType}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <BuildingStorefrontIcon className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-gray-700">{car.doors} dvere</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <BoltIcon className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-gray-700">{car.power}</span>
                      </div>
                    </div>
                    
                    {/* Price at Bottom */}
                    <div className="text-center">
                      <p className="text-lg font-bold text-black">Od {car.price}€ na deň</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* View All Cars Button */}
          <div className="text-center mt-8">
            <Link
              to="/fleet"
              className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200"
            >
              Všetky vozidlá
            </Link>
          </div>
        </div>
      </section>


    


      {/* Additional Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Dodatočné služby</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Zabezpečujeme všetko potrebné pre vašu bezpečnosť a pohodlie na ceste
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Child Seats */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <UsersIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Detské sedačky</h3>
              <p className="text-gray-600">
                Kvalitné a bezpečné detské sedačky pre všetky vekové kategórie. Certifikované podľa európskych noriem.
              </p>
            </div>

            {/* Insurance */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheckIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Poistenie</h3>
              <p className="text-gray-600">
                Komplexné poistné krytie vrátane havarijného poistenia a ochrany pred krádežou.
              </p>
            </div>

            {/* Highway Card */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <GlobeAltIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Diaľničná známka</h3>
              <p className="text-gray-600">
                V cene prenájmu je zahrnutá diaľničná známka pre Slovensko a susedné krajiny EÚ.
              </p>
            </div>

            {/* 24/7 Support */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <PhoneIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">24/7 podpora</h3>
              <p className="text-gray-600">
                Nepretržitá technická podpora a asistenčná služba kdekoľvek na Slovensku.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-12 bg-white">
        <div className="w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Recenzie z Google
            </h2>
            <div className="flex items-center justify-center mb-4">
              <div className="flex text-yellow-400 text-xl mr-2">
                {'★'.repeat(5)}
              </div>
              <span className="text-lg font-semibold text-gray-700">4.8</span>
              <span className="text-gray-500 ml-2">(47 recenzií)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-800">Marek Svoboda</p>
                  <div className="flex text-yellow-400 text-sm">
                    {'★'.repeat(5)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                "Výborné služby, profesionálny prístup a kvalitné vozidlá. Odporúčam všetkým, ktorí hľadajú spoľahlivú autopožičovňu v regióne."
              </p>
              <p className="text-xs text-gray-400 mt-2">pred 2 týždňami</p>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-800">Anna Kováčová</p>
                  <div className="flex text-yellow-400 text-sm">
                    {'★'.repeat(5)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                "Rýchle vybavenie, čisté vozidlá a férové ceny. Už niekoľkokrát som si tu požičala auto a vždy som bola spokojná."
              </p>
              <p className="text-xs text-gray-400 mt-2">pred 1 mesiacom</p>
          </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  P
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-800">Peter Novák</p>
                  <div className="flex text-yellow-400 text-sm">
                    {'★'.repeat(4)}
                    <span className="text-gray-300">★</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                "Dobrá komunikácia a flexibilita. Auto bolo v perfektnom stave. Určite sa vrátim."
              </p>
              <p className="text-xs text-gray-400 mt-2">pred 3 týždňami</p>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                  L
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-800">Lucia Hrubá</p>
                  <div className="flex text-yellow-400 text-sm">
                    {'★'.repeat(5)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                "Skvelý servis! Personál je veľmi ochotný a pomôže s čímkoľvek. Vozidlá sú moderne a udržiavané."
              </p>
              <p className="text-xs text-gray-400 mt-2">pred 5 dňami</p>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  J
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-800">Ján Moravčík</p>
                  <div className="flex text-yellow-400 text-sm">
                    {'★'.repeat(5)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                "Najlepšia autopožičovňa v okolí. Vždy majú dostupné vozidlá a ceny sú konkurencieschopné."
              </p>
              <p className="text-xs text-gray-400 mt-2">pred 1 týždňom</p>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-800">Miroslav Baláž</p>
                  <div className="flex text-yellow-400 text-sm">
                    {'★'.repeat(4)}
                    <span className="text-gray-300">★</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                "Veľmi spokojný s kvalitou služieb. Odporúčam pre biznis aj súkromné účely."
              </p>
              <p className="text-xs text-gray-400 mt-2">pred 2 mesiacmi</p>
          </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                  K
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-800">Katarína Novotná</p>
                  <div className="flex text-yellow-400 text-sm">
                    {'★'.repeat(5)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                "Perfektná komunikácia, auto pripravené presne na čas. Ceny sú výhodné a servis na vysokej úrovni."
              </p>
              <p className="text-xs text-gray-400 mt-2">pred 4 dňami</p>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  R
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-800">Richard Horváth</p>
                  <div className="flex text-yellow-400 text-sm">
                    {'★'.repeat(5)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                "Už tretíkrát si tu požičiavam auto a vždy som maximálne spokojný. Čisté vozidlá, profesionálny prístup."
              </p>
              <p className="text-xs text-gray-400 mt-2">pred 1 týždňom</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <a 
              href="https://search.google.com/local/writereview?placeid=ChIJjWxy0Q1VUUYRTT1jajF5EhQ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Zanechajte nám recenziu
            </a>
          </div>
        </div>
      </section>

  

    </div>
  );
};

export default HomePage; 