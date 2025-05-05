import { useContext, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';
import { useRecommendations } from '../../context/recommendations/RecommendationsContext';
import { fetchCareerRecs } from '../../api/supabaseApi';

/**
 * Navbar component to display the navigation bar with links and authentication controls.
 *
 * @returns {React.ReactNode} The rendered navbar component.
 */
function Navbar() {
  const { session, logout } = useContext(AuthContext);
  const { hasRecommendations, updateRecommendationsStatus } = useRecommendations();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll event to add/remove scrolled class
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Check for recommendations when session changes
  useEffect(() => {
    const checkRecommendations = async () => {
      try {
        const { recommendations, status } = await fetchCareerRecs();
        updateRecommendationsStatus(!(status === 404 || recommendations.length === 0));
      } catch (error) {
        console.error('Error fetching recommendations:', error.message);
        updateRecommendationsStatus(false);
      }
    };

    if (session) {
      checkRecommendations();
    }
  }, [session, updateRecommendationsStatus]);

  // Handle user logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setMobileMenuOpen(false);
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  // Check if the current route is active
  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/" className="navbar-brand">
            Pathweiz
          </Link>
        </div>

        {/* Navigation Menu */}
        <ul className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <li>
            <Link 
              to="/" 
              className={`navbar-item ${isActiveRoute('/') ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>

          {session ? (
            <>
              {hasRecommendations && (
                <>
                  <li>
                    <Link 
                      to="/dashboard" 
                      className={`navbar-item ${isActiveRoute('/dashboard') ? 'active' : ''}`}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/timeline" 
                      className={`navbar-item ${isActiveRoute('/timeline') ? 'active' : ''}`}
                    >
                      Timeline
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link 
                  to="/quiz" 
                  className={`navbar-item ${isActiveRoute('/quiz') ? 'active' : ''}`}
                >
                  Quiz
                </Link>
              </li>
              <li>
                <Link 
                  to="/explore" 
                  className={`navbar-item ${isActiveRoute('/explore') ? 'active' : ''}`}
                >
                  Explore
                </Link>
              </li>
              <li className="logout-container">
                <button onClick={handleLogout} className="logout-btn navbar-item">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link 
                  to="/login" 
                  className="navbar-item login-btn"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link 
                  to="/signup" 
                  className="navbar-item signup-btn"
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
