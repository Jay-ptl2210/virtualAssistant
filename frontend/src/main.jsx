import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import UserContext from './context/UserContext.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <UserContext>
        <App />
      </UserContext>
    </Router>
  </React.StrictMode>
);
