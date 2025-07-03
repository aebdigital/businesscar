import Image4 from '../assets/4.webp';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mini Hero Section */}
      <div 
        className="relative h-[20vh] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${Image4})`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-3xl font-bold text-white">
            Ochrana osobných údajov
          </h1>
        </div>
      </div>

      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
          
          <div className="prose prose-gray max-w-none space-y-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                🛡️ Ochrana osobných údajov (GDPR)
              </h1>
              <p className="text-lg text-gray-700">
                Vaše súkromie je pre nás dôležité. Preto spracúvame osobné údaje v súlade s platnou legislatívou vrátane Nariadenia GDPR (EU) 2016/679 a zákona č. 18/2018 Z.z. o ochrane osobných údajov.
              </p>
            </div>

            {/* Prevádzkovateľ údajov */}
            <div className="bg-red-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                📍 Prevádzkovateľ údajov
              </h2>
              <div className="text-gray-700 space-y-1">
                <p><strong>Rival Slovakia s.r.o.</strong></p>
                <p>Doležalova 15C, 821 04 Bratislava - Ružinov</p>
                <p>IČO: 54281067</p>
                <p>DIČ: 2121618972</p>
                <p>IČ DPH: SK2121618972</p>
                <p>Zastúpená: Peter Ridzon, konateľ</p>
                <p>✉️ info@pozicauto.sk</p>
                <p>📞 +421 907 633 517</p>
              </div>
            </div>

            {/* Aké údaje spracúvame */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                📋 Aké údaje spracúvame?
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>Meno a priezvisko</li>
                <li>Trvalá adresa</li>
                <li>Telefónne číslo</li>
                <li>Emailová adresa</li>
                <li>Číslo OP a vodičského preukazu</li>
                <li>Údaje o prenájme vozidla</li>
                <li>IP adresa a cookies</li>
              </ul>
            </div>

            {/* Účel spracovania údajov */}
            <div className="bg-red-100 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                🎯 Účel spracovania údajov
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>Uzatvorenie a plnenie zmluvy o prenájme vozidla</li>
                <li>Vedenie účtovníctva</li>
                <li>Komunikácia so zákazníkom</li>
                <li>Riešenie poistných udalostí a priestupkov</li>
                <li>Marketing (len s výslovným súhlasom)</li>
              </ul>
            </div>

            {/* Doba uchovávania údajov */}
            <div className="bg-purple-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                ⏰ Doba uchovávania údajov
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>Účtovné doklady: 10 rokov</li>
                <li>Zmluvné dokumenty: 2 roky po ukončení nájmu</li>
                <li>Marketingové údaje: do odvolania súhlasu</li>
              </ul>
            </div>

            {/* Vaše práva podľa GDPR */}
            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                👤 Vaše práva podľa GDPR
              </h2>
              <p className="text-gray-700 mb-3">Máte právo:</p>
              <ul className="space-y-2 text-gray-700">
                <li>Na prístup k svojim údajom</li>
                <li>Na opravu nepresných údajov</li>
                <li>Na vymazanie údajov (právo na zabudnutie)</li>
                <li>Na obmedzenie spracovania</li>
                <li>Namietať voči spracovaniu</li>
                <li>Na prenos údajov k inému prevádzkovateľovi</li>
              </ul>
              <div className="mt-4 bg-blue-100 p-3 rounded flex items-start">
                <span className="text-blue-600 mr-2">✉️</span>
                <p className="text-gray-700">
                  Svoje práva si môžete uplatniť na info@pozicauto.sk alebo písomne na adresu sídla.
                </p>
              </div>
            </div>

            {/* Ochrana vašich údajov */}
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                🔒 Ochrana vašich údajov
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>Prístup majú len poverené osoby</li>
                <li>Používame zabezpečený rezervačný systém</li>
                <li>Údaje neposkytujeme tretím stranám bez právneho dôvodu</li>
              </ul>
            </div>

            {/* Komu môžeme údaje sprístupniť */}
            <div className="bg-orange-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                👥 Komu môžeme údaje sprístupniť?
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>Účtovníkovi a daňovým poradcom</li>
                <li>Poisťovniam pri škodách</li>
                <li>Právnym zástupcom pri priestupkoch</li>
                <li>Orgánom verejnej správy podľa zákona</li>
              </ul>
            </div>

            {/* Cookies a sledovanie */}
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                🍪 Cookies a sledovanie
              </h2>
              <p className="text-gray-700 mb-3">Používame cookies pre:</p>
              <ul className="space-y-2 text-gray-700">
                <li>Funkčnosť webu a rezervačného systému</li>
                <li>Analýzu návštevnosti (napr. Google Analytics)</li>
                <li>Marketing len na základe súhlasu</li>
              </ul>
              <p className="text-gray-700 mt-3">
                Cookies si môžete spravovať vo svojom prehliadači.
              </p>
            </div>

            {/* Kontakt pre ochranu údajov */}
            <div className="bg-cyan-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                📧 Kontakt pre ochranu údajov
              </h2>
              <p className="text-gray-700 mb-3">V prípade otázok alebo požiadaviek nás kontaktujte:</p>
              <div className="text-gray-700 space-y-1">
                <p>✉️ info@pozicauto.sk</p>
                <p>📞 +421 907 633 517</p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage; 