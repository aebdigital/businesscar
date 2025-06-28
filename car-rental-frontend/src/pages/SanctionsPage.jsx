import Image3 from '../assets/3.jpg';

const SanctionsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mini Hero Section */}
      <div 
        className="relative h-[20vh] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${Image3})`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-3xl font-bold text-white">
            Sankcie a pokuty
          </h1>
        </div>
      </div>

      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
          
          <div className="prose prose-gray max-w-none space-y-6">
            <div className="text-center space-y-4">
              
              <p className="text-lg text-gray-700">
                Často kladené otázky o poplatkoch a sankciách
              </p>
            </div>

            <div className="space-y-8 mt-8">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  1. Aký je denný limit kilometrov v cene prenájmu?
                </h3>
                <p className="text-gray-700">
                  V cene prenájmu je zahrnutých 200 km na každý deň prenájmu.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  2. Koľko zaplatím, ak prekročím denný limit kilometrov?
                </h3>
                <p className="text-gray-700 mb-3">
                  Poplatky za nadlimitné kilometre závisia od triedy vozidla:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Ekonomická trieda: 0,10 € / km</li>
                  <li>Stredná trieda: 0,15 € / km</li>
                  <li>Vyššia trieda, 8–9 miestne a úžitkové vozidlá: 0,15 € / km</li>
                </ul>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  3. Koľko stojí, ak chce vozidlo šoférovať aj ďalšia osoba?
                </h3>
                <p className="text-gray-700">
                  Poplatok za každého ďalšieho vodiča je 15,00 €.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  4. Čo ak dostanem pokutu počas prenájmu?
                </h3>
                <p className="text-gray-700">
                  Za administratívne spracovanie dopravného priestupku sa účtuje 20,00 €.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  5. Čo sa stane, ak vrátim auto s prázdnou nádržou?
                </h3>
                <p className="text-gray-700">
                  Poplatok za dotankovanie vozidla prenajímateľom je 15,00 € + cena paliva.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  6. Aký je poplatok za nadmerné znečistenie vozidla?
                </h3>
                <p className="text-gray-700">
                  V prípade neštandardne znečisteného interiéru sa účtuje 80,00 € za čistenie.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  7. Čo ak poruším zákaz fajčenia vo vozidle?
                </h3>
                <p className="text-gray-700">
                  Porušenie zákazu fajčenia je sankcionované sumou 120,00 €.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  8. Môžem si vozidlo vyzdvihnúť alebo vrátiť mimo otváracích hodín?
                </h3>
                <p className="text-gray-700">
                  Áno, ale táto služba je spoplatnená sumou 20,00 €.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  9. Aké sú vaše otváracie hodiny?
                </h3>
                <p className="text-gray-700">
                  Pondelok – Piatok: 08:00 – 17:00
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  10. Ako funguje zrušenie rezervácie a aké sú storno podmienky?
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>1 – 7 dní pred odovzdaním vozidla: storno poplatok 100 % z ceny prenájmu</li>
                  <li>8 – 14 dní pred odovzdaním vozidla: storno poplatok 50 % z ceny prenájmu, minimálne však 100 €</li>
                  <li>15 dní a viac pred odovzdaním vozidla: storno poplatok 10 % z ceny prenájmu, minimálne však 100 €</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  11. Môžem storno poplatok využiť na ďalší prenájom?
                </h3>
                <p className="text-gray-700">
                  Áno. Storno poplatok sa dá použiť ako kredit na budúci prenájom počas nasledujúcich 12 mesiacov. Počet dní a cena musia zodpovedať pôvodnej rezervácii.
                </p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SanctionsPage; 