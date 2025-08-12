import React, { useState, useEffect, useRef } from 'react'; 
import { gsap } from 'gsap'; 
import './cssforall.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  

  const headerRef = useRef(null); 
  const navigate = useNavigate(); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {

    let ctx = gsap.context(() => {
      const headerElements = headerRef.current;

     
      if (headerElements) {
        gsap.from(headerElements.querySelector(".header-logo"), { y: -50, opacity: 0, duration: 0.8, ease: "power3.out" });
        gsap.from(headerElements.querySelectorAll(".nav-list li"), { y: -20, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out", delay: 0.2 });
        gsap.from(headerElements.querySelector(".header-button"), { scale: 0.8, opacity: 0, duration: 0.5, ease: "back.out(1.7)", delay: 0.6 });
      }
    }, headerRef);

    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert(); 
    };
  }, [])

  
  useEffect(() => {
    const mobileNav = document.querySelector(".nav-list-mobile");
    if (mobileNav) {
      gsap.to(mobileNav, {
        x: isMenuOpen ? "0%" : "100%",
        opacity: isMenuOpen ? 1 : 0,
        visibility: isMenuOpen ? "visible" : "hidden",
        duration: 0.4,
        ease: "power3.inOut"
      });
    }
  }, [isMenuOpen]);

  
  const handleNavigate = () => {
    navigate('/Booking');
  };

  return (
    <header className={`header-main ${isSticky ? 'sticky' : ''}`} role="banner" ref={headerRef}>
      <div className="header-container">
        
        <a href="#home" className="header-logo" aria-label="Beauty Salon Home">
          Glamour facial
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <ul className="nav-list">
            <li><a href="#home" className="nav-link">Home</a></li>
            <li><a href="#services" className="nav-link">Services</a></li>
            <li><a href="#about" className="nav-link">About Us</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>
        </nav>
        <button
          className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className={`nav-list-mobile ${isMenuOpen ? 'open' : ''}`} aria-label="Mobile navigation">
          <ul>
            <li><a href="#home" className="nav-link-mobile" onClick={handleNavLinkClick}>Home</a></li>
            <li><a href="#services" className="nav-link-mobile" onClick={handleNavLinkClick}>Services</a></li>
            <li><a href="#about" className="nav-link-mobile" onClick={handleNavLinkClick}>About Us</a></li>
            <li><a href="#contact" className="nav-link-mobile" onClick={handleNavLinkClick}>Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;