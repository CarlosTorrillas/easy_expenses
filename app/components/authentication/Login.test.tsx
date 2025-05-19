import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('HomePage Authentication', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: {
          get: () => null,
        },
        redirected: false,
        type: 'basic',
        url: '',
        clone: () => this,
        body: null,
        bodyUsed: false,
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
        blob: () => Promise.resolve(new Blob()),
        formData: () => Promise.resolve(new FormData()),
        json: () => Promise.resolve({}),
        text: () => Promise.resolve(''),
      } as unknown as Response)
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

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

  it('shows success message and returns to login after successful registration', async () => {
    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: 'alice@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /^register$/i }));

    // Wait for the success message and login form to appear
    expect(await screen.findByText(/Registration successful! Please log in./i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
});