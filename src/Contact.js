import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>
        Have questions or need assistance? Our team is here to help! Reach out to us via email at
        <a href="mailto:support@tradetracker.com"> support@tradetracker.com</a>, or give us a call at
        <b> 91+ 8073388324</b>.
      </p>
      <p>
        Stay connected with us through our social media channels for the latest updates, market trends,
        and expert insights. Let’s grow your investments together!
      </p>
      <a href="/" className="back-button">Back to Home</a>
    </div>
  );
}

export default Contact;
