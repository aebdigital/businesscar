import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="text-white py-12" style={{backgroundColor: '#000000'}}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content - Custom Grid: Logo wide, links narrow, Segway wide */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">

          {/* Column 1 - Logo and Contact (3 of 12 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-2xl font-bold mb-6" style={{fontFamily: 'Monument Extended, sans-serif'}}>
              BUSINESS CAR
            </h3>
            <div className="space-y-2 text-sm" style={{color: '#ffffff'}}>
              <p>+421 903 416 410</p>
              <p>info@businesscar.sk</p>
              <p>Františkánske námestie 8</p>
              <p>811 01 Bratislava</p>
              <p className="pt-2">Po - Pia: 8:00 - 17:00</p>
            </div>
          </div>

          {/* Column 2 - Navigation Links (2 of 12 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold mb-4 text-white">Navigácia</h4>
            <div className="space-y-2">
              <Link to="/" className="block hover:underline transition-all text-sm" style={{color: '#ffffff'}}>
                Domov
              </Link>
              <Link to="/o-nas" className="block hover:underline transition-all text-sm" style={{color: '#ffffff'}}>
                O nás
              </Link>
              <Link to="/kontakt" className="block hover:underline transition-all text-sm" style={{color: '#ffffff'}}>
                Kontakt
              </Link>
              <Link to="/faq" className="block hover:underline transition-all text-sm" style={{color: '#ffffff'}}>
                FAQ
              </Link>
            </div>
          </div>

          {/* Column 3 - Legal Links (3 of 12 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-lg font-semibold mb-4 text-white">Právne informácie</h4>
            <div className="space-y-2">
              <Link to="/terms" className="block hover:underline transition-all text-sm" style={{color: '#ffffff'}}>
                Podmienky prenájmu
              </Link>
              <Link to="/privacy" className="block hover:underline transition-all text-sm" style={{color: '#ffffff'}}>
                Ochrana osobných údajov
              </Link>
            </div>
          </div>

          {/* Column 4 - Segway Promo (4 of 12 cols = wider) */}
          <div className="lg:col-span-4">
            <a
              href="https://bratislavasegway.sk"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg p-5 group"
              style={{
                backgroundColor: '#dc2626',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
              }}
            >
              <img
                src="/segway-logo.png"
                alt="Segway"
                className="h-16 mb-4"
              />
              <p className="text-lg font-bold mb-2" style={{color: '#ffffff', lineHeight: 1}}>
                Vydajte sa po stopách viac ako 40 000 nadšených jazdcov!
              </p>
              <p className="text-base font-semibold mb-2" style={{color: '#ffffff'}}>
                Prehliadka Bratislavy v perfektnom tempe!
              </p>
              <p className="text-sm mb-3" style={{color: '#ffffff'}}>
                Spoznajte Bratislavu s miestnym sprievodcom. Váš Segway zvládne cestu, vy si užívate pamiatky.
              </p>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-yellow-400 text-lg">★★★★★</span>
                <span className="text-sm font-medium" style={{color: '#ffffff'}}>4.7/5 z 579 Hodnotení</span>
              </div>
              <p className="text-xs opacity-90" style={{color: '#ffffff'}}>
                #1 Travelers' Choice v Bratislave na Tripadvisore
              </p>
              <div className="mt-3 inline-flex items-center gap-2 bg-white text-red-600 font-bold py-2 px-4 rounded-lg text-sm hover:scale-105 transition-transform duration-300">
                Rezervovať <span className="inline-block hover:translate-x-1 transition-transform duration-300">→</span>
              </div>
            </a>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              © Business Car 2025. Všetky práva vyhradené.
            </p>
            <a
              href="https://aebdigital.sk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:underline text-sm text-center sm:text-right"
            >
              Tvorba stránky - AEB Digital
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
