import React from 'react';
import './cssforall.css';

// You might want to import icons from a library like react-icons
// For example:
// import { FaFacebookF, FaTwitter, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-section" role="contentinfo">
      <div className="footer-container">
        {/* Company Info / Brand */}
        <div className="footer-column brand-info">
          {/* Replace with your logo or brand name */}
          <a href="#home" className="footer-logo">
            Your Brand Logo
            {/* Or an image tag: <img src="/path/to/your/logo.png" alt="Your Brand Name" /> */}
          </a>
          <p className="brand-tagline">Where Beauty Meets Perfection.</p>
          <div className="social-icons" role="region" aria-label="Social media links">
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              {/* Replace with a react-icon or SVG */}
              {/* <FaFacebookF /> */} FB
            </a>
            <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              {/* <FaTwitter /> */} TW
            </a>
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              {/* <FaInstagram /> */} IG
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-column quick-links">
          <h3>Quick Links</h3>
          <nav aria-label="Footer navigation">
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#testimonials">Testimonials</a></li> {/* New link example */}
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </nav>
        </div>

        {/* Contact Info */}
        <div className="footer-column contact-info">
          <h3>Get in Touch</h3>
          <p>
            {/* <FaMapMarkerAlt /> */} 123 Beauty Blvd, Suite 101, City, State, ZIP
          </p>
          <p>
            {/* <FaPhoneAlt /> */} <a href="tel:+1234567890">+1 (234) 567-890</a>
          </p>
          <p>
            {/* <FaEnvelope /> */} <a href="mailto:info@yourwebsite.com">info@yourwebsite.com</a>
          </p>
          <p className="working-hours">Mon - Fri: 9:00 AM - 7:00 PM</p>
        </div>

        {/* Newsletter / Call to Action */}
        <div className="footer-column newsletter">
          <h3>Stay Connected</h3>
          <p>Subscribe to our newsletter for exclusive offers and updates!</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" aria-label="Enter your email for newsletter" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p className="copyright">&copy; {new Date().getFullYear()} Your Beauty Salon. All rights reserved.</p>
        <div className="legal-links">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;