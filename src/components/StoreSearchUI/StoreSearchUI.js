import React, { useState } from 'react';
// Импорт UI компонентов
import { Button } from '../common/Button';
import { Input } from '../common/Input';
// Импорт компонентов функциональности
import { FiltersSidebar } from './FiltersSidebar';
import { ProductCard } from './ProductCard';
import { ProductDetail } from './ProductDetail';
// Импорт кастомного хука для фильтрации
import { useProductFilter } from '../../hooks/useProductFilter';
// Импорт данных
import { cities, productTypes, ratings, deliveryOptions } from '../../data';
import { products } from '../../data/products';

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

  // Использование кастомного хука для фильтрации товаров
  const { filteredProducts } = useProductFilter(products, filters, query);

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
            cities={cities}
            productTypes={productTypes}
            ratings={ratings}
            deliveryOptions={deliveryOptions}
          />

          {/* Область отображения результатов */}
          <div className="results-area">
            
            {/* Секция выбранных фильтров в виде тегов */}
            <div className="selected-filters">
              <h4>Выбранные фильтры:</h4>
              <div className="filters-tags">
                {/* Отображение выбранных городов */}
                {filters.cities.map(cityId => {
                  const city = cities.find(c => c.id === cityId);
                  return city && <span key={cityId} className="filter-tag">Город: {city.name}</span>;
                })}
                
                {/* Отображение выбранных типов продукции */}
                {filters.productTypes.map(typeId => {
                  const type = productTypes.find(t => t.id === typeId);
                  return type && <span key={typeId} className="filter-tag">Тип: {type.name}</span>;
                })}
                
                {/* Отображение выбранных рейтингов */}
                {filters.ratings.map(ratingId => {
                  const rating = ratings.find(r => r.id === ratingId);
                  return rating && <span key={ratingId} className="filter-tag">Рейтинг: {rating.name}</span>;
                })}
                
                {/* Отображение выбранных опций доставки */}
                {filters.delivery.map(deliveryId => {
                  const delivery = deliveryOptions.find(d => d.id === deliveryId);
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