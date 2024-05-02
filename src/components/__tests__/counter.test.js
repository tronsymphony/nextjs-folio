import { render, screen, fireEvent } from '@testing-library/react';
import MyButton from '../MyButton';

describe('MyButton', () => {
  test('renders the button with the correct text', () => {
    render(<MyButton>Click Me!</MyButton>);
    expect(screen.getByText('Click Me!')).toBeInTheDocument();
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<MyButton onClick={handleClick}>Click Me!</MyButton>);
    fireEvent.click(screen.getByText('Click Me!'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
