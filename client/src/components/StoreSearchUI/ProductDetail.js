import React, { useState, useEffect } from 'react';

/**
 * Компонент детального просмотра товара
 * Отображает полную информацию о товаре: изображение, цену, рейтинг, платформы, отзывы и города доставки
 * 
 * @param {Object} props - Свойства компонента
 * @param {Object} props.product - Объект товара с полной информацией
 * @param {string} props.product.id - Уникальный идентификатор товара
 * @param {string} props.product.name - Название товара
 * @param {string} props.product.image - URL изображения товара
 * @param {string} props.product.price - Форматированная цена товара
 * @param {number} props.product.rating - Рейтинг товара (0-5)
 * @param {Array} props.product.platforms - Массив платформ для покупки
 * @param {Array} props.product.reviews - Массив отзывов о товаре
 * @param {Array} props.product.cities - Массив ID городов доставки
 * @param {Function} props.onBack - Функция-обработчик возврата к списку товаров
 */
export const ProductDetail = ({ product, onBack }) => {
  const [cities, setCities] = useState([]);

  // Загрузка городов с сервера
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('/api/filters');
        const filtersData = await response.json();
        setCities(filtersData.cities || []);
      } catch (error) {
        console.error('Ошибка загрузки городов:', error);
      }
    };

    fetchCities();
  }, []);

  return (
    <div className="product-detail">
      {/* Кнопка возврата к списку товаров */}
      <button className="back-button" onClick={onBack}>← Назад к результатам</button>
      {/* Основной контент детальной страницы */}
      <div className="detail-content">
        <img src={product.image} alt={product.name} className="detail-image" />
        {/* Блок с информацией о товаре */}
        <div className="detail-info">
          {/* Заголовок с названием товара */}
          <h2>{product.name}</h2>
          {/* Цена товара */}
          <div className="detail-price">{product.price}</div>
          {/* Рейтинг товара с иконкой звезды */}
          <div className="detail-rating">⭐ {product.rating}/5</div>
          {/* Секция платформ и магазинов */}
          <div className="detail-section">
            <h3>Платформы и магазины</h3>
            {/* Список платформ с магазинами */}
            {product.platforms.map(platform => (
              <div key={platform.name} className="platform-detail">
                <strong>{platform.name}:</strong>
                <div className="stores-list">
                  {platform.stores.map(store => (
                    <span key={store} className="store-tag">{store}</span>
                  ))}
                </div>
                {/* Ссылка для перехода к товару на платформе */}
                <a href={platform.url} className="platform-link" target="_blank" rel="noopener noreferrer">
                  Перейти к товару
                </a>
              </div>
            ))}
          </div>
          {/* Секция отзывов о товаре */}
          <div className="detail-section">
            <h3>Последние отзывы</h3>
            {product.reviews.map((review, index) => (
              <div key={index} className="review">
                {/* Заголовок отзыва с информацией о пользователе и магазине */}
                <div className="review-header">
                  {/* Информация о пользователе */}
                  <div className="review-user-info">
                    <strong>{review.user}</strong>
                    <span className="review-date">{review.date}</span>
                  </div>
                  {/* Информация о магазине и рейтинге */}
                  <div className="review-store-info">
                    <div className="store-platform">
                      <span className="platform-name">{review.platform}</span>
                      <span className="store-separator">•</span>
                      {/* Ссылка на магазин */}
                      <a href={review.storeUrl} target="_blank" rel="noopener noreferrer" className="store-link">
                        {review.store}
                      </a>
                    </div>
                    {/* Рейтинг из отзыва */}
                    <span className="review-rating">⭐ {review.rating}/5</span>
                  </div>
                </div>
                <p className="review-text">{review.text}</p>
              </div>
            ))}
          </div>
          {/* Секция с городами доставки */}
          <div className="detail-section">
            <h3>Доступно в городах</h3>
            {/* Список городов с тегами */}
            <div className="cities-list">
              {product.cities.map(cityId => {
                const city = cities.find(c => c.id === cityId);
                {/* Опциональная цепочка на случай отсутствия города */}
                return <span key={cityId} className="city-tag-large">{city?.name}</span>;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};