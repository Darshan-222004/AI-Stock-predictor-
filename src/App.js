import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import About from './About';
import Services from './Services';
import Contact from './Contact';
import Home from './Home';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <div className="navbar">
          <div className="logo">
            <img src="logo.png" alt="Logo" />
          </div>
          <ul>
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/about" className="nav-link">About</Link></li>
            <li><Link to="/services" className="nav-link">Services</Link></li>
            <li><Link to="/contact" className="nav-link">Contact</Link></li>
          </ul>
        </div>

      
       
          
         
         

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
