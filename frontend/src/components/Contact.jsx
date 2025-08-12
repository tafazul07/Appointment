import React from 'react';
import './cssforall.css';

const Contact = () => {
  return (
    <section id="contact" className="contact" role="region" aria-label="Contact us section">
      <div className="contact-content">
        <h2>Contact Us</h2>
        <form className="contact-form" aria-label="Contact form">
          <label htmlFor="name">Your Name</label>
          <input id="name" type="text" placeholder="Your Name" required aria-required="true" />
          <label htmlFor="email">Your Email</label>
          <input id="email" type="email" placeholder="Your Email" required aria-required="true" />
          <label htmlFor="message">Your Message</label>
          <textarea id="message" placeholder="Your Message" required aria-required="true"></textarea>
          <button type="submit" className="btn" aria-label="Send message">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
