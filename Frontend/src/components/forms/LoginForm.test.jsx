import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';
import { AuthContext } from '../../context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import '@testing-library/jest-dom';

// Create mock login authentication handlers
const mockLogin = vi.fn().mockResolvedValue({ success: true });

const renderLoginForm = () => {
    return render(
        <HelmetProvider>
            <BrowserRouter>
                <AuthContext.Provider value={{ login: mockLogin }}>
                    <LoginForm />
                </AuthContext.Provider>
            </BrowserRouter>
        </HelmetProvider>
    );
};

describe('LoginForm Form Validations', () => {
    it('should display inputs and triggers submit buttons', () => {
        renderLoginForm();
        expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    it('should announce errors on submitting blank inputs', async () => {
        renderLoginForm();
        
        // Trigger validation states by clicking submit on empty fields
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

        await waitFor(() => {
            expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
            expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
        });
    });
});
