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
    render(<Login onSwitchToRegister={() => {}} />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'alice@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'secret' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/welcome home/i)).toBeInTheDocument();
    });
  });
  it.each([
    {
      label: /email/i,
      value: '',
      otherLabel: /password/i,
      otherValue: 'secret',
      error: /email is required/i,
      inputRole: /email/i,
    },
    {
      label: /password/i,
      value: '',
      otherLabel: /email/i,
      otherValue: 'alice@example.com',
      error: /password is required/i,
      inputRole: /password/i,
    },
  ])(
    'GIVEN a customer is on the LoginForm AND $label is not provided WHEN the customer selects to login THEN an error in red under the data missing is displayed AND the input field shows a red frame',
    async ({ label, value, otherLabel, otherValue, error, inputRole }) => {
      render(<Login onSwitchToRegister={() => {}} />);

      // Fill the other field, leave the tested one empty
      fireEvent.change(screen.getByLabelText(otherLabel), { target: { value: otherValue } });
      fireEvent.click(screen.getByRole('button', { name: /login/i }));

      // Wait for error message
      expect(await screen.findByText(error)).toBeInTheDocument();

      // Check for red frame
      const input = screen.getByLabelText(inputRole);
      expect(input).toHaveClass('input-error');
    }
  );
});