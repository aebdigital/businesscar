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
          
          <div className="prose prose-gray max-w-none space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ochrana osobných údajov v spoločnosti Rival Slovakia, s.r.o.
            </h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Informácie a poučenie o získavaní a spracúvaní osobných údajov
            </h3>
            
            <p className="text-gray-700 leading-relaxed">
              podľa Nariadenia Európskeho parlamentu a Rady (EÚ) 2016/679 z 27. apríla 2016 o ochrane fyzických osôb pri spracúvaní osobných údajov a o voľnom pohybe takýchto údajov, ktorým sa zrušuje smernica 95/46/ES (všeobecné nariadenie o ochrane údajov) (ďalej len „nariadenie") a podľa zákona č. 18/2018 Z.z. o ochrane osobných údajov a o zmene a doplnení niektorých zákonov (ďalej len „zákon"):
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              Prevádzkovateľ RIVAL AUTOPOŽIČOVŇA - Rival Slovakia s. r. o. so sídlom Doležalova 15C 821 04 Bratislava - mestská časť Ružinov, IČO: 54281067, zapísaná v OR OS Bratislava, oddiel: Sro., vložka č. 157285/B (ďalej len RIVAL autopožičovňa) týmto informuje dotknuté osoby o získavaní a spracúvaní ich osobných údajov.
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              Tieto informácie sú Vám určené ak ste naším zákazníkom, ale aj v prípade, ak ste zamestnancom nášho zákazníka alebo dodávateľa, ktorý je právnickou osobou alebo živnostníkom a Váš zamestnávateľ Vás určil ako svoju oprávnenú osobu pre jednotlivé oblasti komunikácie týkajúcej sa dodávky tovaru a služieb v rámci zmluvných vzťahov.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-8">
              Zásady ochrany osobných údajov
            </h3>
            
            <p className="text-gray-700 leading-relaxed">
              Vaše osobné údaje spracúvame len na základe zákonných podmienok, ktoré sú uvedené v nariadení alebo v zákone. Ako prevádzkovateľ zodpovedáme za ochranu Vašich osobných údajov, ktoré sme o Vás získali alebo získavame v súlade s nariadením a zákonom v rozsahu a spôsobom podľa tejto informácie. V prípade otázok týkajúcich sa spracúvania Vašich osobných údajov sa na nás môžete obrátiť osobne alebo poštou na adrese nášho sídla, telefonicky na tel. čísle +421 915 030 301 alebo e-mailom: rivalautopozicovna@gmail.com.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-8">
              Získavanie osobných údajov
            </h3>
            
            <p className="text-gray-700 leading-relaxed">
              Vaše osobné údaje získavame predovšetkým priamo od Vás, a to vtedy, keď nám ich dobrovoľne poskytujete v súvislosti s dopytom alebo žiadosťou o naše služby, ktoré nám adresujete osobne, telefonicky, písomne poštou alebo elektronicky, a to na základe Vašej žiadosti.
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              V prípade, ak ste zamestnancom nášho zákazníka alebo dodávateľa, ktorý je právnickou osobou, prípadne živnostníkom, ktorý si Vás určil ako svoju oprávnenú osobu pre jednotlivé oblasti komunikácie týkajúce sa dodávky tovaru a služieb v rámci zmluvných vzťahov, osobné údaje získavame od Vášho zamestnávateľa; poskytnutím údajov, ktoré sú obsahom tejto informácie nie je dotknutá informačná povinnosť Vášho zamestnávateľa v rozsahu podľa článku 13 nariadenia, resp. § 19 zákona pri získavaní a spracúvaní Vašich osobných údajov v súvislosti s pracovnoprávnym vzťahom zamestnanca a zamestnávateľa.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-8">
              Kategórie získavaných a spracúvaných osobných údajov
            </h3>
            
            <p className="text-gray-700 leading-relaxed">
              Budeme získavať a spracúvať iba Vaše bežné osobné údaje v rozsahu nevyhnutnom v rámci našich aktivít v súvislosti so zabezpečovaním našich služieb. Osobné údaje osobitnej kategórie, ktoré by odhaľovali Váš rasový alebo etnický pôvod, politické názory, politické alebo filozofické presvedčenie, členstvo v odborových organizáciách, genetické údaje, biometrické údaje, sexuálnu orientáciu a iné citlivé osobné údaje o Vás spracúvať nebudeme.
            </p>
            
            <p className="text-gray-700 leading-relaxed font-semibold">
              Spracúvame Vaše osobné údaje v nasledujúcom rozsahu:
            </p>
            
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                <strong>Identifikačné údaje:</strong> titul, meno, priezvisko, dátum narodenia, podpis, fotografia tváre a iné údaje uvedené v občianskom preukaze alebo cestovnom pase a vodičskom preukaze.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                <strong>Kontaktné údaje:</strong> adresa trvalého pobytu, prípadne adresa pre doručovanie, e-mailová adresa a telefónne číslo.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                <strong>Údaje o nákupoch a zľavách:</strong> zakúpený tovar alebo služba, cena zakúpeného tovaru alebo služby, miesto, dátum a čas nákupu, údaje o poskytnutých zľavách a benefitoch.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                <strong>Bankové, finančné a transakčné údaje:</strong> číslo kreditnej karty, údaje o bankovom účte, údaje o platbách.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                <strong>Údaje týkajúce sa leasingových zmlúv k vozidlám:</strong> identifikačné číslo klienta, číslo zmluvy, identifikačné číslo vozidla.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                <strong>Údaje týkajúce sa poistných udalostí:</strong> história poistných udalostí vrátane vyplatených plnení a odborných posudkov, informácie o obetiach.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                <strong>Údaje týkajúce sa polohy:</strong> monitorovanie polohy vybraných prenajímaných vozidiel prostredníctvom satelitného sledovania (GPS), ktoré umožňuje dohľadanie prenajatých vozidiel pri ich používaní alebo po ich krádeži.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-8">
              Nevyhnutnosť poskytnutia osobných údajov
            </h3>
            
            <p className="text-gray-700 leading-relaxed">
              Vaše osobné údaje od Vás nevyhnutne potrebujeme, pretože v prípade ich neposkytnutia nemôže dôjsť k vzniku zmluvného vzťahu medzi dodávateľom a zákazníkom, keďže v súlade so zákonom NR SR č. 513/1991 Zb. (Obchodný zákonník) v znení neskorších predpisov, je Vaša identifikácia ako zmluvnej strany (resp. ako osoby určenej Vaším zamestnávateľom na vybavovanie zmluvných záležitostí) jednou z podstatných náležitostí Zmluvy.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-8">
              Príjemcovia osobných údajov
            </h3>
            
            <p className="text-gray-700 leading-relaxed">
              Všetky Vaše osobné údaje budú spracúvané a uchovávané v našich interných systémoch a budú nami ďalej poskytované iným príjemcom len vtedy, ak je to nevyhnutné na dosiahnutie účelu spracúvania alebo na základe zákonnej povinnosti vyplývajúcej z osobitných právnych predpisov.
            </p>
            
            <p className="text-gray-700 leading-relaxed font-semibold">
              Príjemcami osobných údajov môžu byť:
            </p>
            
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>kontrolné, dozorné a iné štátne orgány v rámci výkonu ich činnosti v zmysle osobitného právneho predpisu</li>
              <li>súdy a orgány činné v trestnom konaní na základe ich vyžiadania</li>
              <li>poisťovne, s ktorými má prevádzkovateľ uzatvorenú poistnú zmluvu súvisiacu s prenajímaným vozidlom</li>
              <li>zmluvne poverení poskytovatelia služieb, ako napríklad poskytovatelia IT služieb, poštových a zasielateľských služieb</li>
              <li>ďalším príjemcom, ktorým je prevádzkovateľ povinný osobné údaje poskytnúť v zmysle osobitného zákona</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-8">
              Účel spracúvania osobných údajov
            </h3>
            
            <p className="text-gray-700 leading-relaxed font-semibold">
              Vaše osobné údaje budeme získavať a ďalej spracúvať na nasledujúce účely:
            </p>
            
            <div className="space-y-4">
              <div>
                <p className="text-gray-700 leading-relaxed font-semibold">uzavretie a plnenie zmluvy;</p>
                <p className="text-gray-700 leading-relaxed">
                  Na plnenie zmluvných povinností alebo vykonanie opatrení na Vašu žiadosť predtým, než s Vami uzatvoríme zmluvu, najmä na účely spracovania a zasielania cenových ponúk, rezervácií, prípravy a uzatvárania zmlúv.
                </p>
              </div>
              
              <div>
                <p className="text-gray-700 leading-relaxed font-semibold">marketing;</p>
                <p className="text-gray-700 leading-relaxed">
                  V prípade Vášho súhlasu Vám budeme zasielať obchodné informácie o produktoch a rôznych akciách poštou, e-mailom, SMS správou, prípadne inou formou.
                </p>
              </div>
              
              <div>
                <p className="text-gray-700 leading-relaxed font-semibold">identifikácia osôb;</p>
                <p className="text-gray-700 leading-relaxed">
                  V záujme jednoznačnej identifikácie a overenia totožnosti osôb - zákazníkov, resp. zákazníkom poverených osôb vyhotovujeme fotokópie úradných dokladov.
                </p>
              </div>
              
              <div>
                <p className="text-gray-700 leading-relaxed font-semibold">ochrana majetku a finančných záujmov prevádzkovateľa;</p>
                <p className="text-gray-700 leading-relaxed">
                  Na ochranu majetku a finančných záujmov prevádzkovateľa sú vybrané prenajímané vozidlá zabezpečené monitorovaním ich lokalizácie prostredníctvom satelitného sledovania (GPS).
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-8">
              Doba uchovávania osobných údajov
            </h3>
            
            <p className="text-gray-700 leading-relaxed">
              Vaše osobné údaje budeme spracúvať po dobu nevyhnutnú na dosiahnutie účelov ich spracúvania, najdlhšie však po dobu trvania zmluvného vzťahu. Po ukončení zmluvného vzťahu budú Vaše osobné údaje už iba uchovávané (archivované), a to po dobu 10 rokov od skončenia zmluvy.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-8">
              Práva dotknutej osoby v súvislosti s ochranou osobných údajov
            </h3>
            
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>právo na prístup k osobným údajom</li>
              <li>právo na opravu osobných údajov</li>
              <li>právo na vymazanie osobných údajov (právo „na zabudnutie")</li>
              <li>právo na obmedzenie spracúvania osobných údajov</li>
              <li>právo na prenosnosť osobných údajov</li>
              <li>právo namietať proti spracúvaniu osobných údajov</li>
              <li>právo podať sťažnosť dozornému orgánu</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-8">
              Kontaktné údaje prevádzkovateľa
            </h3>
            
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
                <strong>Rival Slovakia s. r. o.</strong><br/>
                Doležalova 15C, 821 04<br/>
                Bratislava - mestská časť Ružinov<br/>
                tel.: +421 915 030 301<br/>
                e-mail: rivalautopozicovna@gmail.com<br/>
                IČO: 54281067
              </p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage; 