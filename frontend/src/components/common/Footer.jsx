import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/components/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo */}
        <div className="footer-logo">
          <Link to="/" className="footer-brand">
            Pathweiz
          </Link>
        </div>

        {/* Footer Links */}
        <ul className="footer-menu">
          <li>
            <Link to="/about" className="footer-item">About Us</Link>
          </li>
          <li>
            <Link to="/contact" className="footer-item">Contact</Link>
          </li>
          <li>
            <Link to="/privacy" className="footer-item">Privacy Policy</Link>
          </li>
        </ul>

        {/* Social Media Links */}
        <div className="footer-social">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;