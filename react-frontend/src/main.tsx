// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '../src/styles/primereact-theme.css'; // o el tema que quieras
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
