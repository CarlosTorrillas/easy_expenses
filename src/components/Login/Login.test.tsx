// src/components/__tests__/LoginForm.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(), // <-- returns a mock function
}));

describe('LoginForm', () => {
  const mockOnLoginSuccess = jest.fn(); // Renamed the mock function

  beforeEach(() => {
    mockOnLoginSuccess.mockClear();
  });

  test('renders email and password input fields and a login button', () => {
    render(<Login onLoginSuccess={mockOnLoginSuccess} />); // Updated prop name
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  test('calls the onLoginSuccess prop when both email and password are provided', async () => {
    render(<Login onLoginSuccess={mockOnLoginSuccess} />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(loginButton);

    expect(mockOnLoginSuccess).toHaveBeenCalledTimes(1);
    // Expect the third argument to be a function (navigate)
    expect(mockOnLoginSuccess).toHaveBeenCalledWith(
      'test@example.com',
      'password123',
      expect.any(Function)
    );
  });

  test('does not call onLoginSuccess and shows an error message if email is empty', async () => {
    render(<Login onLoginSuccess={mockOnLoginSuccess} />); // Updated prop name
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });
    const emailInput = screen.getByLabelText('Email:');

    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(loginButton);

    expect(mockOnLoginSuccess).not.toHaveBeenCalled(); // Updated mock function name
    expect(screen.getByText('Email and password are required')).toBeInTheDocument();
  });

  test('does not call onLoginSuccess and shows an error message if password is empty', async () => {
    render(<Login onLoginSuccess={mockOnLoginSuccess} />); // Updated prop name
    const emailInput = screen.getByLabelText('Email:');
    const loginButton = screen.getByRole('button', { name: 'Login' });
    const passwordInput = screen.getByLabelText('Password:');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.click(loginButton);

    expect(mockOnLoginSuccess).not.toHaveBeenCalled(); // Updated mock function name
    expect(screen.getByText('Email and password are required')).toBeInTheDocument();
  });

  test('does not call onLoginSuccess and shows an error message if both fields are empty', async () => {
    render(<Login onLoginSuccess={mockOnLoginSuccess} />); // Updated prop name
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.click(loginButton);

    expect(mockOnLoginSuccess).not.toHaveBeenCalled(); // Updated mock function name
    expect(screen.getByText('Email and password are required')).toBeInTheDocument();
  });
});