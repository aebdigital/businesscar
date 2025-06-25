import { Link } from 'react-router-dom';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  ClockIcon 
} from '@heroicons/react/24/outline';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-green-500" />
                <span className="text-gray-300">TELEFÓNNE ČÍSLO</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPinIcon className="h-5 w-5 text-green-500 mt-1" />
                <div className="text-gray-300">
                  <div>ADRESA BB</div>
                  <div>ADRESA ZV</div>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <ClockIcon className="h-5 w-5 text-green-500" />
                <span className="text-gray-300">OTVÁRACIE HODINY</span>
              </li>
            </ul>
            
            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.328-1.297C4.243 14.814 3.5 13.455 3.5 11.987c0-1.467.743-2.827 1.621-3.704.88-.807 2.031-1.297 3.328-1.297 1.297 0 2.448.49 3.328 1.297.878.877 1.621 2.237 1.621 3.704 0 1.468-.743 2.827-1.621 3.704-.88.807-2.031 1.297-3.328 1.297z" clipRule="evenodd" />
                </svg>
              </a>
              <div className="bg-gray-700 px-2 py-1 rounded text-xs">
                GOOGLE RECENZIE
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Právne</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-green-500 transition-colors">
                  PODMIENKY PRENÁJMU AUTOMOBILOV
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-green-500 transition-colors">
                  OCHRANA OSOBNÝCH ÚDAJOV
                </Link>
              </li>
              <li>
                <Link to="/complaints" className="text-gray-300 hover:text-green-500 transition-colors">
                  REKLAMAČNÝ PORIADOK
                </Link>
              </li>
              <li>
                <Link to="/sanctions" className="text-gray-300 hover:text-green-500 transition-colors">
                  SANKCIE A POKUTY
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Služby</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/fleet" className="text-gray-300 hover:text-green-500 transition-colors">
                  Ponuka vozidiel
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-green-500 transition-colors">
                  Doplnkové služby
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-300 hover:text-green-500 transition-colors">
                  Cenník
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-green-500 transition-colors">
                  O nás
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-green-500 transition-colors">
                  Otázky a odpovede
                </Link>
              </li>
            </ul>
          </div>

          {/* Empty space for layout */}
          <div className="hidden lg:block"></div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-2">
              Rival Slovakia s.r.o. Doležalova 15C, 821 04 Bratislava - Ružinov IČO: 54281067 DIČ: 2121618972 IČ DPH: SK2121618972
            </p>
            <p className="text-gray-500 text-xs">
              © 2024 Rival Slovakia. Všetky práva vyhradené.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 