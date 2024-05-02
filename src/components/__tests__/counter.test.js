import { render, screen, fireEvent } from '@testing-library/react';
import Counter from '../counter';
import ThemeContext from '../themecontext';

describe('Counter', () => {
  // Helper function to render the component with context
  const renderWithContext = (themeValue) => {
    return render(
      <ThemeContext.Provider value={themeValue}>
        <Counter />
      </ThemeContext.Provider>
    );
  };

  test('renders with initial count 0', () => {
    renderWithContext('light');
    const counterElement = screen.getByRole('heading', { level: 1 });
    expect(counterElement).toHaveTextContent('0');
  });

  test('increments count on button click', () => {
    renderWithContext('light');
    const buttonElement = screen.getByRole('button', { name: /increment/i });
    fireEvent.click(buttonElement);
    const counterElement = screen.getByRole('heading', { level: 1 });
    expect(counterElement).toHaveTextContent('1');
  });

  test('applies correct styles for dark theme', () => {
    renderWithContext('dark');
    const counterElement = screen.getByRole('heading', { level: 1 });
    expect(counterElement.style.backgroundColor).toBe('black');
    expect(counterElement.style.color).toBe('white');
  });

  test('applies correct styles for light theme', () => {
    renderWithContext('light');
    const counterElement = screen.getByRole('heading', { level: 1 });
    expect(counterElement.style.backgroundColor).toBe('white');
    expect(counterElement.style.color).toBe('black');
  });
});
