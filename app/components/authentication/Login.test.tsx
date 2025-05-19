import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('HomePage Authentication', () => {
  it('shows login/register screen with authentication options', () => {
    render(<Login />);
    // Login form fields
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    // Login button
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    // Register button
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it('shows register form and Google option when Register is clicked', () => {
    render(<Login />);
    // Click Register button
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // Register form fields
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    // Register submit button
    expect(screen.getByRole('button', { name: /^register$/i })).toBeInTheDocument();

    // Google register button
    expect(screen.getByRole('button', { name: /register with google/i })).toBeInTheDocument();
  });

  it('returns to login form when Back to Login is clicked from register form', () => {
    render(<Login />);
    // Go to register form
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // Now click "Back to Login"
    fireEvent.click(screen.getByRole('button', { name: /back to login/i }));

    // Login form fields should be visible again
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
});