import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon, FunnelIcon, ClockIcon, ChevronLeftIcon, ChevronRightIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import CarCard from '../components/CarCard';
import ReviewsSection from '../components/ReviewsSection';
import ContactMapSection from '../components/ContactMapSection';
import BookingFormSection from '../components/BookingFormSection';
import Carousel from '../components/Carousel';
import CustomDatePicker from '../components/CustomDatePicker';
import DatePicker from '../components/DatePicker';
import { carsAPI, locationsAPI, bannersAPI } from '../services/api';
import config from '../config/config';
const HeroImg = '/hero3.jpeg';
const VasenImg = '/luxury-cars-values.jpg';

// Car images
import SkodaCitigoImg from '../auta/skoda-citigo.jpg';
import ToyotaAygoImg from '../auta/toyota-aygo.jpg';
import VWBeetleImg from '../auta/beetle.jpg';
import HyundaiKonaImg from '../auta/hyundai-kona.jpg';
import SkodaOctaviaImg from '../auta/skoda-octavia.jpeg';
import VWPassatImg from '../auta/vw-passat-variant.jpg';
import MercedesCLAImg from '../auta/mercedes-cla-220.jpg';
import MercedesCCombiImg from '../auta/mercedes-c-combi-automat.jpg';
import SkodaKodiaqImg from '../auta/skoda kodiaq.jpg';
import Peugeot5008Img from '../auta/peugeot 5008.jpg';
import MercedesGLCImg from '../auta/mercedes glc automat.jpg';
import MercedesVClassImg from '../auta/merc-vclass-automat.jpeg';

// Category icons
import SUVImg from '../catg img/SUV.webp';
import SUVIconImg from '../catg img/SUV.png';
import SedanIconImg from '../catg img/sedan-removebg-preview.png';
import SportIconImg from '../catg img/sport.webp';
import CoupeIconImg from '../catg img/coupe.png';
import KombiIconImg from '../catg img/combi.png';
import ElektroIconImg from '../catg img/elektricke.png';
import UzitkovePng from '../catg img/uzitkove.png';
import ViacmiestneIconImg from '../catg img/viacmiestne.png';

// Fade In Up Animation Component
const FadeInUp = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
};

// Floating Hero Car Bubbles - Glass effect boxes with rotating car info
const heroCars = [
  { name: "Škoda Citigo", price: "od 25€/deň", type: "Malé auto" },
  { name: "Toyota AygoX", price: "od 40€/deň", type: "Malé auto" },
  { name: "VW Beetle", price: "od 50€/deň", type: "Stredná trieda" },
  { name: "Hyundai Kona", price: "od 50€/deň", type: "SUV" },
  { name: "Škoda Octavia", price: "od 40€/deň", type: "Stredná trieda" },
  { name: "VW Passat Variant", price: "od 50€/deň", type: "Kombi" },
  { name: "Mercedes CLA 220", price: "od 75€/deň", type: "Business" },
  { name: "Mercedes C Combi", price: "od 75€/deň", type: "Business" },
  { name: "Škoda Kodiaq", price: "od 70€/deň", type: "SUV" },
  { name: "Peugeot 5008", price: "od 70€/deň", type: "7-miestne" },
  { name: "Mercedes GLC", price: "od 110€/deň", type: "SUV Premium" },
  { name: "Mercedes V-Class", price: "od 120€/deň", type: "VAN" },
];

// Scroll to section helper
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 100;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
};

// Floating Car Bubble - clicks scroll to cars section
const FloatingCarBubble = ({ position, cars, delay = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cars.length);
    }, 3500 + delay * 400);
    return () => clearInterval(interval);
  }, [cars.length, delay]);

  const positionStyles = {
    topLeft: { top: '18%', left: '4%' },
    topRight: { top: '15%', right: '4%' },
    bottomLeft: { bottom: '28%', left: '3%' },
    bottomRight: { bottom: '25%', right: '3%' },
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    scrollToSection('cars');
  };

  return (
    <motion.div
      className="absolute hidden lg:block cursor-pointer"
      style={{ ...positionStyles[position], zIndex: 20 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: delay * 0.3 }}
      whileHover={{ scale: 1.05 }}
    >
      <div
        onClick={handleClick}
        className="rounded-2xl px-5 py-3 cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.08) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)'
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-green-400" style={{ boxShadow: '0 0 8px rgba(74, 222, 128, 0.6)' }}></div>
            <div>
              <p className="text-sm font-bold" style={{ color: '#ffffff', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                {cars[currentIndex].name}
              </p>
              <p className="text-xs" style={{ color: '#ffffff', opacity: 0.85 }}>
                {cars[currentIndex].price}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Hero reviews for floating bubbles
const heroReviews = [
  { name: "Julia Fekiacova", text: "Skvelá skúsenosť s prenájmom!", rating: 5 },
  { name: "Justina S.", text: "Nice, responsive and honest people.", rating: 5 },
  { name: "Assen Hinov", text: "Excellent service and responsiveness!", rating: 5 },
  { name: "Lee Cookson", text: "Polite, helpful and efficient.", rating: 5 },
  { name: "Helen Matsyuk", text: "Perfect attitude to each client!", rating: 5 },
  { name: "Lukasz M.", text: "Great car, excellent service.", rating: 5 },
];

// Floating Review Bubble - clicks scroll to reviews section
const FloatingReviewBox = ({ position, reviews, delay = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4000 + delay * 500);
    return () => clearInterval(interval);
  }, [reviews.length, delay]);

  const positionStyles = {
    topLeft: { top: '18%', left: '4%' },
    topRight: { top: '15%', right: '4%' },
    bottomLeft: { bottom: '28%', left: '3%' },
    bottomRight: { bottom: '25%', right: '3%' },
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    scrollToSection('reviews');
  };

  return (
    <motion.div
      className="absolute hidden lg:block cursor-pointer"
      style={{ ...positionStyles[position], zIndex: 20 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: delay * 0.3 }}
      whileHover={{ scale: 1.05 }}
    >
      <div
        onClick={handleClick}
        className="rounded-2xl px-5 py-3 max-w-[220px] cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.08) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)'
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="flex">
                {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                  <span key={i} style={{ color: '#facc15', fontSize: '12px' }}>★</span>
                ))}
              </div>
            </div>
            <p className="text-xs font-medium mb-1" style={{ color: '#ffffff', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
              "{reviews[currentIndex].text}"
            </p>
            <p className="text-xs" style={{ color: '#ffffff', opacity: 0.75 }}>
              — {reviews[currentIndex].name}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [banners, setBanners] = useState([]);
  const [loadingBanners, setLoadingBanners] = useState(true);
  const [brands, setBrands] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  // Slider images - fallback to static images if API fails
  const sliderImages = [HeroImg, VasenImg];

  // Car classes for filtering
  const carClasses = [
    { name: 'Sedan', value: 'sedan', icon: SedanIconImg },
    { name: 'Kombi', value: 'kombi', icon: KombiIconImg },
    { name: 'Sport', value: 'sport', icon: SportIconImg },
    { name: 'SUV', value: 'suv', icon: SUVIconImg },
    { name: 'Premium', value: 'premium', icon: CoupeIconImg },
    { name: 'Viacmiestne', value: 'viacmiestne', icon: ViacmiestneIconImg },
    { name: 'Elektro', value: 'elektro', icon: ElektroIconImg },
    { name: 'Úžitkové', value: 'uzitkove', icon: UzitkovePng }
  ];

  // Filters

  const [filters, setFilters] = useState({
    priceRange: 'all',
    transmission: 'all',
    fuelType: 'all',
    brand: 'all',
  });



  // Create slides from all banner images
  const allSlides = banners.length > 0
    ? banners.flatMap(banner =>
        banner.images && banner.images.length > 0
          ? banner.images
              .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)) // Sort by sortOrder
              .map(image => {
                // Handle carId as either string or populated object
                const carIdValue = image.carId
                  ? (typeof image.carId === 'object' ? image.carId._id : image.carId)
                  : null;

                const slide = {
                  imageUrl: image.url,
                  title: image.title || banner.title || 'Prémiová flotila\nvozidiel',
                  subtitle: image.description || banner.subtitle || 'Luxusné vozidlá pre náročných klientov. Zažite komfort a štýl na každej ceste.',
                  alt: image.alt || image.title || banner.title || 'Premium car',
                  carId: carIdValue, // Store carId (string) for click-through
                  carData: typeof image.carId === 'object' ? image.carId : null // Store full car object if available
                };

                // Debug log each slide creation
                console.log('📸 Creating slide:', {
                  title: slide.title,
                  hasCarId: !!slide.carId,
                  carId: slide.carId,
                  carData: slide.carData ? `${slide.carData.brand} ${slide.carData.model}` : null
                });

                return slide;
              })
          : [{
              imageUrl: sliderImages[0], // fallback image
              title: banner.title || 'Prémiová flotila\nvozidiel',
              subtitle: banner.subtitle || 'Luxusné vozidlá pre náročných klientov. Zažite komfort a štýl na každej ceste.',
              alt: banner.title || 'Premium car',
              carId: null,
              carData: null
            }]
      )
    : sliderImages.map((img, idx) => ({
        imageUrl: img,
        title: 'Prémiová flotila\nvozidiel',
        subtitle: 'Luxusné vozidlá pre náročných klientov. Zažite komfort a štýl na každej ceste.',
        alt: 'Premium car',
        carId: null,
        carData: null
      }));

  // Debug: Log final allSlides array
  console.log('🎬 Final allSlides array:', allSlides.map(s => ({
    title: s.title,
    hasCarId: !!s.carId,
    carId: s.carId
  })));

  // Navigation functions for slider
  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const nextIndex = (prev + 1) % allSlides.length;
      console.log('Next slide:', prev, '->', nextIndex);
      return nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const prevIndex = prev === 0 ? allSlides.length - 1 : prev - 1;
      console.log('Prev slide:', prev, '->', prevIndex);
      return prevIndex;
    });
  };

  // Auto-slide effect
  useEffect(() => {
    if (allSlides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % allSlides.length);
    }, 7000); // Change slide every 7 seconds

    return () => clearInterval(interval);
  }, [allSlides.length]);

  // Parallax effect for hero image
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.2; // 20% parallax effect
      setParallaxOffset(rate);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoadingBanners(true);
        const carouselBanners = await bannersAPI.getByPosition('hero-section');
        console.log('🎨 Homepage banners loaded:', carouselBanners);

        // Debug: Log banner images with carId info
        if (carouselBanners && carouselBanners.length > 0) {
          console.log('=== BANNER DEBUG START ===');
          carouselBanners.forEach((banner, idx) => {
            console.log(`Banner ${idx}:`, banner.title);
            if (banner.images && banner.images.length > 0) {
              banner.images.forEach((img, imgIdx) => {
                console.log(`  Image ${imgIdx}:`, {
                  url: img.url,
                  title: img.title,
                  carId: img.carId,
                  carIdType: typeof img.carId,
                  hasCarId: !!img.carId,
                  carIdValue: img.carId?._id || img.carId
                });
              });
            }
          });
          console.log('=== BANNER DEBUG END ===');
        }

        setBanners(carouselBanners);
      } catch (error) {
        console.error('Error loading banners:', error);
      } finally {
        setLoadingBanners(false);
      }
    };

    fetchBanners();
  }, []);

  // Fetch brands from API
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoadingBrands(true);
        const response = await fetch(`${config.API_BASE_URL}/api/public/users/${config.ADMIN_EMAIL}/brands-catalog`);
        const data = await response.json();
        if (data.success && data.data) {
          console.log(`🚗 Found ${data.count} brands from brands-catalog`);

          // Transform API data to match the format needed by the component
          const transformedBrands = data.data.map(brand => ({
            name: brand.name,
            value: brand.name.toLowerCase().replace(/\s+/g, '-'),
            logo: brand.logo,
            usageCount: brand.usageCount || 0
          }))
          // Sort brands alphabetically by name (A to Z)
          .sort((a, b) => a.name.localeCompare(b.name));

          setBrands(transformedBrands);
          console.log('🚗 Brands loaded (sorted A-Z):', transformedBrands);
        }
      } catch (error) {
        console.error('Error loading brands:', error);
        // Fallback to empty array if fetch fails
        setBrands([]);
      } finally {
        setLoadingBrands(false);
      }
    };

    fetchBrands();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  // All cars data - 12 vehicles
  const allCars = [
    {
      _id: 'skoda-citigo',
      brand: 'Škoda',
      model: 'Citigo',
      fullName: 'Škoda Citigo',
      dailyRate: 25,
      power: '55',
      transmission: 'automat',
      bodyType: 'Malé auto',
      fuelType: 'benzín',
      image: SkodaCitigoImg,
      seats: 5,
      category: 'ekonomicke'
    },
    {
      _id: 'toyota-aygox',
      brand: 'Toyota',
      model: 'AygoX',
      fullName: 'Toyota AygoX',
      dailyRate: 40,
      power: '72',
      transmission: 'automat',
      bodyType: 'Malé auto',
      fuelType: 'benzín',
      image: ToyotaAygoImg,
      seats: 4,
      category: 'ekonomicke'
    },
    {
      _id: 'vw-beetle',
      brand: 'VW',
      model: 'Beetle',
      fullName: 'VW Beetle',
      dailyRate: 50,
      power: '105',
      transmission: 'automat',
      bodyType: 'Stredná trieda',
      fuelType: 'benzín',
      image: VWBeetleImg,
      seats: 4,
      category: 'sport'
    },
    {
      _id: 'hyundai-kona',
      brand: 'Hyundai',
      model: 'Kona',
      fullName: 'Hyundai Kona',
      dailyRate: 50,
      power: '120',
      transmission: 'automat',
      bodyType: 'SUV',
      fuelType: 'benzín',
      image: HyundaiKonaImg,
      seats: 5,
      category: 'suv'
    },
    {
      _id: 'skoda-octavia',
      brand: 'Škoda',
      model: 'Octavia',
      fullName: 'Škoda Octavia',
      dailyRate: 40,
      power: '150',
      transmission: 'automat',
      bodyType: 'Kombi',
      fuelType: 'diesel',
      image: SkodaOctaviaImg,
      seats: 5,
      category: 'kombi'
    },
    {
      _id: 'vw-passat-variant',
      brand: 'VW',
      model: 'Passat Variant',
      fullName: 'VW Passat Variant',
      dailyRate: 50,
      power: '150',
      transmission: 'automat',
      bodyType: 'Kombi',
      fuelType: 'diesel',
      image: VWPassatImg,
      seats: 5,
      category: 'kombi'
    },
    {
      _id: 'mercedes-cla-220',
      brand: 'Mercedes',
      model: 'CLA 220 CDI',
      fullName: 'Mercedes CLA 220 CDI',
      dailyRate: 75,
      power: '177',
      transmission: 'automat',
      bodyType: 'Sedan',
      fuelType: 'diesel',
      image: MercedesCLAImg,
      seats: 5,
      category: 'premium'
    },
    {
      _id: 'mercedes-c-combi',
      brand: 'Mercedes',
      model: 'C Combi',
      fullName: 'Mercedes C Combi',
      dailyRate: 75,
      power: '170',
      transmission: 'automat',
      bodyType: 'Kombi',
      fuelType: 'diesel',
      image: MercedesCCombiImg,
      seats: 5,
      category: 'premium'
    },
    {
      _id: 'skoda-kodiaq',
      brand: 'Škoda',
      model: 'Kodiaq',
      fullName: 'Škoda Kodiaq',
      dailyRate: 70,
      power: '190',
      transmission: 'automat',
      bodyType: 'SUV',
      fuelType: 'diesel',
      image: SkodaKodiaqImg,
      seats: 5,
      category: 'suv'
    },
    {
      _id: 'peugeot-5008',
      brand: 'Peugeot',
      model: '5008',
      fullName: 'Peugeot 5008',
      dailyRate: 70,
      power: '180',
      transmission: 'automat',
      bodyType: '7-miestne',
      fuelType: 'diesel',
      image: Peugeot5008Img,
      seats: 7,
      category: 'viacmiestne'
    },
    {
      _id: 'mercedes-glc',
      brand: 'Mercedes',
      model: 'GLC',
      fullName: 'Mercedes GLC',
      dailyRate: 110,
      power: '204',
      transmission: 'automat',
      bodyType: 'SUV',
      fuelType: 'diesel',
      image: MercedesGLCImg,
      seats: 5,
      category: 'suv'
    },
    {
      _id: 'mercedes-v-class',
      brand: 'Mercedes',
      model: 'V-Class',
      fullName: 'Mercedes V-Class',
      dailyRate: 120,
      power: '190',
      transmission: 'automat',
      bodyType: 'VAN',
      fuelType: 'diesel',
      image: MercedesVClassImg,
      seats: 8,
      category: 'viacmiestne'
    }
  ];

  // Premium cars (higher priced cars)
  const premiumCars = allCars.filter(car => car.dailyRate >= 130);
  
  // Standard cars (lower priced cars)
  const standardCars = allCars.filter(car => car.dailyRate < 130);

  // Car brands for filter
  const carBrands = [
    { name: 'Všetky značky', value: 'all' },
    { name: 'Audi', value: 'audi' },
    { name: 'BMW', value: 'bmw' },
    { name: 'Mercedes-Benz', value: 'mercedes' },
    { name: 'Volkswagen', value: 'volkswagen' },
    { name: 'Škoda', value: 'skoda' },
    { name: 'Maserati', value: 'maserati' },
    { name: 'Porsche', value: 'porsche' }
  ];

  const priceRanges = [
    { name: 'Všetky ceny', value: 'all' },
    { name: '0€ - 50€', value: '0-50' },
    { name: '50€ - 100€', value: '50-100' },
    { name: '100€ - 150€', value: '100-150' },
    { name: '150€+', value: '150+' }
  ];

  const testimonials = [
    {
      year: 2024,
      text: "Prenájom aut cez Škola Octavia na výlet, a bol som nadmieru spokojný. Auto bolo ako nové, čisté číslov a personál veľmi ochotný, celá výkon na jedničku. Určite sa rád vrátim.",
      name: "Marek Kováč",
      rating: 5
    },
    {
      year: 2024, 
      text: "Skvelá skúsenosť s prenájmom Superb. Všetko prebehlo rýchlo a bez problémov, auto malo plnú nádrž a odovzdanie bolo tiež rýchlo a hladce. Odporúčam definitívne všetkým. Ďakujem! :)",
      name: "Zuzana Horváthová", 
      rating: 5
    },
    {
      year: 2025,
      text: "Profesionálny prístup a kvalitné vozidlá. Prenájom som si BMW x3 pozor Vitáška, a bol som veľmi spokojný služba aka aj z transparentnosti, s vozidlom. Jednoznačne odporúčam!",
      name: "Ján Petrík",
      rating: 5
    }
  ];

  // Add missing formData state
  const [formData, setFormData] = useState({});
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [heroFormUnavailableDates, setHeroFormUnavailableDates] = useState([]);
  const [heroFormLocations, setHeroFormLocations] = useState([]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that a car is selected
    if (!formData.selectedCar) {
      alert('Prosím vyberte auto');
      return;
    }

    // Validate minimum 2-day reservation if both dates are selected
    if (pickupDate && returnDate) {
      const daysDifference = Math.ceil((returnDate - pickupDate) / (1000 * 60 * 60 * 24));
      if (daysDifference < 2) {
        alert('Minimálna dĺžka rezervácie sú 2 dni. Prosím vyberte dátumy s minimálnym rozdielom 2 dní.');
        return;
      }
    }

    // Build query parameters for booking page
    const queryParams = new URLSearchParams({
      car: formData.selectedCar
    });

    // Add pickup date if selected (format in local timezone to avoid date shift)
    if (pickupDate) {
      const year = pickupDate.getFullYear();
      const month = String(pickupDate.getMonth() + 1).padStart(2, '0');
      const day = String(pickupDate.getDate()).padStart(2, '0');
      queryParams.append('pickupDate', `${year}-${month}-${day}`);
    }

    // Add return date if selected (format in local timezone to avoid date shift)
    if (returnDate) {
      const year = returnDate.getFullYear();
      const month = String(returnDate.getMonth() + 1).padStart(2, '0');
      const day = String(returnDate.getDate()).padStart(2, '0');
      queryParams.append('returnDate', `${year}-${month}-${day}`);
    }

    // Add location if selected
    if (formData.location) {
      queryParams.append('pickupLocation', formData.location);
      queryParams.append('returnLocation', formData.location);
    }

    // Navigate to booking page with query parameters
    navigate(`/booking?${queryParams.toString()}`);
  };

  // Load cars from hardcoded data (no API)
  useEffect(() => {
    // Use hardcoded static car data
    const staticCarsWithAvailability = allCars.map(car => ({
      ...car,
      unavailableDates: [],
      status: 'available'
    }));
    setCars(staticCarsWithAvailability);
    setFilteredCars(staticCarsWithAvailability);
    setLoading(false);
  }, []);

  // Load pickup locations from API for hero form
  useEffect(() => {
    const loadLocations = async () => {
      try {
        const { locations: locs } = await locationsAPI.getPickupLocations();
        if (locs && locs.length > 0) {
          console.log('📍 Hero form - Loaded locations:', locs.length);
          setHeroFormLocations(locs);
        } else {
          console.warn('⚠️ No locations returned from API');
          setHeroFormLocations([]);
        }
      } catch (err) {
        console.error('❌ Error loading hero form locations:', err);
        setHeroFormLocations([]);
      }
    };

    loadLocations();
  }, []);

  // Fetch car availability when a car is selected in hero form
  useEffect(() => {
    const fetchHeroFormCarAvailability = async () => {
      if (!formData.selectedCar) {
        setHeroFormUnavailableDates([]);
        return;
      }

      try {
        console.log('🚗 Fetching availability for hero form car:', formData.selectedCar);

        // Get 6 months range for availability check
        const startDate = new Date();
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 6);

        const availability = await carsAPI.getCarAvailability(
          formData.selectedCar,
          startDate,
          endDate
        );

        if (availability && availability.unavailableDates) {
          console.log('📅 Hero form - Loaded unavailable dates:', availability.unavailableDates.length);
          setHeroFormUnavailableDates(availability.unavailableDates);
        } else {
          setHeroFormUnavailableDates([]);
        }
      } catch (err) {
        console.error('❌ Error fetching hero form car availability:', err);
        setHeroFormUnavailableDates([]);
      }
    };

    fetchHeroFormCarAvailability();
  }, [formData.selectedCar]);

  // Apply filters
  useEffect(() => {
    let filtered = [...cars];

    // Car class filter (activeTab)
    if (activeTab !== 'all') {
      if (activeTab === 'sedan') {
        filtered = filtered.filter(car => car.category === 'sedan');
      } else if (activeTab === 'kombi') {
        filtered = filtered.filter(car => car.category === 'kombi');
      } else if (activeTab === 'sport') {
        filtered = filtered.filter(car => car.category === 'sport');
      } else if (activeTab === 'suv') {
        filtered = filtered.filter(car => car.category === 'suv');
      } else if (activeTab === 'premium') {
        filtered = filtered.filter(car => car.category === 'premium');
      } else if (activeTab === 'viacmiestne') {
        filtered = filtered.filter(car => car.category === 'viacmiestne');
      } else if (activeTab === 'elektro') {
        filtered = filtered.filter(car => car.category === 'elektro');
      } else if (activeTab === 'uzitkove') {
        filtered = filtered.filter(car => car.category === 'uzitkove');
      }
    }

    // Brand filter (single selection)

    setFilteredCars(filtered);
  }, [activeTab, cars]);

  return (
    <div className="min-h-screen text-black" style={{backgroundColor: '#ffffff'}}>
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .car-grid-item {
          animation: fadeIn 0.5s ease-out forwards;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .car-grid-container {
          display: grid;
          transition: all 0.3s ease-out;
        }

        .car-grid-item-exit {
          opacity: 0;
          transform: scale(0.8);
          transition: opacity 0.3s ease-out, transform 0.3s ease-out;
        }

        /* Hide native date input text and make fully clickable */
        input[type="date"]::-webkit-datetime-edit {
          color: transparent;
          background: transparent;
        }
        input[type="date"]::-webkit-calendar-picker-indicator {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          color: transparent;
          background: transparent;
          cursor: pointer;
        }
        input[type="date"]::-webkit-inner-spin-button {
          display: none;
        }
        input[type="date"] {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          color-scheme: dark;
        }
        input[type="date"]::-webkit-datetime-edit-text,
        input[type="date"]::-webkit-datetime-edit-month-field,
        input[type="date"]::-webkit-datetime-edit-day-field,
        input[type="date"]::-webkit-datetime-edit-year-field {
          color: transparent;
        }

        /* Modern calendar picker styling */
        input[type="date"]::-webkit-calendar-picker-indicator:hover {
          background: rgba(250, 146, 8, 0.1);
          border-radius: 8px;
        }

        /* Calendar dropdown - unfortunately very limited browser support for styling */
        input[type="date"]::-webkit-calendar-picker {
          background: #1a1a1a;
          border-radius: 12px;
          padding: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }
      `}</style>
      
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${HeroImg})`,
            transform: `translateY(${parallaxOffset}px)`,
            height: 'calc(100vh + 200px)', // Make background larger to accommodate parallax movement
            top: '-100px' // Offset to center the larger background
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Floating Bubbles - Desktop Only: 2 Cars (top) + 2 Reviews (bottom) */}
        <FloatingCarBubble position="topLeft" cars={heroCars.slice(0, 4)} delay={0} />
        <FloatingCarBubble position="topRight" cars={heroCars.slice(4, 8)} delay={1} />
        <FloatingReviewBox position="bottomLeft" reviews={heroReviews.slice(0, 3)} delay={2} />
        <FloatingReviewBox position="bottomRight" reviews={heroReviews.slice(3, 6)} delay={3} />

        <div className="relative z-10 h-full px-4 md:px-8 lg:px-16 w-full flex flex-col justify-between max-[480px]:justify-end max-[480px]:pb-4">
          {/* Spacer for top */}
          <div className="flex-1"></div>

          {/* Center - Heading */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-center flex-shrink-0"
          >
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-goldman font-bold leading-tight max-[480px]:text-3xl max-[480px]:leading-tight uppercase mb-4" style={{fontFamily: 'Monument Extended, sans-serif', textShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.4)'}}>
              Autopožičovňa Bratislava
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl font-medium max-w-3xl mx-auto" style={{fontFamily: 'Gilroy, sans-serif', color: '#ffffff', textShadow: '0 2px 10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.4)'}}>
              Prenájom prémiových vozidiel s osobným prístupom
            </p>
          </motion.div>

          {/* Spacer to push form to bottom */}
          <div className="flex-1"></div>

          {/* Bottom - Form only */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex gap-6 mx-8 mb-8"
          >
            {/* Form - horizontal layout with glass effect */}
            <div
              className="p-6 rounded-2xl flex items-center gap-6"
              style={{
                flex: '1',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.18)'
              }}
            >
              {/* Title on Left */}
              <div className="flex-shrink-0">
                <h2 className="text-2xl font-goldman font-bold whitespace-nowrap" style={{color: '#ffffff'}}>
                  Rýchla<br />rezervácia
                </h2>
              </div>

              {/* Form inputs in horizontal columns */}
              <form onSubmit={handleSubmit} className="flex items-center gap-4 flex-1">
                {/* Car Selection with icon on right */}
                <div className="flex-1 relative">
                  <select
                    name="selectedCar"
                    value={formData.selectedCar || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm rounded-md border border-gray-700 focus:border-orange-500 focus:outline-none appearance-none"
                    style={{
                      backgroundColor: '#191919',
                      color: formData.selectedCar ? '#ffffff' : '#9fa3ab'
                    }}
                    disabled={loading}
                  >
                    <option value="" style={{color: '#9fa3ab'}}>{loading ? 'Načítavam autá...' : 'Vyberte auto'}</option>
                    {cars.map((car) => (
                      <option key={car._id} value={car._id}>
                        {car.brand} {car.model} - od {car.pricing?.dailyRate || car.dailyRate || 0}€/deň
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5" style={{color: '#2563eb'}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                  </div>
                </div>

                {/* Location Selection with pin icon on right */}
                <div className="flex-1 relative">
                  <select
                    name="location"
                    value={formData.location || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm rounded-md border border-gray-700 focus:border-orange-500 focus:outline-none appearance-none"
                    style={{
                      backgroundColor: '#191919',
                      color: formData.location ? '#ffffff' : '#9fa3ab'
                    }}
                  >
                    <option value="" style={{color: '#9fa3ab'}}>Miesto vyzdvihnutia</option>
                    {heroFormLocations.map((location) => (
                      <option key={location.id} value={location.name}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <MapPinIcon className="w-5 h-5" style={{color: '#2563eb'}} />
                  </div>
                </div>

                {/* Date From */}
                <div className="flex-1">
                  <DatePicker
                    selectedDate={pickupDate}
                    onDateSelect={setPickupDate}
                    minDate={new Date()}
                    unavailableDates={heroFormUnavailableDates}
                    placeholder="Dátum prevzatia"
                    otherSelectedDate={returnDate}
                    isReturnPicker={false}
                    onOtherDateReset={() => setReturnDate(null)}
                  />
                </div>

                {/* Date To */}
                <div className="flex-1">
                  <DatePicker
                    selectedDate={returnDate}
                    onDateSelect={setReturnDate}
                    minDate={pickupDate || new Date()}
                    unavailableDates={heroFormUnavailableDates}
                    placeholder="Dátum vrátenia"
                    otherSelectedDate={pickupDate}
                    isReturnPicker={true}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="hover:opacity-90 px-8 py-3 text-base transition-colors rounded-lg whitespace-nowrap"
                  style={{
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    fontWeight: 700
                  }}
                >
                  Rezervovať
                </button>
              </form>
            </div>
          </motion.div>

          {/* Mobile Form - vertical layout (only under 480px) */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden max-[480px]:flex max-[480px]:flex-col gap-4 mx-2"
          >
            <div
              className="p-4 rounded-2xl flex flex-col gap-4"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.18)'
              }}
            >
              {/* Title */}
              <h2 className="text-xl font-goldman font-bold text-center" style={{color: '#ffffff'}}>
                Rýchla rezervácia
              </h2>

              {/* Form inputs in vertical rows */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {/* Car Selection with icon on right */}
                <div className="relative">
                  <select
                    name="selectedCar"
                    value={formData.selectedCar || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm rounded-md border border-gray-700 focus:border-orange-500 focus:outline-none appearance-none"
                    style={{
                      backgroundColor: '#191919',
                      color: formData.selectedCar ? '#ffffff' : '#9fa3ab'
                    }}
                    disabled={loading}
                  >
                    <option value="" style={{color: '#9fa3ab'}}>{loading ? 'Načítavam autá...' : 'Vyberte auto'}</option>
                    {cars.map((car) => (
                      <option key={car._id} value={car._id}>
                        {car.brand} {car.model} - od {car.pricing?.dailyRate || car.dailyRate || 0}€/deň
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5" style={{color: '#2563eb'}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                  </div>
                </div>

                {/* Location Selection with pin icon on right */}
                <div className="relative">
                  <select
                    name="location"
                    value={formData.location || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm rounded-md border border-gray-700 focus:border-orange-500 focus:outline-none appearance-none"
                    style={{
                      backgroundColor: '#191919',
                      color: formData.location ? '#ffffff' : '#9fa3ab'
                    }}
                  >
                    <option value="" style={{color: '#9fa3ab'}}>Miesto vyzdvihnutia</option>
                    {heroFormLocations.map((location) => (
                      <option key={location.id} value={location.name}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <MapPinIcon className="w-5 h-5" style={{color: '#2563eb'}} />
                  </div>
                </div>

                {/* Date From */}
                <div className="w-full">
                  <DatePicker
                    selectedDate={pickupDate}
                    onDateSelect={setPickupDate}
                    minDate={new Date()}
                    unavailableDates={heroFormUnavailableDates}
                    placeholder="Dátum prevzatia"
                    otherSelectedDate={returnDate}
                    isReturnPicker={false}
                    onOtherDateReset={() => setReturnDate(null)}
                  />
                </div>

                {/* Date To */}
                <div className="w-full">
                  <DatePicker
                    selectedDate={returnDate}
                    onDateSelect={setReturnDate}
                    minDate={pickupDate || new Date()}
                    unavailableDates={heroFormUnavailableDates}
                    placeholder="Dátum vrátenia"
                    otherSelectedDate={pickupDate}
                    isReturnPicker={true}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full hover:opacity-90 px-8 py-3 text-base transition-colors rounded-lg"
                  style={{
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    fontWeight: 700
                  }}
                >
                  Rezervovať
                </button>
              </form>
            </div>
          </motion.div>
        </div>

      </section>

      {/* Car Categories Section */}
      <section id="cars" className="py-8 max-[480px]:pt-[15px]" style={{backgroundColor: '#ffffff', paddingTop: '50px', paddingBottom: '100px'}}>
        <div className="max-w-7xl mx-auto px-4">

          {/* Car Grid - Centered, 3 columns */}
          <div className="w-full max-w-7xl mx-auto">

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              layout
            >
              <AnimatePresence mode="popLayout">
                {filteredCars.map((car, index) => (
                  <motion.div
                    key={car._id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{
                      layout: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
                      opacity: { duration: 0.3 },
                      scale: { duration: 0.3 }
                    }}
                    className="aspect-[4/3] relative rounded-lg"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.18)',
                      borderRadius: '8px',
                      boxShadow: 'inset 0 1px 2px #ffffff30, 0 1px 2px #00000030, 0 2px 4px #00000015'
                    }}
                  >
                    <div
                      onClick={() => window.location.href = `/car/${car._id}`}
                      className="flex flex-col w-full h-full cursor-pointer rounded-lg overflow-hidden"
                    >
                      {/* Top - Car Image */}
                      <div className="flex-1 relative overflow-hidden">
                        {car.image || (car.images && car.images[0] && car.images[0].url) ? (
                          <img
                            src={car.image || (car.images && car.images[0] && car.images[0].url)}
                            alt={`${car.brand} ${car.model}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">No image</span>
                          </div>
                        )}
                      </div>

                      {/* Bottom - Glass Box with Content */}
                      <div className="p-4" style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.15)'
                      }}>
                        <div className="flex items-center justify-between">
                          {/* Car name and specs together in left container */}
                          <div className="flex flex-col gap-1">
                            <h3 className="text-lg font-goldman font-bold text-white uppercase">{car.brand} {car.model}</h3>
                            <div className="flex items-center gap-x-3 text-xs font-goldman text-white">
                              {/* Show Power (kW) - from MongoDB engine.power field or power field */}
                              {(car.engine?.power || car.power) && <span className="font-medium">{car.engine?.power || car.power} kW</span>}

                              {/* Show Fuel Type (moved to second position) */}
                              {(car.fuelType || car.fuel) && (
                                <span className="font-medium capitalize">
                                  {car.fuelType === 'gasoline' ? 'Benzín' :
                                   car.fuelType === 'diesel' ? 'Nafta' :
                                   car.fuelType === 'electric' ? 'Elektro' :
                                   car.fuelType === 'hybrid' ? 'Hybrid' :
                                   car.fuelType || car.fuel}
                                </span>
                              )}

                              {/* Show Transmission (moved to third position) */}
                              {car.transmission && <span className="font-medium capitalize">{car.transmission}</span>}

                              {/* Show Seats if available */}
                              {car.seats && <span className="font-medium">{car.seats} miest</span>}
                            </div>
                          </div>

                          {/* Rezervovat Button and Price */}
                          <div className="ml-4 flex flex-col gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.location.href = `/booking?car=${car._id}`;
                              }}
                              className="hover:opacity-90 text-xs font-goldman font-bold transition-colors px-3 py-1 rounded-lg whitespace-nowrap"
                              style={{
                                backgroundColor: '#2563eb',
                                color: '#ffffff'
                              }}
                            >
                              Rezervovať
                            </button>
                            <div className="text-sm font-goldman font-bold text-white text-center">
                              od {car.pricing?.dailyRate || car.dailyRate || 0}€
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Performance Stats Section */}
      <section className="py-16 lg:py-40 bg-white relative overflow-hidden">
        {/* Desktop Layout - Image on left, text on right */}
        <div className="hidden lg:block absolute left-0 top-0 w-1/3 h-full">
          <div className="relative w-full h-full">
            <img
              src={VasenImg}
              alt="Luxury car"
              className="w-full h-full object-cover"
            />
            {/* Gradient overlays - top and bottom */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0) 80%, #000000 100%)'
              }}
            ></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Mobile Layout - Text first, image below */}
          <div className="lg:hidden mb-8">
            <FadeInUp>
              <h2 className="text-3xl sm:text-4xl font-medium text-white mb-6 font-goldman text-center">
                VAŠA CESTA, NAŠA STAROSTLIVOSŤ
              </h2>
            </FadeInUp>

            <p className="text-black mb-8 text-center px-4">
              Business Car je rodinná autopožičovňa s osobným prístupom. Každé vozidlo udržiavame v perfektnom stave, aby ste si užili bezstarostnú jazdu.
            </p>

            {/* Mobile Image */}
            <div className="mb-8 px-4">
              <img
                src={VasenImg}
                alt="Luxury car"
                className="w-full h-64 sm:h-80 object-cover rounded-lg"
              />
            </div>

            {/* Mobile Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-4">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-goldman font-bold text-[#2563eb] mb-2">12</div>
                <div className="text-white font-goldman font-bold text-sm sm:text-base">Vozidiel v našej flotile</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-goldman font-bold text-[#2563eb] mb-2">10+</div>
                <div className="text-white font-goldman font-bold text-sm sm:text-base">Rokov skúseností</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-goldman font-bold text-[#2563eb] mb-2">1000+</div>
                <div className="text-white font-goldman font-bold text-sm sm:text-base">Spokojných zákazníkov</div>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Text on right */}
          <div className="hidden lg:flex justify-end">
            <div className="w-2/3 pl-12">
              <FadeInUp>
                <h2 className="text-4xl md:text-5xl font-medium text-white mb-8 font-goldman">
                  VAŠA CESTA, NAŠA STAROSTLIVOSŤ
                </h2>
              </FadeInUp>

              <FadeInUp delay={0.2}>
                <p className="text-black font-goldman mb-12 max-w-2xl">
                  Business Car je rodinná autopožičovňa s osobným prístupom. Každé vozidlo udržiavame v perfektnom stave, aby ste si užili bezstarostnú jazdu.
                </p>
              </FadeInUp>

              <FadeInUp delay={0.4}>
                <div className="grid grid-cols-3 gap-8">
                <div className="text-left">
                  <div className="text-5xl font-goldman font-bold text-[#2563eb] mb-2">12</div>
                  <div className="text-white font-goldman font-bold">Vozidiel v našej flotile</div>
                </div>
                <div className="text-left">
                  <div className="text-5xl font-goldman font-bold text-[#2563eb] mb-2">10+</div>
                  <div className="text-white font-goldman font-bold">Rokov skúseností</div>
                </div>
                <div className="text-left">
                  <div className="text-5xl font-goldman font-bold text-[#2563eb] mb-2">1000+</div>
                  <div className="text-white font-goldman font-bold">Spokojných zákazníkov</div>
                </div>
                </div>
              </FadeInUp>
            </div>
          </div>
        </div>
      </section>


      <ReviewsSection />


      <ContactMapSection />


    </div>
  );
};

export default HomePage;