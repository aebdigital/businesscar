import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import Image1 from '../assets/1.jpg';

const FAQPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "Aké doklady sú potrebné k uzatvoreniu zmluvy o prenájme?",
      answer: "Občiansky alebo cestovný pas + vodičský preukaz."
    },
    {
      question: "Aké doklady dostávam k vozidlu?",
      answer: "Zmluva o prenájme, technický preukaz, doklad o poistení, kontakt na podporu."
    },
    {
      question: "V akom stave je vozidlo pri prevzatí?",
      answer: "Čisté, s plnou nádržou. V rovnakom stave ho treba vrátiť."
    },
    {
      question: "Sú vozidlá na webe vždy voľné?",
      answer: "Zobrazené sú všetky vozidlá vo vozovom parku. Aktuálnu dostupnosť odporúčame overiť telefonicky alebo e-mailom."
    },
    {
      question: "Sú obmedzenia na typ ciest?",
      answer: "Áno. Vozidlá smú jazdiť len po oficiálnych cestných komunikáciách. Poľné a vedľajšie cesty sú zakázané."
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
      question: "Aké sú storno podmienky?",
      answer: "1–7 dní pred prenájmom: 100 % z ceny\n8–14 dní: 50 % (min. 100 €)\n15+ dní: 10 % (min. 100 €)\nStorno sa dá využiť ako kredit na ďalší prenájom (platnosť 12 mesiacov)."
    },
    {
      question: "V akom predstihu si mám vozidlo rezervovať?",
      answer: "Odporúčame čím skôr. Pri urgentných požiadavkách volajte pre dostupné modely."
    },
    {
      question: "Potrebujem predĺžiť prenájom – čo robiť?",
      answer: "Kontaktujte nás čo najskôr, ideálne minimálne 24 hodín pred plánovaným vrátením. Overíme, či je predĺženie možné."
    },
    {
      question: "Cena je za 1 deň?",
      answer: "Áno. 1 deň = 24 hodín od času prevzatia (napr. od 8:00 do 8:00 nasledujúceho dňa)."
    },
    {
      question: "Cena je vrátane DPH?",
      answer: "Ceny sú bez DPH. Pre fyzické osoby uvádzame konečné ceny. Pre platcov DPH sa pripočíta +23 % DPH."
    },
    {
      question: "Ako môžem zaplatiť?",
      answer: "V hotovosti, debetnou alebo kreditnou kartou."
    },
    {
      question: "Do ktorých krajín môžem vycestovať?",
      answer: "Do celej EÚ okrem Bulharska a Rumunska."
    },
    {
      question: "Dostávam diaľničnú známku?",
      answer: "Áno. Diaľničná známka pre SR je v cene prenájmu."
    },
    {
      question: "Kde si môžem prevziať vozidlo?",
      answer: "V mestách: Banská Bystrica, Zvolen, Brezno, Lučenec. Auto vieme pristaviť aj na adresu (za príplatok podľa vzdialenosti, termínu a vozidla)."
    },
    {
      question: "Môžem vozidlo vrátiť večer alebo cez víkend?",
      answer: "Áno. Túto službu však môže byť potrebné spoplatniť (15 – 30 €). Odporúčame dohodnúť vopred."
    },
    {
      question: "Aké poistenie je v cene?",
      answer: "Zákonné poistenie (PZP) + havarijné poistenie pre štáty EÚ. Spoluúčasť závisí od kategórie vozidla."
    },
    {
      question: "Čo robiť pri poistnej udalosti?",
      answer: "Ihneď volajte +421 907 633 517 a kontaktujte políciu SR."
    },
    {
      question: "Aký je minimálny vek vodiča?",
      answer: "Musíte mať vodičský preukaz minimálne 1 rok."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mini Hero Section */}
      <div 
        className="relative h-[20vh] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${Image1})`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-3xl font-bold text-white">
            Často kladené otázky
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium text-gray-900 pr-4">
                  {faq.question}
                </span>
                {openFAQ === index ? (
                  <ChevronUpIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Stále máte otázky?
          </h2>
          <p className="text-gray-600 mb-6">
            Náš tím zákazníckych služieb je tu pre vás 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary">
              Kontaktujte nás
            </a>
            <a href="tel:+421123456789" className="btn-accent">
              Zavolajte +421 123 456 789
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage; 