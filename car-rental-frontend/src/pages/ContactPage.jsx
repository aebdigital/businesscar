import { useState } from 'react';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import Button from '../components/Button';
import Image5 from '../assets/5.jpeg';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Ďakujeme za vašu správu! Čoskoro sa vám ozveme.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mini Hero Section */}
      <div 
        className="relative h-[20vh] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${Image5})`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-3xl font-bold text-white">
            Kontakt
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Spojte sa s nami</h2>
            <p className="text-gray-600 mb-8">
              Máte otázky k našim službám? Potrebujete pomoc s rezerváciou? 
              
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <PhoneIcon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Telefón</h3>
                  <p className="text-gray-600">+421 907 633 517</p>
                  
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <EnvelopeIcon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Email</h3>
                  <p className="text-gray-600">pozicauto@icloud.com</p>
               
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <MapPinIcon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Pobočky</h3>
                  <div className="text-gray-600 space-y-3">
                    <div>
                      <p className="font-medium">Banská Bystrica</p>
                      <p>Zvolenská cesta 6465/8</p>
                      <p>974 05 Banská Bystrica</p>
                    </div>
                    <div>
                      <p className="font-medium">Zvolen</p>
                      <p>Obchodná 9520/4</p>
                      <p>960 01 Zvolen</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <ClockIcon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Otváracie hodiny</h3>
                  <div className="text-gray-600">
                    <p>Po-Pia: 08:00 - 16:00</p>
                    
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Nájdite nás</h2>
              <div className="space-y-4">
                <div>
                  <h4 className="text-md font-medium text-gray-800 mb-2">Banská Bystrica</h4>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2637.8674489!2d19.144135616028!3d48.7362799796291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x474c0e58f0f5e7d5%3A0x1e1f2e3d4c5b6a78!2sZvolensk%C3%A1%20cesta%206465%2F8%2C%20974%2005%20Bansk%C3%A1%20Bystrica%2C%20Slovakia!5e0!3m2!1sen!2s!4v1647890123456"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-md"
                  ></iframe>
                </div>
                
                <div>
                  <h4 className="text-md font-medium text-gray-800 mb-2">Zvolen</h4>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2647.234567!2d18.613456789!3d48.567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x474c15a2b3c4d5e6%3A0x8765432109876543!2sObchodn%C3%A1%209520%2F4%2C%20960%2001%20Zvolen%2C%20Slovakia!5e0!3m2!1sen!2s!4v1647890123458"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-md"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pošlite nám správu</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vaše meno *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Ján Novák"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefónne číslo
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="+421 xxx xxx xxx"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emailová adresa *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="jan@priklad.sk"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Predmet
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Vyberte predmet</option>
                  <option value="booking">Otázka k rezervácii</option>
                  <option value="support">Zákaznícka podpora</option>
                  <option value="feedback">Spätná väzba</option>
                  <option value="other">Iné</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Správa *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="input-field resize-none"
                  placeholder="Napíšte nám, ako vám môžeme pomôcť..."
                ></textarea>
              </div>

              <Button type="submit" fullWidth>
                Odoslať správu
              </Button>
            </form>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default ContactPage; 