import Image3 from '../assets/3.jpg';

const TermsPage = () => {
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
            Podmienky
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
                📋 PODMIENKY PRENÁJMU
              </h1>
              <p className="text-lg text-gray-700">
                Vitajte v RIVAL Autopožičovni. Nižšie nájdete všetky dôležité informácie o prenájme našich vozidiel – od rezervácie, cez platby, až po poistenie a vrátenie auta.
              </p>
            </div>

            {/* Základné podmienky */}
            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                ✅ ZÁKLADNÉ PODMIENKY
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>• Minimálny vek vodiča: 21 rokov</li>
                <li>• Skúsenosti: vodičský preukaz skupiny B min. 1 rok</li>
                <li>• Potrebné doklady: občiansky preukaz alebo pas + vodičský preukaz</li>
                <li>• Denný prenájom: 24 hodín (napr. 8:00 – 8:00)</li>
                <li>• Platba: kartou alebo prevodom po online rezervácii na www.pozicauto.sk</li>
                <li>• Zábezpeka (depozit): od 100 € do 1 000 € podľa typu vozidla</li>
              </ul>
            </div>

            {/* Platba a zábezpeka */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                💳 PLATBA A ZÁBEZPEKA
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>• Platba prebieha po online rezervácii – kartou alebo prevodom</li>
                <li>• Depozit sa platí pri preberaní vozidla</li>
                <li>• Depozit sa vracia po bezchybnom vrátení vozidla</li>
              </ul>
            </div>

            {/* Denný limit kilometrov */}
            <div className="bg-red-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                📊 DENNÝ LIMIT KILOMETROV
              </h2>
              <p className="text-gray-700 mb-3">• 200 km/deň v cene nájmu</p>
              <p className="text-gray-700 font-semibold mb-2">Nadlimitné kilometre:</p>
              <ul className="space-y-1 text-gray-700 ml-4">
                <li>• Ekonomická trieda – 0,10 €/km</li>
                <li>• Stredná / Vyššia trieda, 8–9 miestne, úžitkové – 0,15 €/km</li>
              </ul>
            </div>

            {/* Poplatky */}
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                💰 POPLATKY
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>• Ďalší vodič – 15,00 €</li>
                <li>• Spracovanie priestupku – 20,00 €</li>
                <li>• Dotankovanie + palivo – 15,00 €</li>
                <li>• Nadmerné znečistenie vozidla – 80,00 €</li>
                <li>• Zákaz fajčenia (pokuta) – 120,00 €</li>
                <li>• Odovzdanie mimo otváracích hodín – od 20,00 €</li>
              </ul>
            </div>

            {/* Otváracie hodiny */}
            <div className="bg-purple-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                🕐 OTVÁRACIE HODINY
              </h2>
              <div className="text-gray-700">
                <p className="font-semibold">Pondelok – Piatok</p>
                <p className="text-xl font-bold">08:00 – 16:00</p>
                <p className="mt-2">Odovzdanie mimo týchto hodín je možné a môže byť spoplatnené.</p>
              </div>
            </div>

            {/* Storno podmienky */}
            <div className="bg-red-100 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                ❌ STORNO PODMIENKY
              </h2>
              <ul className="space-y-2 text-gray-700 mb-3">
                <li>1 – 7 dní pred odovzdaním: 100 % z ceny prenájmu</li>
                <li>8 – 14 dní pred odovzdaním: 50 % z ceny (min. 100 €)</li>
                <li>15+ dní pred odovzdaním: 10 % z ceny (min. 100 €)</li>
              </ul>
              <p className="text-gray-700 bg-orange-100 p-3 rounded flex items-start">
                💡 Storno poplatok si môžete uplatniť ako kredit na budúci prenájom (do 12 mesiacov).
              </p>
            </div>

            {/* Stav vozidla */}
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                🚗 STAV VOZIDLA
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>• Vozidlo dostanete čisté s plnou nádržou</li>
                <li>• Vracia sa v rovnakom stave</li>
                <li>• Súčasťou je technický preukaz, doklad o poistení, kontakt</li>
              </ul>
            </div>

            {/* Poistenie */}
            <div className="bg-cyan-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                🛡️ POISTENIE
              </h2>
              <p className="text-gray-700 font-semibold mb-2">• V cene je zahrnuté:</p>
              <ul className="space-y-1 text-gray-700 ml-4">
                <li>– PZP (povinné zmluvné poistenie)</li>
                <li>– Havarijné poistenie pre EÚ</li>
              </ul>
              <p className="text-gray-700 mt-2">• Spoluúčasť závisí od kategórie auta</p>
            </div>

            {/* Cestovanie do zahraničia */}
            <div className="bg-teal-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                🌍 CESTOVANIE DO ZAHRANIČIA
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>• Povolené: krajiny EÚ</li>
                <li>• Zakázané: Bulharsko a Rumunsko</li>
                <li>• Nutné nahlásiť pri rezervácii</li>
              </ul>
            </div>

            {/* Rezervácia */}
            <div className="bg-pink-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                🗓️ REZERVÁCIA
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>• Rezervácia na webe je nezáväzná</li>
                <li>• Do 24 hodín vás kontaktujeme</li>
                <li>• Odporúčame rezervovať s predstihom</li>
                <li>• Urgent? Volajte +421 907 633 517</li>
              </ul>
            </div>

            {/* FAQ */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                📝 NAJČASTEJŠIE OTÁZKY (FAQ)
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-800 flex items-start">
                    ❓ Môžem vrátiť vozidlo večer alebo cez víkend?
                  </p>
                  <p className="text-gray-700 ml-6">Áno, po dohode (poplatok 15 – 30 €)</p>
                </div>
                
                <div>
                  <p className="font-semibold text-gray-800 flex items-start">
                    ❓ Kde si môžem vozidlo vyzdvihnúť?
                  </p>
                  <p className="text-gray-700 ml-6">Banská Bystrica, Zvolen, Lučenec, Brezno. Pristavenie možné (spoplatnené)</p>
                </div>
                
                <div>
                  <p className="font-semibold text-gray-800 flex items-start">
                    ❓ Je diaľničná známka v cene?
                  </p>
                  <p className="text-gray-700 ml-6">Áno – platí na území SR</p>
                </div>
                
                <div>
                  <p className="font-semibold text-gray-800 flex items-start">
                    ❓ Čo robiť pri nehode alebo poruche?
                  </p>
                  <p className="text-gray-700 ml-6">Volajte +421 907 633 517 a políciu SR</p>
                </div>
                
                <div>
                  <p className="font-semibold text-gray-800 flex items-start">
                    ❓ Ako predĺžim prenájom?
                  </p>
                  <p className="text-gray-700 ml-6">Kontaktujte nás aspoň 24 hodín vopred</p>
                </div>
                
                <div>
                  <p className="font-semibold text-gray-800 flex items-start">
                    ❓ Sú všetky vozidlá z webu voľné?
                  </p>
                  <p className="text-gray-700 ml-6">Nie vždy – dostupnosť si overte telefonicky alebo e-mailom</p>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage; 