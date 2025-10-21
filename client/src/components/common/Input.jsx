import React from 'react';
// компонент инпута с возможностью кастомизации стилей через className
// принимает props: value, onChange, placeholder, type (по умолчанию 'text'), className (дополнительные классы)
export const Input = ({ value, onChange, placeholder = '', type = 'text', className = '' }) => {
  return (
    // базовые стили + дополнительные классы из props
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
};
