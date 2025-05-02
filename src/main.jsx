// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Add this to your public/index.html head section
// <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Quicksand:wght@400;500;600&display=swap" rel="stylesheet">

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);