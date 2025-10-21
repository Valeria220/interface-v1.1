import React, { useState, useEffect } from 'react';

/**
 * Компонент карточки товара для отображения в списке результатов
 * Показывает основную информацию о товаре и поддерживает клик для просмотра деталей
 * 
 * @param {Object} props - Свойства компонента
 * @param {Object} props.product - Объект товара с информацией для отображения
 * @param {string} props.product.id - Уникальный идентификатор товара
 * @param {string} props.product.name - Название товара
 * @param {string} props.product.image - URL изображения товара
 * @param {Array} props.product.cities - Массив ID городов, где доступен товар
 * @param {Array} props.product.delivery - Массив ID опций доставки
 * @param {Array} props.product.platforms - Массив платформ для покупки
 * @param {string} props.product.price - Цена товара
 * @param {number} props.product.rating - Рейтинг товара
 * @param {Function} props.onClick - Функция-обработчик клика по карточке
 */
export const ProductCard = ({ product, onClick }) => {
  const [filtersData, setFiltersData] = useState({
    cities: [],
    deliveryOptions: []
  });

  // Загрузка данных фильтров с сервера
  useEffect(() => {
    const fetchFiltersData = async () => {
      try {
        const response = await fetch('/api/filters');
        const data = await response.json();
        setFiltersData(data);
      } catch (error) {
        console.error('Ошибка загрузки данных фильтров:', error);
      }
    };

    fetchFiltersData();
  }, []);

  return (
    // Контейнер карточки товара с обработчиком клика
    <div className="product-card" onClick={onClick}>
      
      {/* Изображение товара */}
      <img 
        src={product.image} 
        alt={product.name} 
        className="product-image" 
      />
      
      {/* Контейнер с информацией о товаре */}
      <div className="product-info">
        
        {/* Название товара */}
        <h4 className="product-name">{product.name}</h4>
        
        {/* Секция с городами доставки */}
        <div className="product-cities">
          {product.cities.map(cityId => {
            // Поиск названия города по ID
            const city = filtersData.cities.find(c => c.id === cityId);
            return (
              <span key={cityId} className="city-tag">
                {city?.name} {/* Опциональная цепочка на случай отсутствия города */}
              </span>
            );
          })}
        </div>
        
        {/* Секция с опциями доставки */}
        <div className="product-delivery">
          {product.delivery.map(deliveryId => {
            // Поиск названия опции доставки по ID
            const delivery = filtersData.deliveryOptions.find(d => d.id === deliveryId);
            return (
              <span key={deliveryId} className="delivery-tag">
                {delivery?.name} {/* Опциональная цепочка на случай отсутствия опции */}
              </span>
            );
          })}
        </div>
        
        {/* Секция с платформами продажи */}
        <div className="product-platforms">
          {product.platforms.map(platform => (
            <span key={platform.name} className="platform-tag">
              {platform.name}
            </span>
          ))}
        </div>
        
        {/* Цена товара */}
        <div className="product-price">{product.price}</div>
        
        {/* Рейтинг товара со звездочкой */}
        <div className="product-rating">⭐ {product.rating}</div>
        
      </div>
    </div>
  );
};