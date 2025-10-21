import React, { useState, useEffect } from 'react';
// Импорт UI компонентов
import { Button } from '../common/Button';
import { Input } from '../common/Input';
// Импорт компонентов функциональности
import { FiltersSidebar } from './FiltersSidebar';
import { ProductCard } from './ProductCard';
import { ProductDetail } from './ProductDetail';
// Импорт кастомного хука для фильтрации
import { useProductFilter } from '../../hooks/useProductFilter';



/**
 * Основной компонент интерфейса поиска магазинов и товаров
 * Управляет состоянием поиска, фильтрами и отображением результатов
 * 
 * @component
 * @returns {JSX.Element} Интерфейс поиска магазинов
 */
export const StoreSearchUI = () => {
  // Состояние поискового запроса
  const [query, setQuery] = useState("");
  
  // Состояние фильтров с начальными пустыми значениями
  const [filters, setFilters] = useState({
    cities: [],           // Выбранные города
    productTypes: [],     // Выбранные типы продукции
    ratings: [],          // Выбранные рейтинги
    delivery: []          // Выбранные опции доставки
  });
  
  // Состояние выбранного товара для детального просмотра
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Состояния для данных с сервера
  const [products, setProducts] = useState([]);
  const [filtersData, setFiltersData] = useState({
    cities: [],
    productTypes: [],
    ratings: [],
    deliveryOptions: []
  });
  const [loading, setLoading] = useState(true);

  // Использование кастомного хука для фильтрации товаров
  const { filteredProducts } = useProductFilter(products, filters, query);

  // Загрузка данных с сервера
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Параллельная загрузка продуктов и фильтров
        const [productsResponse, filtersResponse] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/filters')
        ]);

        if (!productsResponse.ok || !filtersResponse.ok) {
          throw new Error('Ошибка загрузки данных');
        }

        const productsData = await productsResponse.json();
        const filtersData = await filtersResponse.json();

        setProducts(productsData);
        setFiltersData(filtersData);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        // Можно добавить уведомление для пользователя
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /**
   * Обработчик ручного поиска
   * Выводит в консоль текущие параметры поиска
   */
  const handleSearch = () => {
    console.log("Ручной поиск:", query, filters);
  };

  /**
   * Обработчик изменения поля ввода поиска
   * @param {Object} e - Событие изменения input
   */
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  /**
   * Функция переключения состояния фильтра
   * Добавляет или удаляет значение из соответствующего массива фильтров
   * 
   * @param {string} filterType - Тип фильтра ('cities', 'productTypes', etc.)
   * @param {string} value - Значение для переключения
   */
  const toggleFilter = (filterType, value) => {
    setFilters(prev => ({
      ...prev,  // Сохранение предыдущего состояния
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)  // Удаление значения
        : [...prev[filterType], value]  // Добавление значения
    }));
  };

  // Показываем загрузку пока данные не получены
  if (loading) {
    return (
      <div className="store-search-container">
        <div className="loading">
          <p>Загрузка данных...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="store-search-container">
      {/* Заголовок страницы */}
      <div className="header">
        <h1>Поиск магазинов</h1>
        <p>Найдите лучшие магазины в вашем городе</p>
      </div>

      {/* Секция поиска */}
      <div className="search-section">
        <div className="search-input-container">
          <Input
            placeholder="Введите название магазина, платформы или товара..."
            value={query}
            onChange={handleInputChange}
            className="search-input"
          />
          <Button onClick={handleSearch} className="search-button">
            Найти
          </Button>
        </div>
      </div>

      {/* Условный рендеринг: детали товара или список результатов */}
      {selectedProduct ? (
        // Отображение детальной информации о выбранном товаре
        <ProductDetail 
          product={selectedProduct} 
          onBack={() => setSelectedProduct(null)}  // Обработчик возврата
        />
      ) : (
        // Основной контент: фильтры и результаты поиска
        <div className="main-content">
          
          {/* Боковая панель фильтров */}
          <FiltersSidebar
            filters={filters}
            toggleFilter={toggleFilter}
            cities={filtersData.cities}
            productTypes={filtersData.productTypes}
            ratings={filtersData.ratings}
            deliveryOptions={filtersData.deliveryOptions}
          />

          {/* Область отображения результатов */}
          <div className="results-area">
            
            {/* Секция выбранных фильтров в виде тегов */}
            <div className="selected-filters">
              <h4>Выбранные фильтры:</h4>
              <div className="filters-tags">
                {/* Отображение выбранных городов */}
                {filters.cities.map(cityId => {
                  const city = filtersData.cities.find(c => c.id === cityId);
                  return city && <span key={cityId} className="filter-tag">Город: {city.name}</span>;
                })}
                
                {/* Отображение выбранных типов продукции */}
                {filters.productTypes.map(typeId => {
                  const type = filtersData.productTypes.find(t => t.id === typeId);
                  return type && <span key={typeId} className="filter-tag">Тип: {type.name}</span>;
                })}
                
                {/* Отображение выбранных рейтингов */}
                {filters.ratings.map(ratingId => {
                  const rating = filtersData.ratings.find(r => r.id === ratingId);
                  return rating && <span key={ratingId} className="filter-tag">Рейтинг: {rating.name}</span>;
                })}
                
                {/* Отображение выбранных опций доставки */}
                {filters.delivery.map(deliveryId => {
                  const delivery = filtersData.deliveryOptions.find(d => d.id === deliveryId);
                  return delivery && <span key={deliveryId} className="filter-tag">{delivery.name}</span>;
                })}
                
                {/* Отображение поискового запроса, если он есть */}
                {query && <span key="query" className="filter-tag">Поиск: {query}</span>}
              </div>
            </div>

            {/* Информация о результатах поиска */}
            <div className="results-info">
              <p>Найдено товаров: {filteredProducts.length}</p>
              {query && (
                <p className="search-info">
                  Поиск по: "{query}" (товары, платформы, магазины)
                </p>
              )}
            </div>

            {/* Сетка товаров */}
            <div className="products-grid">
              {filteredProducts.length > 0 ? (
                // Отображение отфильтрованных товаров
                filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onClick={() => setSelectedProduct(product)}  // Обработчик выбора товара
                  />
                ))
              ) : (
                // Сообщение при отсутствии результатов
                <div className="no-results">
                  <p>Товары не найдены. Попробуйте изменить фильтры или поисковый запрос.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};