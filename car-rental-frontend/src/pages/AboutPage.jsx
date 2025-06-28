import { CheckIcon, ShieldCheckIcon, ClockIcon, StarIcon } from '@heroicons/react/24/outline';
import Image2 from '../assets/2.jpg';

const AboutPage = () => {
  const stats = [
    { label: 'Rokov skúseností', value: '15+' },
    { label: 'Spokojných zákazníkov', value: '10,000+' },
    { label: 'Vozidiel vo flotile', value: '200+' },
    { label: 'Obsluhovaných miest', value: '25+' },
  ];

  const values = [
    {
      icon: ShieldCheckIcon,
      title: 'Spoľahlivosť',
      description: 'Naše vozidlá udržujeme v najvyššom štandarde a poskytujeme 24/7 pomoc na ceste.'
    },
    {
      icon: StarIcon,
      title: 'Kvalitné služby',
      description: 'Náš tím sa venuje poskytovaniu výnimočných služieb zákazníkom a personalizovanej pozornosti.'
    },
    {
      icon: ClockIcon,
      title: 'Pohodlie',
      description: 'Jednoduché rezervácie, flexibilné miesta prevzatia a bezproblémový proces prenájmu.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Mini Hero Section */}
      <div 
        className="relative h-[20vh] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${Image2})`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-3xl font-bold text-white">
            O nás
          </h1>
        </div>
      </div>

      {/* Company Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Náš príbeh</h2>
              <p className="text-gray-600 mb-6">
                AutoPožičovňa bola založená v roku 2009 a vyrastla z malého miestneho podniku 
                na jednu z najdôveryhodnejších spoločností na prenájom vozidiel na Slovensku. 
                Naša cesta začala s jednoduchou misiou: poskytovať spoľahlivé, cenovo dostupné 
                a pohodlné dopravné riešenia pre miestnych obyvateľov aj návštevníkov.
              </p>
              <p className="text-gray-600 mb-6">
                Počas rokov sme rozšírili našu flotilu o širokú škálu vozidiel, 
                od ekonomických áut až po luxusné sedany a SUV. Využili sme aj technológie 
                na to, aby sme proces prenájmu urobili čo najjednoduchší, pričom sme si 
                zachovali osobný prístup, ktorý nás odlišuje.
              </p>
              <p className="text-gray-600">
                Dnes sme hrdí na to, že ročne obslúžime tisíce zákazníkov, pomáhame im 
                objavovať Slovensko a okolie s dôverou a pohodlím.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80"
                alt="Kancelária autopožičovne"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-black mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-gray-800">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Naša misia</h3>
              <p className="text-gray-600">
                Poskytovať výnimočné služby prenájmu vozidiel, ktoré predčia očakávania zákazníkov 
                pri dodržiavaní najvyšších štandardov bezpečnosti, spoľahlivosti a 
                environmentálnej zodpovednosti. Snažíme sa, aby každá cesta bola nezabudnuteľná 
                a bez stresu.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Naša vízia</h3>
              <p className="text-gray-600">
                Byť poprednou spoločnosťou na prenájom vozidiel v strednej Európe, uznávanou pre 
                naše inovatívne riešenia, udržateľné praktiky a neochvejný záväzok k spokojnosti 
                zákazníkov. Predstavujeme si budúcnosť, kde je mobilita dostupná, cenovo prijateľná 
                a environmentálne zodpovedná.
              </p>
            </div>
          </div>
        </div>
      </section>
  
    </div>
  );
};

export default AboutPage; 