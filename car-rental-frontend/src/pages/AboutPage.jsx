import React from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ height: '35vh', minHeight: '280px' }}>
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/hero2.jpg)' }}
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
                O NÁS
              </h1>
              <p className="text-lg max-w-3xl mx-auto" style={{fontFamily: 'Gilroy, sans-serif', color: '#ffffff'}}>
                Váš partner pre kvalitný prenájom vozidiel
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-black mb-8" style={{fontFamily: 'Monument Extended, sans-serif'}}>
                BUSINESS CAR
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8" style={{fontFamily: 'Gilroy, sans-serif'}}>
                Sme autopožičovňa zameraná na individuálne potreby klienta. K zákazníkom pristupujeme s cieľom vyhovieť každej ich požiadavke, aby bol zážitok z prenájmu výnimočný. Pre našich klientov zabezpečujeme profesionálne služby, či už ide o krátkodobý alebo dlhodobý prenájom automobilov, pristavenie vozidla na požadované miesto, preberanie a odovzdanie auta mimo otváracích hodín alebo doplnkové služby, ktoré si naši klienti vedia nastaviť podľa svojich požiadaviek.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-12" style={{fontFamily: 'Gilroy, sans-serif'}}>
                Kladieme dôraz na individualitu, pretože veríme, že naši klienti si zaslúžia len výnimočné služby šité na mieru.
              </p>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid md:grid-cols-2 gap-8 mb-16"
            >
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-bold text-black mb-4" style={{fontFamily: 'Monument Extended, sans-serif'}}>
                  Profesionálne služby
                </h3>
                <p className="text-gray-700" style={{fontFamily: 'Gilroy, sans-serif'}}>
                  Poskytujeme komplexné služby prenájmu vozidiel s individuálnym prístupom k každému klientovi.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-bold text-black mb-4" style={{fontFamily: 'Monument Extended, sans-serif'}}>
                  Flexibilita
                </h3>
                <p className="text-gray-700" style={{fontFamily: 'Gilroy, sans-serif'}}>
                  Pristavenie vozidla, preberanie mimo otváracích hodín a ďalšie doplnkové služby podľa vašich potrieb.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-bold text-black mb-4" style={{fontFamily: 'Monument Extended, sans-serif'}}>
                  Kvalitné vozidlá
                </h3>
                <p className="text-gray-700" style={{fontFamily: 'Gilroy, sans-serif'}}>
                  Ponúkame širokú škálu kvalitných vozidiel pre rôzne účely a potreby našich klientov.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-bold text-black mb-4" style={{fontFamily: 'Monument Extended, sans-serif'}}>
                  24/7 podpora
                </h3>
                <p className="text-gray-700" style={{fontFamily: 'Gilroy, sans-serif'}}>
                  Sme tu pre vás kedykoliek potrebujete pomoc alebo máte otázky týkajúce sa prenájmu.
                </p>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center bg-blue-600 text-white p-8 rounded-lg"
            >
              <h3 className="text-2xl font-bold mb-4" style={{fontFamily: 'Monument Extended, sans-serif'}}>
                Pripravení na cestu?
              </h3>
              <p className="text-lg mb-6" style={{fontFamily: 'Gilroy, sans-serif'}}>
                Kontaktujte nás a nájdeme pre vás ideálne vozidlo
              </p>
              <a
                href="/kontakt"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                style={{fontFamily: 'Gilroy, sans-serif'}}
              >
                Kontaktovať nás
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;