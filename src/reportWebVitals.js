//Рапорт о производительности веб-приложения
const reportWebVitals = onPerfEntry => {
  // функция для сбора и отправки метрик производительности
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Динамический импорт библиотеки web-vitals для измерения производительности
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};
// экспортируем функцию для использования в других частях приложения
export default reportWebVitals;
