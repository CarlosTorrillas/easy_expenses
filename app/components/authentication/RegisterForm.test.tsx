import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from './RegisterForm';

describe('Register User', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 201,
        json: () => Promise.resolve({ id: 1, email: 'alice@example.com', name: 'Alice' }),
      } as unknown as Response)
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('GIVEN the customer is on the register form AND inputs valid data AND is not already registered WHEN the customer selects to register THEN a success message should be displayed', async () => {
    render(<RegisterForm onSwitchToLogin={() => {}}/>);

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'alice@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'secret' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // Wait for the success message to appear
    await waitFor(() => {
      expect(screen.getByText(/registration successful/i)).toBeInTheDocument();
    });
  });
});