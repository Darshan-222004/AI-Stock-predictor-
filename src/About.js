import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1>About Us</h1>
      </header>
      
      <section className="about-content">
        <p>
          Welcome to <strong>StockPredictor</strong>, your trusted partner in making informed investment decisions. At StockPredictor, we leverage the power of Artificial Intelligence and machine learning to analyze stock trends and provide insightful recommendations. Whether you're an experienced investor or just starting, our platform is designed to help you make smarter choices with ease.
        </p>

        <h2>Our Vision</h2>
        <p>
          Our vision is to democratize stock market predictions, making advanced financial tools accessible to everyone. By combining cutting-edge technology with detailed data analysis, we aim to empower individuals with the knowledge they need to navigate the complexities of the stock market.
        </p>

        <h2>What We Do</h2>
        <ul>
          <li><strong>Stock Predictions:</strong> Using advanced AI algorithms, we predict whether a stock is likely to go up or crash, giving you a clear indication of where to invest.</li>
          <li><strong>Market Insights:</strong> In addition to predictions, our platform offers deep insights into stock trends, news, and other market factors that influence stock performance.</li>
          <li><strong>User-Friendly Interface:</strong> Our website is designed with simplicity in mind, ensuring that even first-time users can easily access and understand the stock data.</li>
        </ul>

        <h2>How It Works</h2>
        <p>
          Our AI model analyzes  data points, including  stock prices, trading volume, and external market factors, to predict future stock movements. Using this data, we offer personalized stock recommendations and strategies to guide your investment journey.
        </p>

        <h2>Why Choose Us?</h2>
        <ul>
          <li><strong>Accuracy:</strong> Our AI-driven algorithms are continuously updated to ensure that you receive the most accurate predictions.</li>
          <li><strong>Real-Time Updates:</strong> Get real-time insights and notifications, so you’re always ahead of the market.</li>
          <li><strong>Secure and Reliable:</strong> We prioritize your security and privacy, ensuring a safe and seamless user experience.</li>
        </ul>
      </section>

      <footer className="about-footer">
        <p>Join us at StockPredictor and start making smarter investment decisions today!</p>
      </footer>
    </div>
  );
};

export default About;
