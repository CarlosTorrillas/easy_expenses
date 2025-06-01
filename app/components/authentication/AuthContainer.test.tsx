import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AuthContainer from './AuthContainer';

describe('AuthContainer', () => {
  it('GIVEN the container is rendered THEN the login form is shown by default', () => {
    render(<AuthContainer />);
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });

  it('GIVEN the login form is shown WHEN the user selects to register THEN the register form is displayed', async () => {
    render(<AuthContainer />);
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    // Wait for the register heading to appear
    expect(await screen.findByRole('heading', { name: /register/i })).toBeInTheDocument();
  });

  it('GIVEN the register form is shown WHEN the user selects to login THEN the login form is displayed', () => {
    render(<AuthContainer />);
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    fireEvent.click(screen.getByRole('button', { name: /back to login/i }));
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });
});