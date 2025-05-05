import { Routes, Route } from 'react-router-dom';
import { RecommendationsProvider } from './context/recommendations/RecommendationsContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import FormPage from './pages/FormPage';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CareerDashboard from './pages/CareerDashboard';
import TimelinePage from './pages/TimelinePage';
import ExplorePage from './pages/ExplorePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';

import "./assets/styles/common/_global.css";
import "./assets/styles/common/_utilities.css";
import "./assets/styles/common/_variables.css";
import "./assets/styles/components/hero.css";
import './assets/styles/components/forms.css';

/**
 * App component to define the main application structure and routing.
 *
 * @returns {React.ReactNode} The rendered app component.
 */
function App() {
  return (
    <RecommendationsProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/quiz" element={<FormPage />} />
          <Route path="/dashboard" element={<CareerDashboard />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
        <Footer />
      </div>
    </RecommendationsProvider>
  );
}

export default App;