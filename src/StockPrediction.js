import React, { useState } from 'react';
import axios from 'axios';

const StockPrediction = () => {
  const [stockSymbol, setStockSymbol] = useState('');
  const [amount, setAmount] = useState('');
  const [prediction, setPrediction] = useState('');
  const [graphUrl, setGraphUrl] = useState('');

  const stockOptions = [
    "TCS.NS", "INFY.NS", "RELIANCE.NS", "HDFCBANK.NS", "ICICIBANK.NS"
  ];

  const handleStockChange = (e) => {
    setStockSymbol(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async () => {
    // Call Streamlit backend here
    const response = await axios.post('http://localhost:8501', {
      stock: stockSymbol,
      amount: amount
    });

    // Update state with Streamlit response
    setPrediction(response.data.prediction);
    setGraphUrl(response.data.graphUrl);
  };

  return (
    <div>
      <h2>Stock Prediction</h2>
      <select onChange={handleStockChange}>
        {stockOptions.map(stock => (
          <option key={stock} value={stock}>{stock}</option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={handleAmountChange}
      />

      <button onClick={handleSubmit}>Get Prediction</button>

      {prediction && (
        <div>
          <h3>Prediction: {prediction}</h3>
          <img src={graphUrl} alt="Stock Price Graph" />
        </div>
      )}
    </div>
  );
};

export default StockPrediction;
