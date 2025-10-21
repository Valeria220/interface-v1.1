import { useMemo } from 'react';

/**
 * Кастомный хук для фильтрации товаров по поисковому запросу и фильтрам
 * Оптимизирует производительность с помощью useMemo для избежания лишних вычислений
 * 
 * @param {Array} products - Массив всех товаров для фильтрации
 * @param {Object} filters - Объект с выбранными фильтрами
 * @param {Array} filters.cities - Массив выбранных городов
 * @param {Array} filters.productTypes - Массив выбранных типов продукции
 * @param {Array} filters.ratings - Массив выбранных рейтингов
 * @param {Array} filters.delivery - Массив выбранных опций доставки
 * @param {string} query - Поисковый запрос пользователя
 * @returns {Object} Объект с отфильтрованными товарами { filteredProducts }
 */
export const useProductFilter = (products, filters, query) => {
  /**
   * Мемоизированная функция фильтрации товаров
   * Пересчитывается только при изменении products, filters или query
   */
  const filteredProducts = useMemo(() => {
    // Если поисковый запрос пустой, применяем только фильтры
    if (!query) {
      return products.filter(product => {
        // Фильтрация по городам
        if (filters.cities.length > 0 && !filters.cities.includes("any")) {
          const hasMatchingCity = product.cities.some(city => 
            filters.cities.includes(city)
          );
          if (!hasMatchingCity) return false; // Товар не проходит фильтр городов
        }

        // Фильтрация по типам продукции
        if (filters.productTypes.length > 0 && !filters.productTypes.includes("any")) {
          if (!filters.productTypes.includes(product.productType)) return false; // Товар не подходит по типу
        }

        // Фильтрация по рейтингу (минимальный порог)
        if (filters.ratings.length > 0 && !filters.ratings.includes("any")) {
          const hasMatchingRating = filters.ratings.some(rating => {
            const minRating = parseFloat(rating); // Конвертация строки в число
            return product.rating >= minRating; // Проверка что рейтинг товара >= выбранному
          });
          if (!hasMatchingRating) return false; // Товар не проходит фильтр рейтинга
        }

        // Фильтрация по опциям доставки
        if (filters.delivery.length > 0 && !filters.delivery.includes("any")) {
          const hasMatchingDelivery = filters.delivery.some(delivery => 
            product.delivery.includes(delivery) // Проверка наличия опции доставки у товара
          );
          if (!hasMatchingDelivery) return false; // Товар не проходит фильтр доставки
        }

        // Все фильтры пройдены
        return true;
      });
    }

    // Если есть поисковый запрос, применяем поиск + фильтры
    const searchTerm = query.toLowerCase(); // Нормализация запроса для регистронезависимого поиска
    
    return products.filter(product => {
      // Поиск по названию товара
      const matchesName = product.name.toLowerCase().includes(searchTerm);
      
      // Поиск по названиям платформ (Wildberries, OZON и т.д.)
      const matchesPlatforms = product.platforms.some(platform => 
        platform.name.toLowerCase().includes(searchTerm)
      );
      
      // Поиск по названиям магазинов на платформах
      const matchesStores = product.platforms.some(platform =>
        platform.stores.some(store => 
          store.toLowerCase().includes(searchTerm)
        )
      );
      
      // Поиск по названиям магазинов и платформ в отзывах
      const matchesReviewStores = product.reviews.some(review =>
        review.store.toLowerCase().includes(searchTerm) ||
        review.platform.toLowerCase().includes(searchTerm)
      );

      // Объединение всех условий поиска (ИЛИ)
      const matchesSearch = matchesName || matchesPlatforms || matchesStores || matchesReviewStores;

      // Если товар не соответствует поисковому запросу - исключаем его
      if (!matchesSearch) return false;

      // Применяем фильтры к товарам, прошедшим поиск
      
      // Фильтр городов (если выбран хотя бы один город и не выбран "Любой")
      if (filters.cities.length > 0 && !filters.cities.includes("any")) {
        const hasMatchingCity = product.cities.some(city => filters.cities.includes(city));
        if (!hasMatchingCity) return false;
      }

      // Фильтр типов продукции
      if (filters.productTypes.length > 0 && !filters.productTypes.includes("any")) {
        if (!filters.productTypes.includes(product.productType)) return false;
      }

      // Фильтр рейтинга
      if (filters.ratings.length > 0 && !filters.ratings.includes("any")) {
        const hasMatchingRating = filters.ratings.some(rating => {
          const minRating = parseFloat(rating);
          return product.rating >= minRating;
        });
        if (!hasMatchingRating) return false;
      }

      // Фильтр опций доставки
      if (filters.delivery.length > 0 && !filters.delivery.includes("any")) {
        const hasMatchingDelivery = filters.delivery.some(delivery => 
          product.delivery.includes(delivery)
        );
        if (!hasMatchingDelivery) return false;
      }

      // Товар прошел все проверки: поиск + фильтры
      return true;
    });
  }, [products, filters, query]); // Зависимости для useMemo

  // Возвращаем отфильтрованные товары
  return { filteredProducts };
};