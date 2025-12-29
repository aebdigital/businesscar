import Header from '../components/Header';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';

const DefaultLayout = ({ children, seoProps }) => {
  return (
    <div className="min-h-screen flex flex-col text-black" style={{backgroundColor: '#ffffff'}}>
      <SEOHead {...seoProps} />
      <Header />
      <main className="flex-grow relative">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout; 