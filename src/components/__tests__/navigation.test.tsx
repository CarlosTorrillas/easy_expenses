// src/__tests__/navigation.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from '../LoginForm';
import HomeScreen from '../HomeScreen';

// Move mockNavigate inside the mock and export it for use in tests
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

describe('Navigation Flow: Login to Home Screen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('renders the login screen and navigates to the home screen on successful login', async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LoginForm
                onLoginSuccess={(email, password, navigate) => navigate('/home')}
              />
            }
          />
          <Route path="/home" element={<HomeScreen />} />
        </Routes>
      </BrowserRouter>
    );

    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText('Email:'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Password:'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/home');
  });
});