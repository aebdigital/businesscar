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
  MapPinIcon
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
      
      {/* Hero Banner Section */}
      <section 
        className="relative bg-green-600 text-white py-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${SkodaHero})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="mx-auto px-4 sm:px-6 lg:px-8 relative z-10" style={{ maxWidth: '90rem' }}>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Left Sidebar - Filter */}
            <div className="lg:col-span-1">
              <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-center">
                  Potrebujete auto?
                </h3>
                <form onSubmit={handleSearchSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Od dátumu</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Do dátumu</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Trieda vozidla</label>
                    <select
                      value={carType}
                      onChange={(e) => setCarType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Všetky triedy</option>
                      <option value="ekonomicka">Ekonomická trieda</option>
                      <option value="stredna">Stredná trieda</option>
                      <option value="vyssia">Vyššia trieda</option>
                      <option value="viacmiestne">Viacmiestne vozidlá</option>
                      <option value="uzitkove">Úžitkové vozidlá (dodávky)</option>
                      <option value="karavany">Karavany</option>
                      <option value="motorky">Motorky</option>
                      <option value="sportove">Športové autá</option>
                      <option value="elektromobily">Elektromobily</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
                  >
                    <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                    Vyhľadať
                  </button>
                </form>
              </div>
            </div>

            {/* Spacer for balance */}
            <div className="lg:col-span-3"></div>
          </div>
        </div>
      </section>

      {/* Vehicle Categories */}
      <section className="relative">
        <div className="absolute -top-6 left-0 right-0 z-10">
          <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '90rem' }}>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                'EKONOMICKÁ TRIEDA',
                'ÚŽITKOVÉ',
                'STREDNÁ TRIEDA',
                'VYŠŠIA TRIEDA',
                'VIACMIESTNE'
              ].map((category, index) => (
                <div 
                  key={index} 
                  className="bg-gray-100 shadow-md p-6 rounded-lg text-center hover:bg-green-50 hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105"
                  onClick={() => handleCategoryClick(category.replace('TRIEDA', '').trim())}
                >
                  <h3 className="text-sm font-bold text-gray-800">{category}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-12"></div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '90rem' }}>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md animate-pulse">
                  <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-500 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Chyba pri načítavaní vozidiel</h3>
              <p className="text-gray-500">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cars.slice(0, 4).map((car, index) => (
                <CarCard 
                  key={car._id} 
                  car={car}
                  isPromo={false}
                />
              ))}
              {/* Fill remaining slots if less than 4 cars */}
              {cars.length < 4 && [...Array(4 - cars.length)].map((_, index) => (
                <div key={`placeholder-${index}`} className="bg-white rounded-lg shadow-md border-2 border-dashed border-gray-300 flex items-center justify-center h-64">
                  <div className="text-center text-gray-500">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm">Viac vozidiel už čoskoro</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main Advantages */}
      <section className="py-16 bg-white">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* DIALNIČNÁ ZNÁMKA */}
            <div className="w-[50vw] shadow-md flex">
              <div 
                className="w-[60%] bg-cover bg-center"
                style={{
                  backgroundImage: `url(${Image1})`
                }}
              ></div>
              <div className="w-[40%] bg-white p-6 flex flex-col justify-center">
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  DIALNIČNÁ ZNÁMKA
                </h3>
                <p className="text-gray-700 text-sm">
                  Všetky naše vozidlá sú vybavené platnou slovenskou diaľničnou známkou, a pokiaľ plánujete cestu do zahraničia, postaráme sa aj o zahraničnú známku pre vašu bezstarostnú jazdu.
                </p>
              </div>
            </div>

            {/* VÝMENA VOZIDLA */}
            <div className="w-[50vw] shadow-md flex">
              <div 
                className="w-[60%] bg-cover bg-center"
                style={{
                  backgroundImage: `url(${Image2})`
                }}
              ></div>
              <div className="w-[40%] bg-white p-6 flex flex-col justify-center">
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  VÝMENA VOZIDLA
                </h3>
                <p className="text-gray-700 text-sm">
                  V prípade potreby okamžite zabezpečíme náhradné vozidlo, aby ste neprišli o pohodlie a nezmeškali žiadne plány.
                </p>
              </div>
            </div>

            {/* SEZÓNNE PREZUTIE */}
            <div className="w-[50vw] shadow-md flex mt-[15px]">
              <div 
                className="w-[60%] bg-cover bg-center"
                style={{
                  backgroundImage: `url(${Image3})`
                }}
              ></div>
              <div className="w-[40%] bg-white p-6 flex flex-col justify-center">
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  SEZÓNNE PREZUTIE
                </h3>
                <p className="text-gray-700 text-sm">
                  Naša flotila je vybavená kvalitnými značkovými pneumatikami, ktoré pravidelne meníme v súlade s ročnými obdobiami, aby bola zaistená vaša bezpečnosť na cestách.
                </p>
              </div>
            </div>

            {/* PRAVIDELNÝ SERVIS */}
            <div className="w-[50vw] shadow-md flex mt-[15px]">
              <div 
                className="w-[60%] bg-cover bg-center"
                style={{
                  backgroundImage: `url(${Image4})`
                }}
              ></div>
              <div className="w-[40%] bg-white p-6 flex flex-col justify-center">
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  PRAVIDELNÝ SERVIS
                </h3>
                <p className="text-gray-700 text-sm">
                  Všetky naše vozidlá prechádzajú pravidelnými kontrolami a autorizovaným servisom, aby sa zabezpečila ich bezproblémová prevádzka a maximálna spoľahlivosť.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Banner 1 */}
      <section className="bg-white">
        <div className="w-full">
          <Carousel 
            images={carouselImages} 
            autoPlayInterval={4000} 
            height="h-[40vh]"
          />
        </div>
      </section>

      {/* Vehicle Categories with Images */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '90rem' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'EKONOMICKÉ', bg: EkonomickeImg },
              { name: 'STREDNÁ TRIEDA', bg: Image2 },
              { name: 'VYŠŠIA TRIEDA', bg: PremiumImg },
              { name: 'VIACMIESTNE', bg: ViacmiestneImg },
              { name: 'ÚŽITKOVÉ', bg: UzitkovaImg },
              { name: 'MOTOCYKLE', bg: MotocykleImg },
              { name: 'KARAVANY', bg: KaravanyImg },
              { name: 'ŠPORTOVÉ', bg: SportoveImg }
            ].map((category, index) => (
              <div 
                key={index} 
                className="relative h-64 rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                style={{
                  backgroundImage: `linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.7) 100%), url(${category.bg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
                onClick={() => handleCategoryClick(category.name)}
              >
                <h3 className="absolute bottom-[10%] left-[10%] text-white font-bold uppercase" style={{ fontSize: '18px' }}>
                  {category.name}
                </h3>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-green-600 bg-opacity-0 hover:bg-opacity-20 transition-all duration-200"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carousel Banner 2 */}
      <section className="bg-white">
        <div className="w-full">
              v        <Carousel 
              images={carouselImages} 
              autoPlayInterval={5000} 
              height="h-[40vh]"
            />
        </div>
      </section>

      {/* Instagram Posts */}
      <section className="py-16 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
          
          </div>
          <div className="flex justify-center">
            <div className="w-1/2 shadow-2xl" style={{ borderRadius: '20px', overflow: 'hidden' }}>
              <iframe
                src="https://www.instagram.com/rival_autopozicovna/embed"
                width="100%"
                height="400"
                frameBorder="0"
                scrolling="yes"
                allowTransparency="true"
                style={{ borderRadius: '20px' }}
              ></iframe>
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
              className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Zanechajte nám recenziu
            </a>
          </div>
        </div>
      </section>

      {/* Facebook Section */}
      <section className="pt-16 bg-green-50">
        <div className="w-full flex justify-center">
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fpozicauto&tabs=&width=1120&height=300&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
              width="100%"
              height="18v0px"
              style={{ 
                border: 'none', 
                overflow: 'hidden',
                marginBottom: '0'
              }}
              scrolling="no"
              frameBorder="0"
              allowTransparency="true"
              allow="encrypted-media"
              className="rounded-md mx-auto block"
            ></iframe>
          </div>
        </div>
        
        <style jsx>{`
          ._2p3a {
            width: 100% !important;
            max-width: 1200px !important;
            margin: 0 auto !important;
          }
          
          #facebook {
            margin-bottom: 0 !important;
          }
        `}</style>
      </section>



      {/* Contact and Maps Section */}
      <section className="bg-green-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-600 shadow-lg rounded-lg p-6 text-center border-4 border-white" style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}>
                <PhoneIcon className="h-8 w-8 mx-auto mb-2 text-white" />
                <p className="text-xl font-bold text-white mt-2">+421 907 633 517</p>
              </div>
              
              <div className="bg-green-600 shadow-lg rounded-lg p-6 text-center border-4 border-white" style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}>
                <ClockIcon className="h-8 w-8 mx-auto mb-2 text-white" />
                <p className="text-xl font-bold text-white mt-2">Pon - Pia 08:00 - 16:00</p>
              </div>
              
              <div className="bg-green-600 shadow-lg rounded-lg p-6 text-center border-4 border-white" style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}>
                <EnvelopeIcon className="h-8 w-8 mx-auto mb-2 text-white" />
                <p className="text-xl font-bold text-white mt-2">info@rival.sk</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px] w-full mb-[10px]">
              <div className="bg-transparent">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2637.8674489!2d19.144135616028!3d48.7362799796291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x474c0e58f0f5e7d5%3A0x1e1f2e3d4c5b6a78!2sZvolensk%C3%A1%20cesta%206465%2F8%2C%20974%2005%20Bansk%C3%A1%20Bystrica%2C%20Slovakia!5e0!3m2!1sen!2s!4v1647890123456"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-md"
                ></iframe>
              </div>
              
              <div className="bg-transparent">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2647.234567!2d18.613456789!3d48.567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x474c15a2b3c4d5e6%3A0x8765432109876543!2sObchodn%C3%A1%209520%2F4%2C%20960%2001%20Zvolen%2C%20Slovakia!5e0!3m2!1sen!2s!4v1647890123458"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-md"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage; 