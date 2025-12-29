import React from 'react';

const WorkingHomePage = () => {
  return (
    <div style={{backgroundColor: '#ffffff', minHeight: '100vh', padding: '20px'}}>
      {/* Hero Section */}
      <section style={{backgroundColor: '#000000', color: '#ffffff', padding: '100px 20px', textAlign: 'center', marginBottom: '20px'}}>
        <h1 style={{fontFamily: 'Monument Extended, sans-serif', fontSize: '3rem', marginBottom: '20px'}}>
          BUSINESS CAR
        </h1>
        <h2 style={{fontFamily: 'Monument Extended, sans-serif', fontSize: '2rem', marginBottom: '20px'}}>
          Autopožičovňa s individuálnym prístupom
        </h2>
        <p style={{fontFamily: 'Gilroy, sans-serif', fontSize: '1.2rem'}}>
          Rýchla rezervácia
        </p>
      </section>

      {/* Content Section */}
      <section style={{padding: '40px 20px', textAlign: 'center'}}>
        <h2 style={{fontFamily: 'Monument Extended, sans-serif', color: '#000000', fontSize: '2rem', marginBottom: '20px'}}>
          Ponuka vozidiel
        </h2>
        <p style={{fontFamily: 'Gilroy, sans-serif', color: '#000000', fontSize: '1.1rem', marginBottom: '40px'}}>
          Naše vozidlá sú pripravené pre vašu cestu
        </p>
        
        {/* Test Font Display */}
        <div style={{border: '2px solid #ccc', padding: '20px', margin: '20px 0'}}>
          <h3 style={{fontFamily: 'Monument Extended, sans-serif', color: '#000000'}}>
            Monument Extended Font Test
          </h3>
          <p style={{fontFamily: 'Gilroy, sans-serif', color: '#000000'}}>
            Gilroy Font Test - This should use the Gilroy font family
          </p>
        </div>
      </section>

      {/* About Section */}
      <section style={{backgroundColor: '#f5f5f5', padding: '40px 20px', textAlign: 'center'}}>
        <h2 style={{fontFamily: 'Monument Extended, sans-serif', color: '#000000', fontSize: '2rem', marginBottom: '20px'}}>
          O nás
        </h2>
        <p style={{fontFamily: 'Gilroy, sans-serif', color: '#000000', fontSize: '1.1rem'}}>
          Sme tu pre vás s kvalitnou službou požičovania vozidiel.
        </p>
      </section>
    </div>
  );
};

export default WorkingHomePage;