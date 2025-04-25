import React from 'react';
import ReactDOM from 'react-dom/client'; // новий синтаксис для React 18
import './index.css'; // Стилі для основного додатку
import App from './App'; // Головний компонент додатку

const root = ReactDOM.createRoot(document.getElementById('root')); // Створення кореня для рендерингу
root.render(
  <React.StrictMode>
    <App /> {/* Рендеринг компоненту App */}
  </React.StrictMode>
);
