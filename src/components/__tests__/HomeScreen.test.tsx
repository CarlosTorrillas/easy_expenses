import React from 'react';
import { render, screen } from '@testing-library/react';
import HomeScreen from '../HomeScreen';
import '@testing-library/jest-dom';

describe('Feature: Home Screen Structure and Default View', () => {
  describe('Scenario: Display home screen with sections after successful login', () => {
    beforeEach(() => {
      render(<HomeScreen />);
    });

    test('Then I should see a screen titled "Home" or a similar identifier', () => {
      expect(
        screen.getByRole('heading', { name: /home|welcome/i })
      ).toBeInTheDocument();
    });

    test('And I should see a clearly labeled section for "Monthly Summary"', () => {
      expect(
        screen.getByRole('heading', { name: /monthly summary/i })
      ).toBeInTheDocument();
    });

    test('And I should see a clearly labeled section for "Expense Categories"', () => {
      expect(
        screen.getByRole('heading', { name: /expense categories/i })
      ).toBeInTheDocument();
    });

    test('And I should see a clearly labeled section for "Recent Transactions"', () => {
      expect(
        screen.getByRole('heading', { name: /recent transactions/i })
      ).toBeInTheDocument();
    });

    test('And I should see a clearly labeled section for "Calendar"', () => {
      expect(
        screen.getByRole('heading', { name: /calendar/i })
      ).toBeInTheDocument();
    });

    test('And I should see a clearly labeled section for "Quick actions"', () => {
      expect(
        screen.getByRole('heading', { name: /quick actions/i })
      ).toBeInTheDocument();
    });

    test('And I should see a clearly labeled section for "Insights/Tips"', () => {
      expect(
        screen.getByRole('heading', { name: /insights\/tips/i })
      ).toBeInTheDocument();
    });
  });
});