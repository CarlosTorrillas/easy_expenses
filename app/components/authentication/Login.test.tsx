import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './LoginForm';

// Mock next/navigation's useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Login', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ id: 1, email: 'alice@example.com', name: 'Alice' }),
      } as unknown as Response)
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('GIVEN the customer is on the login form AND inputs valid data AND is already registered WHEN the customer selects to login THEN the customer should land in their home screen', async () => {
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'alice@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'secret' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/welcome home/i)).toBeInTheDocument();
    });
  });
});