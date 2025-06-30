import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import ScrollToTop from './components/ScrollToTop';
import ApiStatus from './components/ApiStatus';
import HomePage from './pages/HomePage';
import FleetPage from './pages/FleetPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
import CarDetailsPage from './pages/CarDetailsPage';
import TermsPage from './pages/TermsPage';
import ServicesPage from './pages/ServicesPage';
import PricingPage from './pages/PricingPage';
import PrivacyPage from './pages/PrivacyPage';
import ComplaintsPage from './pages/ComplaintsPage';
import SanctionsPage from './pages/SanctionsPage';
import './index.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fleet" element={<FleetPage />} />
          <Route path="/car/:id" element={<CarDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/complaints" element={<ComplaintsPage />} />
          <Route path="/sanctions" element={<SanctionsPage />} />
        </Routes>
      </DefaultLayout>
      <ApiStatus />
    </Router>
  );
}

export default App;
