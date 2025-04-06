// This is the index.js file

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';  // Make sure this line is correct!
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />  {/* This uses the App component */}
  </React.StrictMode>,
  document.getElementById('root') // React will render it here
);

reportWebVitals();
