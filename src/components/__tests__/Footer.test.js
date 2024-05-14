// pages/Footer.test.js
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Footer from './index'; // Update the path if necessary
import '@testing-library/jest-dom/extend-expect';

jest.useFakeTimers();

describe('Footer', () => {
  afterEach(() => {
    sessionStorage.clear();
    jest.clearAllTimers();
  });

  test('shows modal after the specified timeout', () => {
    // Render the Footer component
    render(<Footer />);

    // Modal should not be in the document initially
    expect(screen.queryByText('Get in touch for a free audit.')).not.toBeInTheDocument();

    // Advance timers to simulate timeout
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // Modal should be in the document after the timeout
    expect(screen.getByText('Get in touch for a free audit.')).toBeInTheDocument();
  });

  test('does not show modal if sessionStorage indicates it has been shown', () => {
    // Set sessionStorage item to indicate modal has been shown
    sessionStorage.setItem('modalShown', 'true');

    // Render the Footer component
    render(<Footer />);

    // Advance timers to simulate timeout
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // Modal should not be in the document
    expect(screen.queryByText('Get in touch for a free audit.')).not.toBeInTheDocument();
  });
});
