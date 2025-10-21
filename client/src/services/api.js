// D:\VS Code\interface v1.1\client\src\services\api.js

/**
 * Базовый сервис для работы с API
 */
class ApiService {
  constructor(baseURL = '') {
    this.baseURL = baseURL;
  }

  /**
   * Универсальный метод для HTTP запросов
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  /**
   * GET запрос
   */
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request(url);
  }

  /**
   * POST запрос
   */
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * PUT запрос
   */
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE запрос
   */
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }

  // ========== Специфичные методы для приложения ==========

  /**
   * Получить все продукты с возможностью фильтрации
   */
  async getProducts(filters = {}) {
    return this.get('/api/products', filters);
  }

  /**
   * Получить продукт по ID
   */
  async getProductById(id) {
    return this.get(`/api/products/${id}`);
  }

  /**
   * Получить все фильтры (города, типы продуктов, рейтинги, доставка)
   */
  async getFilters() {
    return this.get('/api/filters');
  }

  /**
   * Получить статистику
   */
  async getStats() {
    return this.get('/api/stats');
  }

  /**
   * Тест соединения с БД
   */
  async testConnection() {
    return this.get('/api/test-db');
  }

  /**
   * Поиск продуктов
   */
  async searchProducts(query, filters = {}) {
    return this.get('/api/products', { search: query, ...filters });
  }
}

// Создаем и экспортируем экземпляр API
export const api = new ApiService();

// Также экспортируем класс для возможного расширения
export default ApiService;