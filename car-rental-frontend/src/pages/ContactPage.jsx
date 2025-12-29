import React from 'react';
import { motion } from 'framer-motion';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import ContactMapSection from '../components/ContactMapSection';

const ContactPage = () => {
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
                KONTAKT
              </h1>
              <p className="text-lg max-w-3xl mx-auto" style={{fontFamily: 'Gilroy, sans-serif', color: '#ffffff'}}>
                Sme tu pre vás. Kontaktujte nás kedykoľvek.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center bg-gray-100 p-8 rounded-lg border border-gray-200"
              style={{boxShadow: 'inset 0 1px 2px #ffffff30, 0 1px 2px #00000030, 0 2px 4px #00000015'}}
            >
              <svg className="w-10 h-10 mx-auto mb-4" fill="#2563eb" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <h3 className="text-xl font-bold text-black mb-4" style={{fontFamily: 'Monument Extended, sans-serif'}}>
                Telefón
              </h3>
              <p className="text-gray-700 font-medium" style={{fontFamily: 'Gilroy, sans-serif'}}>
                +421 903 416 410
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center bg-gray-100 p-8 rounded-lg border border-gray-200"
              style={{boxShadow: 'inset 0 1px 2px #ffffff30, 0 1px 2px #00000030, 0 2px 4px #00000015'}}
            >
              <svg className="w-10 h-10 mx-auto mb-4" fill="#2563eb" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <h3 className="text-xl font-bold text-black mb-4" style={{fontFamily: 'Monument Extended, sans-serif'}}>
                Email
              </h3>
              <p className="text-gray-700 font-medium" style={{fontFamily: 'Gilroy, sans-serif'}}>
                info@businesscar.sk
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center bg-gray-100 p-8 rounded-lg border border-gray-200"
              style={{boxShadow: 'inset 0 1px 2px #ffffff30, 0 1px 2px #00000030, 0 2px 4px #00000015'}}
            >
              <svg className="w-10 h-10 mx-auto mb-4" fill="#2563eb" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <h3 className="text-xl font-bold text-black mb-4" style={{fontFamily: 'Monument Extended, sans-serif'}}>
                Adresa
              </h3>
              <p className="text-gray-700 font-medium" style={{fontFamily: 'Gilroy, sans-serif'}}>
                Františkánske námestie 8<br />
                811 01 Bratislava, Slovakia
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center bg-gray-100 p-8 rounded-lg border border-gray-200"
              style={{boxShadow: 'inset 0 1px 2px #ffffff30, 0 1px 2px #00000030, 0 2px 4px #00000015'}}
            >
              <svg className="w-10 h-10 mx-auto mb-4" fill="#2563eb" viewBox="0 0 24 24">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
              </svg>
              <h3 className="text-xl font-bold text-black mb-4" style={{fontFamily: 'Monument Extended, sans-serif'}}>
                Otváracie hodiny
              </h3>
              <p className="text-gray-700 font-medium" style={{fontFamily: 'Gilroy, sans-serif'}}>
                Denne 8:00 - 20:00
              </p>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="p-8 rounded-lg"
              style={{ backgroundColor: '#2563eb', boxShadow: 'inset 0 1px 2px #ffffff30, 0 1px 2px #00000030, 0 2px 4px #00000015' }}
            >
              <h2 className="text-3xl font-bold mb-8 text-center" style={{fontFamily: 'Monument Extended, sans-serif', color: '#ffffff'}}>
                Napíšte nám
              </h2>
              <form className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold mb-2" style={{fontFamily: 'Gilroy, sans-serif', color: '#ffffff'}}>
                    Meno *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-white focus:outline-none"
                    style={{ backgroundColor: '#ffffff', color: '#000000', border: 'none' }}
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2" style={{fontFamily: 'Gilroy, sans-serif', color: '#ffffff'}}>
                    Email *
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-white focus:outline-none"
                    style={{ backgroundColor: '#ffffff', color: '#000000', border: 'none' }}
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2" style={{fontFamily: 'Gilroy, sans-serif', color: '#ffffff'}}>
                    Telefón
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-white focus:outline-none"
                    style={{ backgroundColor: '#ffffff', color: '#000000', border: 'none' }}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2" style={{fontFamily: 'Gilroy, sans-serif', color: '#ffffff'}}>
                    Predmet
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-white focus:outline-none"
                    style={{ backgroundColor: '#ffffff', color: '#000000', border: 'none' }}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-semibold mb-2" style={{fontFamily: 'Gilroy, sans-serif', color: '#ffffff'}}>
                    Správa *
                  </label>
                  <textarea
                    rows="6"
                    className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-white focus:outline-none"
                    style={{ backgroundColor: '#ffffff', color: '#000000', border: 'none' }}
                    required
                  ></textarea>
                </div>
                <div className="md:col-span-2 text-center">
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
                    style={{fontFamily: 'Gilroy, sans-serif', backgroundColor: '#ffffff', color: '#2563eb'}}
                  >
                    Odoslať správu
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <ContactMapSection />
    </div>
  );
};

export default ContactPage;