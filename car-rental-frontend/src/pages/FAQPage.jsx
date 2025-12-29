import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const FAQPage = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqs = [
    {
      question: "Aké sú základné požiadavky na prenájom vozidla?",
      answer: "Pre prenájom vozidla potrebujete mať minimálne 21 rokov, platný vodičský preukaz (minimálne 1 rok), občiansky preukaz alebo pas. Pre vozidlá luxusnej kategórie môže byť požadovaný vyšší vek a dlhšia doba platnosti vodičského preukazu."
    },
    {
      question: "Aká je výška zábezpeky a kedy sa vráti?",
      answer: "Výška zábezpeky závisí od kategórie vozidla a je uvedená pri každom aute individuálne. Zábezpeka sa vráti okamžite po vrátení a skontrolovaní vozidla, najneskôr však do 7 pracovných dní od vrátenia vozidla."
    },
    {
      question: "Je možné predĺžiť prenájom počas trvania?",
      answer: "Áno, prenájom je možné predĺžiť, ale odporúčame kontaktovať nás aspoň 24 hodín vopred. Predĺženie závisí od dostupnosti vozidla a aktuálnych cien."
    },
    {
      question: "Čo je zahrnuté v cene prenájmu?",
      answer: "V cene prenájmu je zahrnuté poistenie zodpovednosti a havarijné poistenie, slovenská diaľničná známka, technická podpora 24/7 a základné vybavenie vozidla. Dodatočné služby ako napríklad poskytnutie autosedačky alebo poistenie sú spoplatnené podľa konkrétnej služby, ktorú si môžete vybrať pri rezervácii vozidla."
    },
    {
      question: "Môžem zrušiť rezerváciu a dostať späť platbu?",
      answer: "Rezervácie zrušené viac ako 24 hodín pred začiatkom prenájmu sú bezplatné. Pri zrušení rezervácie menej ako 24 hodín pred začiatkom prenájmu sa účtuje poplatok 25% z celkovej sumy prenájmu."
    },
    {
      question: "Aké sú podmienky vrátenia vozidla?",
      answer: "Vozidlo je potrebné vrátiť s plnou nádržou paliva, v čistom stave a bez poškodení (okrem poškodení, ktoré už boli na aute v čase prevzatia vozidla do nájmu). Vrátenie je možné v čase podľa našich otváracích hodín na dohodnutom mieste odovzdania alebo v čase mimo otváracích hodín podľa predošlej dohody."
    },
    {
      question: "Je možné prenajať si vozidlo pre niekoho iného?",
      answer: "Vozidlo môže riadiť len osoba, ktorá je uvedená v zmluve o prenájme. Dodatočných vodičov je možné pridať za poplatok podľa aktuálneho cenníka po predložení platných dokladov."
    },
    {
      question: "Čo sa stane v prípade nehody alebo poruchy?",
      answer: "V prípade nehody nás ihneď kontaktujte. Poskytujeme 24/7 asistenčnú službu, ktorá je zahrnutá v cene prenájmu. V prípade poruchy zabezpečíme náhradné vozidlo alebo opravu podľa situácie."
    },
    {
      question: "Môžem cestovať s prenajatým vozidlom do zahraničia?",
      answer: "Cestovanie do zahraničia je možné po predchádzajúcom súhlase a za dodatočný poplatok. Niektoré vozidlá majú obmedzenia na cestovanie do určitých krajín."
    },
    {
      question: "Aké formy platby prijímate?",
      answer: "Prijímame platby platobnými kartami, bankovým prevodom a v hotovosti."
    }
  ];

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

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
                ČASTO KLADENÉ OTÁZKY
              </h1>
              <p className="text-lg max-w-3xl mx-auto" style={{fontFamily: 'Gilroy, sans-serif', color: '#ffffff'}}>
                Odpovede na najčastejšie otázky o prenájme vozidiel
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8" style={{backgroundColor: '#ffffff'}}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border-2 border-gray-200 rounded-lg overflow-hidden bg-white"
                style={{boxShadow: 'inset 0 1px 2px #ffffff30, 0 1px 2px #00000030, 0 2px 4px #00000015'}}
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-lg font-bold text-black pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDownIcon 
                    className={`h-6 w-6 text-[rgb(37,99,235)] transition-transform duration-300 flex-shrink-0 ${
                      openQuestion === index ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </button>
                
                {openQuestion === index && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16" style={{backgroundColor: '#ffffff'}}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 font-goldman">
            NENAŠLI STE ODPOVEĎ?
          </h2>
          <p className="text-gray-700 text-lg mb-8">
            Kontaktujte nás a radi vám odpovieme na všetky vaše otázky
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
            <a
              href="mailto:info@lerent.sk"
              className="hover:opacity-90 px-5 py-3 text-base transition-colors duration-200 border-2 rounded-lg"
              style={{
                backgroundColor: '#ffffff',
                borderColor: '#2563eb',
                color: '#2563eb',
                fontWeight: 700
              }}
            >
              info@lerent.sk
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;