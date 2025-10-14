import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Импортируем App, а не StoreSearchUI напрямую
import './index.css'; // Важно импортировать index.css
// создаем корневой элемент для рендера React-приложения
const root = ReactDOM.createRoot(document.getElementById('root'));
// рендерим основное приложение внутри StrictMode для выявления потенциальных проблем
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
