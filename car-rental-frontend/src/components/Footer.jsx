import { Link } from 'react-router-dom';
import { useState } from 'react';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  ClockIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';
import FacebookIcon from '../assets/facebook.png';
import InstagramIcon from '../assets/instagram.png';
import GoogleIcon from '../assets/icons8-google-48.png';

const Footer = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "Aké doklady sú potrebné k uzatvoreniu zmluvy o prenájme?",
      answer: "Občiansky alebo cestovný pas + vodičský preukaz."
    },
    {
      question: "V akom stave je vozidlo pri prevzatí?",
      answer: "Čisté, s plnou nádržou. V rovnakom stave ho treba vrátiť."
    },
    {
      question: "Kedy je moja objednávka potvrdená?",
      answer: "Po vyplnení formulára vás do 24 hodín kontaktujeme s potvrdením."
    },
    {
      question: "Ako zruším rezerváciu?",
      answer: "Jednoducho telefonicky na čísle: +421 907 633 517"
    },
    {
      question: "Cena je za 1 deň?",
      answer: "Áno. 1 deň = 24 hodín od času prevzatia (napr. od 8:00 do 8:00 nasledujúceho dňa)."
    },
    {
      question: "Ako môžem zaplatiť?",
      answer: "V hotovosti, debetnou alebo kreditnou kartou."
    },
    {
      question: "Do ktorých krajín môžem vycestovať?",
      answer: "Do celej EÚ okrem Bulharska a Rumunska."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <>

      <footer className="bg-black text-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12" style={{ maxWidth: '90rem' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info with Logo */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-white rounded-lg p-2">
                <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold">Business Car</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Business Car je spoľahlivá autopožičovňa poskytujúca kvalitné služby prenájmu vozidiel 
              v Bratislave a okolí. Moderné vozidlá, profesionálny prístup a konkurencieschopné ceny.
            </p>
            <p className="text-gray-400 text-sm">
              Vaša spokojnosť je naša priorita. Kontaktujte nás pre rezerváciu 
              alebo akékoľvek otázky týkajúce sa našich služieb.
            </p>
          </div>

          {/* Služby Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-300">Služby</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/fleet" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Ponuka vozidiel
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Doplnkové služby
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                  O nás
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Otázky a odpovede
                </Link>
              </li>
            </ul>
          </div>

          {/* Právne Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-300">Právne</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Podmienky prenájmu
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Ochrana osobných údajov
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter a Kontakt */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-300">Sledujte nás</h3>
            <form className="space-y-3 mb-6">
              <input
                type="email"
                placeholder="Váš email"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200 text-sm"
              >
                Odoberať newsletter
              </button>
            </form>
            
            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2">
                <PhoneIcon className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400 text-sm">+421 903 416 410</span>
              </div>
              <div className="flex items-center space-x-2">
                <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400 text-sm">info@businesscar.sk</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPinIcon className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400 text-sm">Františkánske námestie 8, 811 01 Bratislava</span>
              </div>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/pozicauto" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/rival_autopozicovna/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.google.com/maps/place/BUSINESS+CAR/@48.1443434,17.1053102,781m/data=!3m2!1e3!4b1!4m6!3m5!1s0x476c89680bea6d1d:0xe79d8bc017c81251!8m2!3d48.1443398!4d17.1078851!16s%2Fg%2F1ptwb8cl3?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Google Reviews</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 Business Car. Všetky práva vyhradené.
            </p>
            <div>
              <a href="https://aebdigital.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm underline">
                Tvorba stránky - AEB Digital
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer; 