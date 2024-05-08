import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactForm from '../ContactForm'; // Assuming the file is named ContactForm.js

beforeAll(() => {
    window.alert = jest.fn();
});
// Mock fetch for form submission
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Form submitted successfully' }),
    })
);

test('renders contact form with all fields', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Website URL/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
});


test('updates fields when user types', () => {
    render(<ContactForm />);

    const nameInput = screen.getByLabelText(/Your Name/i);
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput.value).toBe('John Doe');

    const emailInput = screen.getByLabelText(/Your Email/i);
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    expect(emailInput.value).toBe('john@example.com');

    const messageInput = screen.getByLabelText(/Your Message/i);
    fireEvent.change(messageInput, { target: { value: 'Hello, this is a test message.' } });
    expect(messageInput.value).toBe('Hello, this is a test message.');
});


test('submits the form successfully and shows alert', async () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Your Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Your Message/i), { target: { value: 'Hello, this is a test message.' } });
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(window.alert).toHaveBeenCalledWith('Form submitted successfully');
    });
});


// test('displays an error message if form submission fails', async () => {
//     fetch.mockImplementationOnce(() => Promise.resolve({ ok: false }));

//     render(<ContactForm />);
//     fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: 'John Doe' } });
//     fireEvent.change(screen.getByLabelText(/Your Email/i), { target: { value: 'john@example.com' } });
//     fireEvent.change(screen.getByLabelText(/Your Message/i), { target: { value: 'Hello, this is a test message.' } });
//     fireEvent.click(screen.getByRole('button', { name: /send/i }));

//     await waitFor(() => {
//         expect(screen.getByText(/Form submission failed/i)).toBeInTheDocument();
//     });
// });
