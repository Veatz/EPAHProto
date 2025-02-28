import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CBOContextProvider } from './context/CBOcontext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CBOContextProvider>
      <App />
    </CBOContextProvider>
  </React.StrictMode>
);

