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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center bg-gray-50 p-8 rounded-lg"
            >
              <PhoneIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-black mb-4" style={{fontFamily: 'Monument Extended, sans-serif'}}>
                Telefón
              </h3>
              <p className="text-gray-700" style={{fontFamily: 'Gilroy, sans-serif'}}>
                +421 903 416 410
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center bg-gray-50 p-8 rounded-lg"
            >
              <EnvelopeIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-black mb-4" style={{fontFamily: 'Monument Extended, sans-serif'}}>
                Email
              </h3>
              <p className="text-gray-700" style={{fontFamily: 'Gilroy, sans-serif'}}>
                info@businesscar.sk
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center bg-gray-50 p-8 rounded-lg"
            >
              <MapPinIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-black mb-4" style={{fontFamily: 'Monument Extended, sans-serif'}}>
                Adresa
              </h3>
              <p className="text-gray-700" style={{fontFamily: 'Gilroy, sans-serif'}}>
                Františkánske námestie 8<br />
                811 01 Bratislava, Slovakia
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center bg-gray-50 p-8 rounded-lg"
            >
              <ClockIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-black mb-4" style={{fontFamily: 'Monument Extended, sans-serif'}}>
                Otváracie hodiny
              </h3>
              <p className="text-gray-700" style={{fontFamily: 'Gilroy, sans-serif'}}>
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
              style={{ backgroundColor: '#2563eb' }}
            >
              <h2 className="text-3xl font-bold text-white mb-8 text-center" style={{fontFamily: 'Monument Extended, sans-serif'}}>
                Napíšte nám
              </h2>
              <form className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2" style={{fontFamily: 'Gilroy, sans-serif'}}>
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
                  <label className="block text-white font-semibold mb-2" style={{fontFamily: 'Gilroy, sans-serif'}}>
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
                  <label className="block text-white font-semibold mb-2" style={{fontFamily: 'Gilroy, sans-serif'}}>
                    Telefón
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-white focus:outline-none"
                    style={{ backgroundColor: '#ffffff', color: '#000000', border: 'none' }}
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2" style={{fontFamily: 'Gilroy, sans-serif'}}>
                    Predmet
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-white focus:outline-none"
                    style={{ backgroundColor: '#ffffff', color: '#000000', border: 'none' }}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-white font-semibold mb-2" style={{fontFamily: 'Gilroy, sans-serif'}}>
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