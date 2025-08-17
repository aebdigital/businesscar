import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Domov', href: '/' },
    { name: 'Ponuka vozidiel', href: '/fleet' },
    { name: 'O nás', href: '/about' },
    { name: 'Kontakt', href: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <nav className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '90rem' }}>
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-white text-3xl font-bold">
              Business Car
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center space-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-base font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-white border-b-2 border-white pb-1'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side - Language & Manage Booking */}
          <div className="hidden lg:flex items-center space-x-5">
            {/* Language Selector */}
            <div className="flex items-center space-x-2 text-white/80">
              <GlobeAltIcon className="h-5 w-5" />
              <span className="text-base font-medium">EN</span>
            </div>
            
            {/* Manage Booking Button */}
            <Link
              to="/booking"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-md text-base font-medium transition-colors duration-200"
            >
              Objednať auto
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              type="button"
              className="text-white hover:text-white/80 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-7 w-7" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-7 w-7" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 backdrop-blur-md rounded-lg mt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-3 text-lg font-medium rounded-md transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-white bg-blue-600'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-white/20 pt-2">
                <Link
                  to="/booking"
                  className="block px-4 py-3 text-lg font-medium bg-blue-600 text-white rounded-md text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Objednať auto
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header; 