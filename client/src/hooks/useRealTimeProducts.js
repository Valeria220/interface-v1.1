import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useRealTimeProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await api.getProducts(filters);
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();

    // WebSocket подключение для real-time обновлений
    // Временно отключим, пока не настроен на сервере
    /*
    const ws = new WebSocket('ws://localhost:3001');

    ws.onopen = () => {
      console.log('✅ WebSocket connected');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'DATA_UPDATED') {
        console.log('🔄 Received real-time update');
        fetchProducts();
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
    */
  }, [JSON.stringify(filters)]);

  return { 
    products, 
    loading, 
    error, 
    refetch: fetchProducts 
  };
};