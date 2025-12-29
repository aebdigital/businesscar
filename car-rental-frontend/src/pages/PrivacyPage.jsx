import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPage = () => {
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
                OCHRANA OSOBNÝCH ÚDAJOV
              </h1>
              <p className="text-lg max-w-3xl mx-auto" style={{fontFamily: 'Gilroy, sans-serif', color: '#ffffff'}}>
                Vaše súkromie je pre nás prioritou
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
                Ochrana osobných údajov (GDPR)
              </h2>

              <section>
                <h3 className="text-xl font-semibold mb-4" style={{fontFamily: 'Monument Extended, sans-serif'}}>
                  1. Prevádzkovateľ
                </h3>
                <p className="mb-4" style={{fontFamily: 'Gilroy, sans-serif'}}>Prevádzkovateľom osobných údajov je:</p>

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

              <section>
                <h3 className="text-xl font-semibold mb-4" style={{fontFamily: 'Monument Extended, sans-serif'}}>
                  2. Rozsah spracovávaných údajov
                </h3>

                <h4 className="text-lg font-semibold mb-3" style={{fontFamily: 'Gilroy, sans-serif'}}>2.1 Údaje pri prenájme vozidla</h4>
                <div className="mb-4" style={{fontFamily: 'Gilroy, sans-serif'}}>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Meno a priezvisko</li>
                    <li>Adresa trvalého bydliska</li>
                    <li>Číslo občianskeho preukazu alebo pasu</li>
                    <li>Číslo vodičského preukazu</li>
                    <li>Telefónne číslo</li>
                    <li>E-mailová adresa</li>
                    <li>Pri právnických osobách: IČO, DIČ, sídlo spoločnosti</li>
                  </ul>
                  <p className="mt-2">Účel spracovania: uzatvorenie a plnenie zmluvy o prenájme vozidla</p>
                  <p>Doba uchovávania: 10 rokov od ukončenia zmluvy (zákonná povinnosť)</p>
                </div>

                <h4 className="text-lg font-semibold mb-3" style={{fontFamily: 'Gilroy, sans-serif'}}>2.2 Kontaktný formulár</h4>
                <div className="mb-4" style={{fontFamily: 'Gilroy, sans-serif'}}>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Meno, e-mail, telefón, správa</li>
                  </ul>
                  <p className="mt-2">Účel spracovania: odpoveď na dopyt</p>
                  <p>Doba uchovávania: 24 mesiacov od poslednej komunikácie</p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4" style={{fontFamily: 'Monument Extended, sans-serif'}}>
                  3. Právny základ spracovania
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4" style={{fontFamily: 'Gilroy, sans-serif'}}>
                  <li><strong>Plnenie zmluvy</strong> – spracovanie údajov potrebných na prenájom vozidla (čl. 6 ods. 1 písm. b) GDPR)</li>
                  <li><strong>Zákonná povinnosť</strong> – uchovávanie účtovných dokladov (čl. 6 ods. 1 písm. c) GDPR)</li>
                  <li><strong>Oprávnený záujem</strong> – odpovede na dopyty, ochrana majetku (čl. 6 ods. 1 písm. f) GDPR)</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4" style={{fontFamily: 'Monument Extended, sans-serif'}}>
                  4. Poskytovanie údajov tretím stranám
                </h3>
                <p className="mb-2" style={{fontFamily: 'Gilroy, sans-serif'}}>Vaše údaje môžu byť poskytnuté:</p>
                <ul className="list-disc list-inside space-y-2 ml-4" style={{fontFamily: 'Gilroy, sans-serif'}}>
                  <li>Poisťovniam (v prípade poistnej udalosti)</li>
                  <li>Účtovnej spoločnosti (spracovanie účtovníctva)</li>
                  <li>Štátnym orgánom (na základe zákonnej povinnosti)</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4" style={{fontFamily: 'Monument Extended, sans-serif'}}>
                  5. Vaše práva
                </h3>
                <div className="space-y-3" style={{fontFamily: 'Gilroy, sans-serif'}}>
                  <p><strong>Právo na prístup</strong> – môžete žiadať kópiu svojich osobných údajov</p>
                  <p><strong>Právo na opravu</strong> – môžete žiadať opravu nesprávnych údajov</p>
                  <p><strong>Právo na vymazanie</strong> – môžete žiadať vymazanie údajov (pokiaľ tomu nebráni zákonná povinnosť)</p>
                  <p><strong>Právo na obmedzenie spracovania</strong> – môžete obmedziť spracovanie svojich údajov</p>
                  <p><strong>Právo na prenosnosť</strong> – môžete získať údaje v strojovo čitateľnom formáte</p>
                  <p><strong>Právo podať sťažnosť</strong> – na Úrad na ochranu osobných údajov SR</p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4" style={{fontFamily: 'Monument Extended, sans-serif'}}>
                  6. Zabezpečenie údajov
                </h3>
                <p className="mb-2" style={{fontFamily: 'Gilroy, sans-serif'}}>Implementovali sme technické a organizačné opatrenia na ochranu vašich údajov:</p>
                <ul className="list-disc list-inside space-y-2 ml-4" style={{fontFamily: 'Gilroy, sans-serif'}}>
                  <li>Šifrovanie komunikácie (SSL/TLS)</li>
                  <li>Obmedzený prístup k údajom</li>
                  <li>Pravidelné zálohovanie</li>
                  <li>Bezpečné uchovávanie fyzických dokumentov</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4" style={{fontFamily: 'Monument Extended, sans-serif'}}>
                  7. Kontakt
                </h3>
                <p className="mb-2" style={{fontFamily: 'Gilroy, sans-serif'}}>V prípade otázok ohľadom ochrany osobných údajov nás kontaktujte:</p>
                <div className="p-4 bg-gray-50 rounded-lg" style={{fontFamily: 'Gilroy, sans-serif'}}>
                  <p>E-mail: info@businesscar.sk</p>
                  <p>Telefón: +421 948 393 548</p>
                  <p>Adresa: Plynárenská 1, 821 09 Bratislava</p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4" style={{fontFamily: 'Monument Extended, sans-serif'}}>
                  8. Cookies
                </h3>
                <p className="mb-4" style={{fontFamily: 'Gilroy, sans-serif'}}>Táto webová stránka používa cookies na zabezpečenie základnej funkcionality a analýzu návštevnosti.</p>
                <ul className="list-disc list-inside space-y-2 ml-4" style={{fontFamily: 'Gilroy, sans-serif'}}>
                  <li><strong>Nevyhnutné cookies</strong> – potrebné pre fungovanie stránky</li>
                  <li><strong>Analytické cookies</strong> – pomáhajú nám pochopiť, ako používate stránku (Google Analytics)</li>
                </ul>
                <p className="mt-4" style={{fontFamily: 'Gilroy, sans-serif'}}>Nastavenia cookies môžete zmeniť vo svojom prehliadači.</p>
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

export default PrivacyPage;
