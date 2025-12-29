import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bars3Icon, HomeIcon } from '@heroicons/react/24/outline';
import Sidebar from './Sidebar';

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [forceBlackMobile, setForceBlackMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Check if body has the force black header class
    const checkForceBlackMobile = () => {
      setForceBlackMobile(document.body.classList.contains('force-black-header-mobile'));
    };

    // Initial check
    checkForceBlackMobile();

    // Set up observers
    window.addEventListener('scroll', handleScroll);

    // Observer for class changes on body
    const observer = new MutationObserver(checkForceBlackMobile);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const navigation = [];


  const handleNavClick = (href) => {
    if (href.startsWith('#')) {
      // Check if we're on homepage
      if (location.pathname === '/') {
        // On homepage, check if element exists
        const element = document.querySelector(href);
        if (element) {
          const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 100;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      } else {
        // Not on homepage, navigate there first then scroll
        navigate('/');
        // Wait for page to fully load including dynamic content (cars) before scrolling
        // Use multiple attempts and re-scroll to handle content loading shifts
        const scrollToElement = (attempts = 0) => {
          if (attempts > 20) return; // Give up after 20 attempts

          setTimeout(() => {
            const element = document.querySelector(href);
            if (element) {
              const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 100;
              window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
              });
              // Re-scroll after a delay to handle dynamic content loading
              if (attempts < 5) {
                scrollToElement(attempts + 1);
              }
            } else {
              scrollToElement(attempts + 1);
            }
          }, attempts === 0 ? 800 : 400 + (attempts * 150));
        };
        scrollToElement();
      }
    } else {
      // Check if we're already on the target page
      if (location.pathname === href) {
        // Already on the page, scroll to top
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        // Navigate to different page
        navigate(href);
      }
    }
    setSidebarOpen(false);
  };

  const isActive = (path) => {
    // Remove all active styling
    return false;
  };

  return (
    <>
      <header className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled || forceBlackMobile ? 'shadow-lg' : 'bg-transparent'
      }`}
        style={{
          backgroundColor: isScrolled || forceBlackMobile ? 'rgba(0, 0, 0, 0.6)' : 'transparent',
          backdropFilter: isScrolled || forceBlackMobile ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: isScrolled || forceBlackMobile ? 'blur(20px)' : 'none'
        }}>
        <nav className="px-4 md:px-8 lg:px-16">
          <div className="flex h-20 items-center justify-between lg:grid lg:grid-cols-3 lg:gap-4">

            {/* Logo + Social Media - Left */}
            <div className="flex items-center justify-start max-[390px]:ml-0 space-x-4">
              <div
                onClick={() => {
                  if (location.pathname === '/') {
                    // On homepage, scroll to top
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth'
                    });
                  } else {
                    // On other pages, navigate to homepage and scroll to top
                    navigate('/');
                    setTimeout(() => {
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                      });
                    }, 100);
                  }
                }}
                className="flex items-center cursor-pointer"
              >
                <div className="flex flex-col">
                  <span className="font-bold text-2xl" style={{fontFamily: 'Monument Extended, sans-serif', color: '#ffffff'}}>BUSINESS CAR</span>
                  <span className="text-sm opacity-90" style={{fontFamily: 'Gilroy, sans-serif', color: '#ffffff'}}>Autopožičovňa</span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex items-center justify-center space-x-10">

              {/* Ponuka Link */}
              <button
                onClick={() => handleNavClick('#cars')}
                className="font-medium transition-colors duration-200 relative pb-1 uppercase"
                style={{
                  fontSize: '19px',
                  borderBottom: isActive('#cars') ? '2px solid #02cdff' : '2px solid transparent',
                  color: '#ffffff',
                  WebkitTextFillColor: '#ffffff',
                  textFillColor: '#ffffff'
                }}
              >
                Ponuka
              </button>

              {/* FAQ Link */}
              <button
                onClick={() => handleNavClick('/faq')}
                className="font-medium transition-colors duration-200 relative pb-1 uppercase"
                style={{
                  fontSize: '19px',
                  borderBottom: isActive('/faq') ? '2px solid #02cdff' : '2px solid transparent',
                  color: '#ffffff',
                  WebkitTextFillColor: '#ffffff',
                  textFillColor: '#ffffff'
                }}
              >
                FAQ
              </button>

              {/* O nás Link */}
              <button
                onClick={() => handleNavClick('/o-nas')}
                className="font-medium transition-colors duration-200 relative pb-1 uppercase"
                style={{
                  fontSize: '19px',
                  borderBottom: isActive('/o-nas') ? '2px solid #02cdff' : '2px solid transparent',
                  color: '#ffffff',
                  WebkitTextFillColor: '#ffffff',
                  textFillColor: '#ffffff'
                }}
              >
                O nás
              </button>

              {/* Kontakt Link */}
              <button
                onClick={() => handleNavClick('/kontakt')}
                className="font-medium transition-colors duration-200 relative pb-1 uppercase"
                style={{
                  fontSize: '19px',
                  borderBottom: isActive('/kontakt') ? '2px solid #02cdff' : '2px solid transparent',
                  color: '#ffffff',
                  WebkitTextFillColor: '#ffffff',
                  textFillColor: '#ffffff'
                }}
              >
                Kontakt
              </button>
            </div>

            {/* Right section - WhatsApp + Google Rating + Phone */}
            <div className="hidden lg:flex items-center justify-end space-x-4">
              {/* WhatsApp Icon */}
              <a
                href="https://wa.me/421905318164"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity duration-200"
                aria-label="WhatsApp"
              >
                <img
                  src="/whatsapp-icon.svg"
                  alt="WhatsApp"
                  className="w-7 h-7"
                />
              </a>

              {/* Google Rating */}
              <a
                href="https://share.google/WeCQwAZ1rSZcCmOvh"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-90 transition-opacity duration-200"
                aria-label="Google Reviews"
              >
                <div className="bg-white rounded-full px-3 py-1.5 flex items-center gap-2 shadow-md">
                  {/* Google G Logo */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  {/* Rating number */}
                  <span className="text-gray-900 text-sm font-semibold">4.5</span>
                  {/* Stars */}
                  <div className="flex items-center">
                    {[...Array(4)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-sm">★</span>
                    ))}
                    <span className="text-yellow-400 text-sm">★</span>
                  </div>
                </div>
              </a>

              {/* Phone Button */}
              <a
                href="tel:+421905318164"
                className="hover:opacity-90 px-5 py-3 text-base transition-colors duration-200 border border-gray-600 rounded-lg"
                style={{
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  fontWeight: 700
                }}
              >
                +421 905 318 164
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden max-[390px]:mr-0">
              <button
                type="button"
                className="text-white hover:text-gray-300 p-2"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-7 w-7" aria-hidden="true" />
              </button>
            </div>
          </div>

        </nav>
      </header>
      
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Header;