import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarIcon,
  ClockIcon,
  ShieldCheckIcon,
  MagnifyingGlassIcon,
  StarIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

const HomePage = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [carType, setCarType] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (carType) params.append('category', carType);
    window.location.href = `/fleet?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Banner Section */}
      <section className="relative bg-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Left Sidebar - Filter */}
            <div className="lg:col-span-1">
              <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-center">
                  VYHĽADÁVACÍ FILTER<br/>
                  DOSTUPNOSTI PODĽA<br/>
                  DÁTUMU A TRIEDY VOZIDLA
                </h3>
                <form onSubmit={handleSearchSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Od dátumu</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Do dátumu</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Trieda vozidla</label>
                    <select
                      value={carType}
                      onChange={(e) => setCarType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Všetky</option>
                      <option value="economy">Ekonomická</option>
                      <option value="utility">Úžitkové</option>
                      <option value="middle">Stredná</option>
                      <option value="premium">Vyššia</option>
                      <option value="van">Viacmiestne</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
                  >
                    <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                    Vyhľadať
                  </button>
                </form>
              </div>
            </div>

            {/* Main Banner Area */}
            <div className="lg:col-span-3">
              <div className="bg-gray-100 border-4 border-gray-300 rounded-lg h-80 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <h2 className="text-2xl font-bold mb-4">
                    HLAVNÝ VEĽKÝ V ADMINISTRÁCII<br/>
                    MENITEĽNÝ BANNER (CAROUSEL 1-5<br/>
                    OBRÁZOK)
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Categories */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              'EKONOMICKÁ TRIEDA',
              'ÚŽITKOVÉ',
              'STREDNÁ TRIEDA',
              'VYŠŠIA TRIEDA',
              'VIACMIESTNE'
            ].map((category, index) => (
              <div key={index} className="bg-gray-100 border-2 border-gray-300 p-6 rounded-lg text-center hover:bg-green-50 hover:border-green-300 transition-colors duration-200 cursor-pointer">
                <h3 className="text-sm font-bold text-gray-800">{category}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rotating Vehicle Offer */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              ROTUJÚCA PONUKA VOZIDIEL KTORÝCH USPORIADANIE<br/>
              VYBERIEMEV ADMINISTRÁCII (PRIORITOU)
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white border-2 border-gray-300 rounded-lg p-8 text-center">
                <h3 className="text-lg font-bold text-gray-800">
                  HLAVNÉ VÝHODY NAŠEJ<br/>
                  AUTOPOŽIČOVNE {item}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wide Banner 1 */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-100 border-4 border-gray-300 rounded-lg h-32 flex items-center justify-center">
            <h2 className="text-xl font-bold text-gray-600 text-center">
              ŠIROKÝ BANNER 1 NASTAVITEĽNÝ V ADMINISTRÁCII<br/>
              (CAROUSEL 1-5 OBRÁZOK)
            </h2>
          </div>
        </div>
      </section>

      {/* Vehicle Categories with Images */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              'EKONOMICKÉ',
              'STREDNÁ TRIEDA',
              'VYŠŠIA TRIEDA',
              'VIACMIESTNE'
            ].map((category, index) => (
              <div key={index} className="bg-white border-2 border-gray-300 rounded-lg p-6 text-center">
                <div className="h-24 bg-gray-100 rounded mb-4 flex items-center justify-center">
                  <span className="text-sm text-gray-600">Obrázok</span>
                </div>
                <h3 className="text-sm font-bold text-gray-800">{category}</h3>
                <p className="text-xs text-gray-600 mt-2">
                  KATEGÓRIE VOZIDIEL VŠETKY S NÁHĽADOVÝM VOZIDLOM
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              'ÚŽITKOVÉ',
              'MOTOCYKLE',
              'KARAVANY',
              'ŠPORTOVÉ'
            ].map((category, index) => (
              <div key={index} className="bg-white border-2 border-gray-300 rounded-lg p-6 text-center">
                <div className="h-24 bg-gray-100 rounded mb-4 flex items-center justify-center">
                  <span className="text-sm text-gray-600">Obrázok</span>
                </div>
                <h3 className="text-sm font-bold text-gray-800">{category}</h3>
                <p className="text-xs text-gray-600 mt-2">
                  KATEGÓRIE VOZIDIEL VŠETKY S NÁHĽADOVÝM VOZIDLOM
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wide Banner 2 */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-100 border-4 border-gray-300 rounded-lg h-32 flex items-center justify-center">
            <h2 className="text-xl font-bold text-gray-600 text-center">
              ŠIROKÝ BANNER 2 NASTAVITEĽNÝ V ADMINISTRÁCII<br/>
              (CAROUSEL 1-5 OBRÁZOK)
            </h2>
          </div>
        </div>
      </section>

      {/* Instagram Posts */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border-4 border-gray-300 rounded-lg h-48 flex items-center justify-center">
            <h2 className="text-2xl font-bold text-gray-600 text-center">
              ZOBRAZENIE PRÍSPEVKOV AUTOMATICKY Z INSTAGRAMU<br/>
              (AKO NA POZICAUTO.SK)
            </h2>
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-100 border-4 border-gray-300 rounded-lg h-32 flex items-center justify-center">
            <h2 className="text-xl font-bold text-gray-600 text-center">
              ZOBRAZENIE RECENZIÍ Z GOOGLE
            </h2>
          </div>
        </div>
      </section>

      {/* Leave Review Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white border-2 border-gray-300 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              ZANECHAJTE NÁM RECENZIU
            </h2>
          </div>

          <div className="bg-gray-800 text-white rounded-lg p-6 mb-8">
            <h3 className="text-lg font-bold mb-2">FACEBOOK PAGE NÁHĽAD</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-6 text-center">
              <PhoneIcon className="h-8 w-8 mx-auto mb-2 text-gray-600" />
              <h3 className="font-bold text-gray-800">TEL. ČÍSLO - ZAVOLAŤ</h3>
            </div>
            
            <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-6 text-center">
              <ClockIcon className="h-8 w-8 mx-auto mb-2 text-gray-600" />
              <h3 className="font-bold text-gray-800">OTVÁRACIE HODINY</h3>
            </div>
            
            <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-6 text-center">
              <EnvelopeIcon className="h-8 w-8 mx-auto mb-2 text-gray-600" />
              <h3 className="font-bold text-gray-800">NAPÍŠTE NÁM / FORMULÁR</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-8 text-center">
              <MapPinIcon className="h-12 w-12 mx-auto mb-4 text-gray-600" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">POBOČKA BB</h3>
              <p className="text-gray-600">MAPA + ADRESA</p>
            </div>
            
            <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-8 text-center">
              <MapPinIcon className="h-12 w-12 mx-auto mb-4 text-gray-600" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">POBOČKA ZV</h3>
              <p className="text-gray-600">MAPA + ADRESA</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              ODOBERAJTE NEWSLETTER
            </h2>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage; 