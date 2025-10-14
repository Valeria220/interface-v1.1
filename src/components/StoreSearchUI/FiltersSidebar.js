import React from 'react';

/**
 * Компонент боковой панели фильтров для поиска товаров
 * Отображает фильтры по городам, типам продукции, рейтингам и опциям доставки
 * 
 * @param {Object} props - Свойства компонента
 * @param {Object} props.filters - Текущие выбранные фильтры
 * @param {Array} props.filters.cities - Выбранные города
 * @param {Array} props.filters.productTypes - Выбранные типы продукции
 * @param {Array} props.filters.ratings - Выбранные рейтинги
 * @param {Array} props.filters.delivery - Выбранные опции доставки
 * @param {Function} props.toggleFilter - Функция переключения фильтра
 * @param {Array} props.cities - Список всех доступных городов
 * @param {Array} props.productTypes - Список всех типов продукции
 * @param {Array} props.ratings - Список всех рейтингов
 * @param {Array} props.deliveryOptions - Список всех опций доставки
 */
export const FiltersSidebar = ({ 
  filters, 
  toggleFilter, 
  cities, 
  productTypes, 
  ratings, 
  deliveryOptions 
}) => (
  <div className="filters-sidebar">
    
    {/* Секция фильтра по городам */}
    <div className="filter-section">
      <h3>Города</h3>
      {cities.map(city => (
        <label key={city.id} className="filter-checkbox">
          <input
            type="checkbox"
            checked={filters.cities.includes(city.id)}
            onChange={() => toggleFilter('cities', city.id)}
          />
          <span>{city.name}</span>
        </label>
      ))}
    </div>

    {/* Секция фильтра по типам продукции */}
    <div className="filter-section">
      <h3>Тип продукции</h3>
      {productTypes.map(type => (
        <label key={type.id} className="filter-checkbox">
          <input
            type="checkbox"
            checked={filters.productTypes.includes(type.id)}
            onChange={() => toggleFilter('productTypes', type.id)}
          />
          <span>{type.name}</span>
        </label>
      ))}
    </div>

    {/* Секция фильтра по рейтингам */}
    <div className="filter-section">
      <h3>Рейтинг</h3>
      {ratings.map(rating => (
        <label key={rating.id} className="filter-checkbox">
          <input
            type="checkbox"
            checked={filters.ratings.includes(rating.id)}
            onChange={() => toggleFilter('ratings', rating.id)}
          />
          <span>{rating.name}</span>
        </label>
      ))}
    </div>

    {/* Секция фильтра по опциям доставки */}
    <div className="filter-section">
      <h3>Дополнительные опции</h3>
      {deliveryOptions.map(option => (
        <label key={option.id} className="filter-checkbox">
          <input
            type="checkbox"
            checked={filters.delivery.includes(option.id)}
            onChange={() => toggleFilter('delivery', option.id)}
          />
          <span>{option.name}</span>
        </label>
      ))}
    </div>
    
  </div>
);