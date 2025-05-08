import { render, screen } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

test('renders login form', () => {
  render(<App />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});
