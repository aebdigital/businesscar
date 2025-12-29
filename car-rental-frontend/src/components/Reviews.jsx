import React from 'react';

const Reviews = () => {
  const reviewsData = [
    {
      name: "Zuzana Valkovičová",
      rating: 5,
      time: "pred týždňom",
      text: "Bola som výnimočne spokojná. Profesionálny servis, rýchla komunikácia a jednanie. Určite v budúcnosti využijem znova."
    },
    {
      name: "Branislav Babinjec", 
      rating: 5,
      time: "pred 6 mesiacmi",
      text: "Všetko bolo perfektné. Prístup profesionálny dohoda a komunikácia ľahká a rýchla. Jedine je trochu ťažšie trafiť sa na prvú, tak odporúčam nech len postavia nejaký výraznejší znak."
    },
    {
      name: "Jaroslav",
      rating: 5, 
      time: "pred 3 mesiacmi",
      text: "100% spokojnosť. Veľmi profesionálny a priateľsky prístup. Odporúčam každému kto si potrebuje požičať auto."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 text-left">Recenzie</h2>
          <div className="flex items-center justify-center mb-6">
            <div className="flex text-cyan-400 text-2xl mr-3">
              {'★'.repeat(5)}
            </div>
            <span className="text-2xl font-bold text-black">5.0</span>
            <span className="text-gray-600 ml-2 text-lg">(Google recenzie)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviewsData.map((review, index) => (
            <div key={index} className="rounded-2xl p-6 bg-gray-100 border border-gray-200" style={{
              boxShadow: 'inset 0 1px 2px #ffffff30, 0 1px 2px #00000030, 0 2px 4px #00000015'
            }}>
              <div className="flex justify-between items-start mb-4">
                <p className="font-semibold text-black text-lg">{review.name}</p>
                <div className="flex text-cyan-400 text-lg">
                  {'★'.repeat(review.rating)}
                </div>
              </div>
              <p className="text-gray-700 mb-3">
                "{review.text}"
              </p>
              <p className="text-xs text-gray-500">{review.time}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;