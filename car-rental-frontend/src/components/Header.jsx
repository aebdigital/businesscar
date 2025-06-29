import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import RivalLogo from '../assets/RIVAL LOGO-03.png';
import FacebookIcon from '../assets/facebook.png';
import InstagramIcon from '../assets/instagram.png';
import GoogleIcon from '../assets/icons8-google-48.png';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const leftNavigation = [
    { name: 'Úvod', href: '/' },
    { name: 'Ponuka vozidiel', href: '/fleet' },
    { name: 'Cenník', href: '/pricing' },
    { name: 'Doplnkové služby', href: '/services' },
  ];

  const rightNavigation = [
    { name: 'Podmienky', href: '/terms' },
    { name: 'O nás', href: '/about' },
    { name: 'Kontakt', href: '/contact' },
    { name: 'Otázky a odpovede', href: '/faq' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Header Bar */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '90rem' }}>
          <div className="flex h-12 items-center justify-between">
            <div className="hidden md:flex items-center space-x-4">
              {/* Phone Button */}
              <a
                href="tel:+421907633517"
                className="flex items-center px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm font-medium text-white transition-colors duration-200"
              >
                <PhoneIcon className="h-4 w-4 mr-2" />
                +421 907 633 517
              </a>
              
              {/* Contact Form Button */}
              <Link
                to="/contact"
                className="flex items-center px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm font-medium text-white transition-colors duration-200"
              >
                <EnvelopeIcon className="h-4 w-4 mr-2" />
                NAPÍŠTE NÁM / FORMULÁR
              </Link>
            </div>
            
            {/* Mobile: Empty left side */}
            <div className="md:hidden"></div>
            
            <div className="flex items-center space-x-4">
              {/* Social Icons */}
              <a
                href="https://www.facebook.com/pozicauto"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity duration-200"
              >
                <img src={FacebookIcon} alt="Facebook" className="h-5 w-5" />
              </a>
              
              <a
                href="https://www.instagram.com/rival_autopozicovna/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity duration-200"
              >
                <img src={InstagramIcon} alt="Instagram" className="h-5 w-5" />
              </a>
              
              {/* Google Reviews Button */}
              <a
                href="https://maps.google.com/maps?cid=1405297772265219924"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-1 bg-white hover:bg-gray-50 rounded shadow-md text-sm font-medium text-gray-800 transition-colors duration-200 border border-gray-200"
              >
                <img src={GoogleIcon} alt="Google" className="h-4 w-4 mr-2" />
                Recenzie
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <nav className="mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top" style={{ maxWidth: '90rem' }}>
        <div className="flex h-16 items-center justify-between">
          
          {/* Left Navigation - Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            {leftNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium uppercase transition-colors duration-200 relative group ${
                  isActive(item.href)
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-700 hover:text-green-600'
                }`}
              >
                {item.name}
                {!isActive(item.href) && (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Logo Box - Center */}
          <div className="flex items-center relative z-10" style={{ marginLeft: '10px' }}>
            <Link to="/" className="flex items-center">
              <img 
                src={RivalLogo} 
                alt="Rival Logo" 
                className="h-16 w-auto border-4 border-white shadow-2xl transform md:scale-150 scale-125"
                style={{ 
                  filter: 'drop-shadow(0 8px 15px rgba(0, 0, 0, 0.3))',
                  marginTop: '-12px',
                  marginBottom: '-12px'
                }}
              />
            </Link>
          </div>

          {/* Right Navigation - Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            {rightNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium uppercase transition-colors duration-200 relative group ${
                  isActive(item.href)
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-700 hover:text-green-600'
                }`}
              >
                {item.name}
                {!isActive(item.href) && (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-green-600 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Otvoriť hlavné menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <>
          {/* Blur Overlay - covers main content when menu is open */}
          <div 
            className={`lg:hidden fixed inset-0 bg-white bg-opacity-60 backdrop-blur-md z-30 transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setMobileMenuOpen(false)}
            style={{ 
              top: '115px' // Start below the header with 15px buffer to avoid overlap
            }}
          ></div>
          
          {/* Mobile Menu */}
          <div className={`lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50 overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="space-y-1 pb-3 pt-2">
              {[...leftNavigation, ...rightNavigation].map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium uppercase transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-green-600 bg-green-50'
                      : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </>
      </nav>
    </header>
  );
};

export default Header; 