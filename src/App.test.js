import { render, screen } from '@testing-library/react'; // импорт функций для рендеринга и поиска элементов в тестах
import App from './App'; // импорт основного компонента приложения
// тест для проверки рендера основного компонента приложения
test('renders learn react link', () => {
  render(<App />);
  // проверяем наличие текста "learn react" на странице
  // (пример теста, заменить на актуальный для вашего приложения)
  const linkElement = screen.getByText(/learn react/i);
  // ожидаем, что элемент с текстом найден в документе
  expect(linkElement).toBeInTheDocument();

});
