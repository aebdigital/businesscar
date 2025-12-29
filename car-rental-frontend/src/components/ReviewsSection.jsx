import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// Fade In Up Animation Component
const FadeInUp = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
};

// Auto-scrolling slider component with truly infinite seamless loop
const AutoSlider = ({ reviews, direction = 'left', speed = 30 }) => {
  const [offset, setOffset] = useState(0);
  const containerRef = useRef(null);

  // Card width (320px) + gap (16px) = 336px per card
  const cardWidth = 336;
  const singleSetWidth = cardWidth * reviews.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => {
        if (direction === 'left') {
          const newOffset = prev - 1;
          // Reset seamlessly when we've scrolled one full set
          return newOffset <= -singleSetWidth ? 0 : newOffset;
        } else {
          const newOffset = prev + 1;
          return newOffset >= singleSetWidth ? 0 : newOffset;
        }
      });
    }, speed);

    return () => clearInterval(interval);
  }, [direction, speed, singleSetWidth]);

  // Create 3 copies for seamless infinite effect (before, current, after)
  const infiniteReviews = [...reviews, ...reviews, ...reviews];

  return (
    <div className="overflow-hidden" style={{width: '100vw', marginLeft: 'calc(-50vw + 50%)'}}>
      <motion.div
        ref={containerRef}
        className="flex gap-4"
        style={{
          transform: `translateX(${offset - singleSetWidth}px)`,
          width: 'max-content'
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      >
        {infiniteReviews.map((review, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-80 rounded-lg p-6 bg-gray-100 border border-gray-200"
            style={{
              boxShadow: 'inset 0 1px 2px #ffffff30, 0 1px 2px #00000030, 0 2px 4px #00000015'
            }}
          >
            {/* Header: Name on left, Stars on right */}
            <div className="flex items-center justify-between mb-4">
              <p className="font-bold text-sm" style={{color: '#000000'}}>{review.name}</p>
              <div className="flex space-x-0.5">
                {[...Array(review.rating)].map((_, i) => (
                  <span
                    key={i}
                    style={{
                      color: '#facc15',
                      fontSize: '16px',
                      textShadow: '0 0 8px rgba(250, 204, 21, 0.6), 0 0 16px rgba(250, 204, 21, 0.4)'
                    }}
                  >★</span>
                ))}
              </div>
            </div>
            {/* Review text below */}
            <p className="text-sm leading-relaxed font-semibold" style={{color: '#000000'}}>
              {review.text}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const ReviewsSection = () => {
  const testimonials = [
    {
      text: "Mal som skvelú skúsenosť s prenájmom auta! Proces bol hladký, personál bol priateľský a profesionálny. Všetko prebehlo bez problémov, od vyzdvihnutia až po odovzdanie. Vrelo odporúčame túto službu každému, kto hľadá spoľahlivý prenájom auta!",
      name: "Julia Fekiacova",
      rating: 5
    },
    {
      text: "We needed a car last minute and they were able to offer a car for a reasonable price at late night. Nice, responsive and honest people. Would recommend their rental service and definitely would rent again if I get back to Bratislava.",
      name: "Justina Sasnauskaitė",
      rating: 5
    },
    {
      text: "Excellent service and responsiveness! Martin was particularly cooperative and available at any time to address our queries. The car was delivered to us right at the hotel that we were staying in which was a great comfort! 100% recommended",
      name: "Assen Hinov",
      rating: 5
    },
    {
      text: "We rented a car for two days in Bratislava. From the moment we entered the office it was just perfect. The guy is patient and calm, welcoming. Even after we got the car when we needed help - we called and got a quick and courteous response. Excellent service!",
      name: "קובי מילנר",
      rating: 5
    },
    {
      text: "Business Car was suggested to me as a reliable and flexible car rental in Bratislava. Car was almost new and in a very good situation and I enjoyed driving to Austria and Germany. Return process was very easy with no hassles.",
      name: "Asghar M. FAZEL",
      rating: 5
    },
    {
      text: "Martin gives a great personal service. I was delighted with my car and will definitely be renting from him next time I am in Bratislava. A fantastic and superior alternative to the big car rental companies. Highly recommend!",
      name: "richie ot",
      rating: 5
    },
    {
      text: "I highly recommend this car rental to anyone who wants to rent a great car in a good price with excellent service. I was looking for a family car and Martin was more then happy to assist and provide the highest service.",
      name: "Lukasz Mystkowski",
      rating: 5
    },
    {
      text: "Rent a car was never as easy as in business car. Marek sent me a route for my little trip in Slovakia and was super helpful. Every people who work there are super kind, super professional and it was a pleasure to meet them.",
      name: "Valentin Vndrl",
      rating: 5
    },
    {
      text: "I rented a car during Christmas holidays so I could easily visit my family around Slovakia. They brought the car in front of my apartment, in perfect condition, clean, full tank, interior smelled good.",
      name: "Matej Dunik",
      rating: 5
    },
    {
      text: "With Business car since 2017! I know their perfect attitude to each client. Martin, I know that always can ask for my favourite CLA Mercedes, and I always with a pleasure come home to Bratislava.",
      name: "Helen Matsyuk",
      rating: 5
    },
    {
      text: "The only car rental in Bratislava where I managed to find a car for 'today' after making a call to literally every car rental in the city. I was suggested MB CLA or BMW 5. The communication was quick by phone/whatsapp. Highly recommend!",
      name: "Ruslan Malsagov",
      rating: 5
    },
    {
      text: "We unexpectedly required car for several days, so we contacted Business Car with short notice. The rental process was fast and convenient, contact person was flexible in time and meeting place. Car was clean.",
      name: "Pavel",
      rating: 5
    },
    {
      text: "I rented BMW520d xDrive for two days. Paperwork and car was ready within an hour after my initial phone call. Efficient and friendly service, car in perfect conditions. I will certainly use them again!",
      name: "Martina Himi",
      rating: 5
    },
    {
      text: "Tourist Information Centre recommended this firm. Polite, helpful and efficient. Delivered a near new Skoda to the hotel. They kindly collected from the hotel which helped us no end. Recommended.",
      name: "Lee Cookson",
      rating: 5
    },
    {
      text: "I would like to highly recommend the service of this company. They are rather small-ish family company which allows them to be very client focused. Variety of vehicles is great and Martin is super friendly!",
      name: "R P",
      rating: 5
    },
    {
      text: "Marek was helpful and car (Skoda fabia combi) good. Wanted a car that moment and sorted everything with Marek in 20min.",
      name: "Karlo Kraljić",
      rating: 5
    },
    {
      text: "Very friendly family-run business. Everything was included in the price so no confusion or headaches. SK and Austrian vignette, insurance for additional drivers etc, completely hassle free!",
      name: "M Rai",
      rating: 5
    },
    {
      text: "There was an issue with the car. Didn't have enough seats. However they were very accommodating and corrected the issue quickly with an upgrade.",
      name: "Ramal Cooray",
      rating: 5
    },
    {
      text: "It was a smooth and quick process. Martin was super easy to deal with. I would absolutely recommend this car service.",
      name: "Mohamad Faizul Abu Hanifa",
      rating: 5
    },
    {
      text: "Velmi spokojna, vsetko prebehlo ok, vsetko fungovalo. Dobra komunikacia, ludsky pristup, promptne jednanie. V pripade opatovnej potreby sa sem velmi rada vratim.",
      name: "Lucia Boledovicova",
      rating: 5
    },
    {
      text: "Very nice and positive person, good service, very good experience overall. We definitely use his services again if we can.",
      name: "אבינר עובדיה",
      rating: 5
    },
    {
      text: "Отличный сервис и хорошие цены. Удобно что страховой залог оставил наличными и забрал сразу же при возврате автомобиля.",
      name: "Andy V",
      rating: 5
    },
    {
      text: "Maximalna spokojnost! Su seriozni, ustretovi, ochotni, promtni! Auta su nam dodane nacas, ciste, natankovane. Spolupracujeme uz dlhsie, mozem len odporucit.",
      name: "Andrea Vlkova",
      rating: 5
    },
    {
      text: "Was excellent, good cars and excellent service, perfect!!!!",
      name: "Niv Gottfried",
      rating: 5
    }
  ];

  return (
    <section id="reviews" className="py-24 overflow-hidden" style={{backgroundColor: '#2563eb'}}>
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <FadeInUp>
          <h2 className="text-4xl md:text-5xl font-medium text-center" style={{fontFamily: 'Monument Extended, sans-serif', color: '#ffffff'}}>
            SKÚSENOSTI, KTORÉ HOVORIA ZA NÁS
          </h2>
          {/* Google Rating */}
          <div className="flex items-center justify-center mt-6">
            <div className="bg-white rounded-full px-5 py-2 flex items-center gap-3 shadow-lg">
              {/* Google G Logo */}
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {/* Rating number */}
              <span className="text-gray-900 text-lg font-semibold">4.5</span>
              {/* Stars */}
              <div className="flex items-center">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
                <span className="text-yellow-400 text-xl">★</span>
              </div>
              <span className="text-gray-700 text-lg font-semibold">90+ hodnotení</span>
            </div>
          </div>
        </FadeInUp>
      </div>

      {/* Two Auto-Scrolling Rows */}
      <div className="space-y-4">
        {/* First Row - Moving Left */}
        <FadeInUp delay={0.2}>
          <AutoSlider
            reviews={testimonials.slice(0, 12)}
            direction="left"
            speed={35}
          />
        </FadeInUp>

        {/* Second Row - Moving Right */}
        <FadeInUp delay={0.4}>
          <AutoSlider
            reviews={testimonials.slice(12, 24)}
            direction="right"
            speed={40}
          />
        </FadeInUp>
      </div>
    </section>
  );
};

export default ReviewsSection;