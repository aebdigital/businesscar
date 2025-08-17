import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import ScrollToTop from './components/ScrollToTop';
import ApiStatus from './components/ApiStatus';
import HomePage from './pages/HomePage';
import FleetPage from './pages/FleetPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
import CarDetailsPage from './pages/CarDetailsPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
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
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </DefaultLayout>
      <ApiStatus />
    </Router>
  );
}

export default App;
