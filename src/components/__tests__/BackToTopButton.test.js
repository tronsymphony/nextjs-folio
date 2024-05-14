// components/BackToTopButton.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import BackToTopButton from '../BackToTopButton';

describe('BackToTopButton', () => {
  it('renders the button when scrolled down', () => {
    render(<BackToTopButton />);
    // Simulate scrolling down
    fireEvent.scroll(window, { target: { scrollY: 400 } });
    expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument();
  });

  it('does not render the button when scrolled up', () => {
    render(<BackToTopButton />);
    // Simulate scrolling up
    fireEvent.scroll(window, { target: { scrollY: 0 } });
    expect(screen.queryByRole('button', { name: /back to top/i })).not.toBeInTheDocument();
  });

  it('scrolls to the top when button is clicked', () => {
    render(<BackToTopButton />);
    // Mock window.scrollTo
    window.scrollTo = jest.fn();
    // Simulate scrolling down
    fireEvent.scroll(window, { target: { scrollY: 400 } });
    fireEvent.click(screen.getByRole('button', { name: /back to top/i }));
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
