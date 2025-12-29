import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import DefaultLayout from './layouts/DefaultLayout';
import ScrollToTop from './components/ScrollToTop';
import PageTransition from './components/PageTransition';
import ApiStatus from './components/ApiStatus';
import SEOWrapper from './components/SEOWrapper';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import CarDetailsPage from './pages/CarDetailsPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import FAQPage from './pages/FAQPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancelled from './pages/PaymentCancelled';
import BankTransferInfoPage from './pages/BankTransferInfoPage';
import { initGSAPAnimations, initScrollAnimations } from './utils/gsapAnimations';
import './index.css';

function SimpleRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/o-nas" element={<AboutPage />} />
      <Route path="/kontakt" element={<ContactPage />} />
      <Route path="/car/:id" element={<CarDetailsPage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/payment-cancelled" element={<PaymentCancelled />} />
      <Route path="/bank-transfer-info" element={<BankTransferInfoPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
    </Routes>
  );
}

function App() {
  useEffect(() => {
    // Initialize GSAP and Lenis when component mounts
    try {
      const lenis = initGSAPAnimations();
      initScrollAnimations();

      // Cleanup function
      return () => {
        if (lenis && typeof lenis.destroy === 'function') {
          lenis.destroy();
        }
      };
    } catch (error) {
      console.warn('GSAP initialization failed:', error);
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <DefaultLayout>
        <SimpleRoutes />
      </DefaultLayout>
      <ApiStatus />
    </Router>
  );
}

export default App;
