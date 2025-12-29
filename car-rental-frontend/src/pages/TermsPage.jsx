import React from 'react';
import { motion } from 'framer-motion';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ height: '35vh', minHeight: '280px' }}>
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/hero3.jpeg)' }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center pt-20">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{fontFamily: 'Monument Extended, sans-serif', color: '#ffffff'}}>
                PODMIENKY PRENÁJMU
              </h1>
              <p className="text-lg max-w-3xl mx-auto" style={{fontFamily: 'Gilroy, sans-serif', color: '#ffffff'}}>
                Všetko, čo potrebujete vedieť pred prenájmom vozidla
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8">
            <div className="text-black space-y-8">
              <h2 className="text-3xl font-bold text-center mb-8" style={{fontFamily: 'Monument Extended, sans-serif'}}>
                Podmienky prenájmu vozidla
              </h2>

              <section>
                <h3 className="text-xl font-semibold mb-4" style={{fontFamily: 'Monument Extended, sans-serif'}}>
                  Doklady potrebné k uzatvoreniu zmluvy
                </h3>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3" style={{fontFamily: 'Gilroy, sans-serif'}}>Pre fyzickú osobu (FO):</h4>
                  <ul className="list-disc list-inside space-y-2 ml-4" style={{fontFamily: 'Gilroy, sans-serif'}}>
                    <li>Platný vodičský preukaz (min. 2 roky od vydania)</li>
                    <li>Občiansky preukaz alebo pas</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3" style={{fontFamily: 'Gilroy, sans-serif'}}>Pre právnickú osobu (PO):</h4>
                  <ul className="list-disc list-inside space-y-2 ml-4" style={{fontFamily: 'Gilroy, sans-serif'}}>
                    <li>Platný vodičský preukaz osoby, ktorá bude vodičom (min. 2 roky od vydania)</li>
                    <li>Občiansky preukaz alebo pas vodiča</li>
                    <li>Výpis z Obchodného registra alebo Živnostenského registra</li>
                    <li>Splnomocnenie na prevzatie vozidla (ak nepreberá štatutár)</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4" style={{fontFamily: 'Monument Extended, sans-serif'}}>
                  Platobné podmienky
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4" style={{fontFamily: 'Gilroy, sans-serif'}}>
                  <li>Platba vopred – prevodom na účet, v hotovosti alebo kartou (na požiadanie)</li>
                  <li>Depozit – vratná kaucia vo výške 300 – 500 € (podľa kategórie vozidla), platená v hotovosti alebo prevodom. Ak nedôjde k žiadnej škode alebo spoluúčasti, bude vrátená pri odovzdaní vozidla.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4" style={{fontFamily: 'Monument Extended, sans-serif'}}>
                  Odovzdanie vozidla
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4" style={{fontFamily: 'Gilroy, sans-serif'}}>
                  <li>Vozidlo odovzdávame čisté, s plnou nádržou a kompletnou výbavou</li>
                  <li>Pri prevzatí spíšeme protokol o stave vozidla (vrátane fotodokumentácie)</li>
                  <li>Klient je povinný vrátiť vozidlo v rovnakom stave (čisté, s plnou nádržou)</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4" style={{fontFamily: 'Monument Extended, sans-serif'}}>
                  Cesty do zahraničia
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4" style={{fontFamily: 'Gilroy, sans-serif'}}>
                  <li>Cesty v rámci EÚ sú povolené</li>
                  <li>Niektoré vozidlá majú obmedzenia na krajiny (napr. Balkán, Ukrajina)</li>
                  <li>Cestu do zahraničia je potrebné vopred nahlásiť</li>
                  <li>Pri dlhších cestách vystavíme splnomocnenie</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4" style={{fontFamily: 'Monument Extended, sans-serif'}}>
                  Storno podmienky
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4" style={{fontFamily: 'Gilroy, sans-serif'}}>
                  <li>Bezplatné storno: viac ako 48 hodín pred začiatkom prenájmu</li>
                  <li>Storno menej ako 48 hodín pred začiatkom: účtujeme 50 % z ceny</li>
                  <li>Storno v deň prenájmu alebo neodobratia vozidla: 100 % z ceny</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4" style={{fontFamily: 'Monument Extended, sans-serif'}}>
                  Firemné údaje
                </h3>

                <div className="mb-6 p-4 bg-gray-50 rounded-lg" style={{fontFamily: 'Gilroy, sans-serif'}}>
                  <h4 className="text-lg font-semibold mb-3">LIKEBOOKS.EU s.r.o.</h4>
                  <p>Plynárenská 1, 821 09 Bratislava – mestská časť Ružinov, Slovenská republika</p>
                  <p>IČO: 53 326 458</p>
                  <p>DIČ: 2121349067</p>
                  <p>IČ DPH: SK2121349067</p>
                  <p>Registrácia: Obchodný register Mestského súdu Bratislava III., oddiel: Sro, vložka č. 147729/B</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg" style={{fontFamily: 'Gilroy, sans-serif'}}>
                  <h4 className="text-lg font-semibold mb-3">Business Car SK, s.r.o.</h4>
                  <p>Plynárenská 1, 821 09 Bratislava – mestská časť Ružinov, Slovenská republika</p>
                  <p>IČO: 56 073 038</p>
                  <p>DIČ: 2122157514</p>
                  <p>Registrácia: Obchodný register Mestského súdu Bratislava III., oddiel: Sro, vložka č. 175648/B</p>
                </div>
              </section>

              <section className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600" style={{fontFamily: 'Gilroy, sans-serif'}}>Naposledy aktualizované: 29.12.2024</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
