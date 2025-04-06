import React from 'react';
import './Navbar.css'; // Assuming you have a separate CSS file for Navbar

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="/logo.png" alt="Trade Tracker Logo" />
      </div>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
      <input type="text" placeholder="Search stocks..." />
    </div>
  );
}

export default Navbar;
