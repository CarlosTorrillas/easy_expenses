import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthContainer from '../components/authentication/AuthContainer';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  __esModule: true,
}));

describe('Navigation flow', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ id: 1, email: 'alice@example.com', name: 'Alice' }),
      } as unknown as Response)
    );
    mockPush.mockClear();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('navigates to home on successful login', async () => {
    render(<AuthContainer />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'alice@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'secret' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/home');
    });
  });
});