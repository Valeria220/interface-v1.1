import React, { useState, useEffect } from 'react';
import './App.css';
import { StoreSearchUI } from './components/StoreSearchUI/index.js';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  // Проверка соединения с сервером
  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await fetch('/api/test-db');
        const data = await response.json();
        console.log('Сервер отвечает:', data);
        setIsConnected(true);
      } catch (error) {
        console.error('Ошибка соединения с сервером:', error);
        setIsConnected(false);
      } finally {
        setLoading(false);
      }
    };

    testConnection();
  }, []);

  if (loading) {
    return (
      <div className="App">
        <div className="loading">
          <p>Проверка соединения с сервером...</p>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="App">
        <div className="connection-error">
          <h1>Ошибка соединения</h1>
          <p>Не удалось подключиться к серверу. Проверьте:</p>
          <ul>
            <li>Запущен ли сервер на порту 3001</li>
            <li>Доступность endpoints API</li>
            <li>Консоль браузера для подробной информации</li>
          </ul>
          <button onClick={() => window.location.reload()}>Повторить</button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <StoreSearchUI />
    </div>
  );
}

export default App;