import React from 'react';
// компонент селекта с возможностью кастомизации стилей через className
// принимает props: value, onChange, options (массив объектов { value, label }), className (дополнительные классы)
export const Select = ({ value, onChange, options = [], className = '' }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      // базовые стили + дополнительные классы из props
      className={`border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      // рендерим опции из массива options
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};
