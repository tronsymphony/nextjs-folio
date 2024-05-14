// components/Modal.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../Modal';

describe('Modal', () => {
    test('renders modal when show is true', () => {
        const handleClose = jest.fn();

        render(
            <Modal show={true} onClose={handleClose}>
                <h2>Modal Title</h2>
                <p>This is the content of the modal.</p>
            </Modal>
        );

        expect(screen.getByText('Modal Title')).toBeInTheDocument();
        expect(screen.getByText('This is the content of the modal.')).toBeInTheDocument();
    });

    test('does not render modal when show is false', () => {
        const handleClose = jest.fn();

        render(
            <Modal show={false} onClose={handleClose}>
                <h2>Modal Title</h2>
                <p>This is the content of the modal.</p>
            </Modal>
        );

        expect(screen.queryByText('Modal Title')).not.toBeInTheDocument();
        expect(screen.queryByText('This is the content of the modal.')).not.toBeInTheDocument();
    });

    test('calls onClose when close button is clicked', () => {
        const handleClose = jest.fn();

        render(
            <Modal show={true} onClose={handleClose}>
                <h2>Modal Title</h2>
                <p>This is the content of the modal.</p>
            </Modal>
        );

        fireEvent.click(screen.getByText('×'));

        expect(handleClose).toHaveBeenCalledTimes(1);
    });

    test('prevents body scroll when modal is open', () => {
        render(
            <Modal show={true} onClose={() => { }}>
                <h2>Modal Title</h2>
                <p>This is the content of the modal.</p>
            </Modal>
        );
        expect(document.body.style.overflow).toBe('hidden');
    });

    test('allows body scroll when modal is closed', () => {
        render(
            <Modal show={false} onClose={() => { }}>
                <h2>Modal Title</h2>
                <p>This is the content of the modal.</p>
            </Modal>
        );
        expect(document.body.style.overflow).toBe('');
    })



});
