import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Login from './Login';

describe('HomePage Authentication', () => {
  it('shows login/register screen with authentication options', () => {
    render(<Login />);
    // Check for login form fields
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    // Check for login button
    expect(screen.getByRole('button', { name: /login|sign in|entrar/i })).toBeInTheDocument();
    // Check for register option
    expect(screen.getByRole('button', { name: /register|sign up|cadastro/i })).toBeInTheDocument();
  });
});