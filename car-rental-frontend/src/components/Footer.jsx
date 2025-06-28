import { Link } from 'react-router-dom';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  ClockIcon 
} from '@heroicons/react/24/outline';
import FacebookIcon from '../assets/facebook.png';
import InstagramIcon from '../assets/instagram.png';
import GoogleIcon from '../assets/icons8-google-48.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12" style={{ maxWidth: '90rem' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-green-500" />
                <span className="text-gray-300">+421 907 633 517</span>
              </li>
              <li className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPinIcon className="h-5 w-5 text-green-500 mt-1" />
                  <div className="text-gray-300">
                    <div>Zvolenská cesta 6465/8</div>
                    <div>974 05 Banská Bystrica</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPinIcon className="h-5 w-5 text-green-500 mt-1" />
                  <div className="text-gray-300">
                    <div>Obchodná 9520/4</div>
                    <div>960 01 Zvolen</div>
                  </div>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <ClockIcon className="h-5 w-5 text-green-500" />
                <span className="text-gray-300">Pon - Pia 08:00 - 16:00</span>
              </li>
            </ul>
            
            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              <a href="https://www.facebook.com/pozicauto" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <span className="sr-only">Facebook</span>
                <img src={FacebookIcon} alt="Facebook" className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/rival_autopozicovna/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <span className="sr-only">Instagram</span>
                <img src={InstagramIcon} alt="Instagram" className="h-6 w-6" />
              </a>
              <a
                href="https://maps.google.com/maps?cid=1405297772265219924"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-1 bg-white hover:bg-gray-50 rounded shadow-md text-xs font-medium text-gray-800 transition-colors duration-200 border border-gray-200"
              >
                <img src={GoogleIcon} alt="Google" className="h-4 w-4 mr-1" />
                Recenzie
              </a>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Právne</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-green-500 transition-colors">
                  Podmienky prenájmu automobilov
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-green-500 transition-colors">
                  Ochrana osobných údajov
                </Link>
              </li>
              <li>
                <Link to="/complaints" className="text-gray-300 hover:text-green-500 transition-colors">
                  Reklamačný poriadok
                </Link>
              </li>
              <li>
                <Link to="/sanctions" className="text-gray-300 hover:text-green-500 transition-colors">
                  Sankcie a pokuty
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

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Odoberajte newsletter</h3>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="email adresa"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full transition-colors duration-200"
                style={{ borderRadius: '50px' }}
              >
                Odoslať
              </button>
            </form>
          </div>
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