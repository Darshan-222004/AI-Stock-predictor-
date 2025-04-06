import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <div className="video-background">
        <video autoPlay muted loop id="background-video">
          <source src="/stocks.mp4" type="video/mp4" />
          Your browser does not support the video tag.
          
        </video>
                
      </div>
      

      <div className="content">
      <h1>Welcome to stock predictor </h1>
      
      <Link to="http://localhost:8501/" className="check-prices-button">Check Prices</Link>

        
       
      </div>
    </div>
  );
}

export default Home;
