import React from 'react';
import { render, screen } from '@testing-library/react';
import MonthlySummary from './MonthlySummary';

describe('Feature: Display a high-level overview of spending for the current month', () => {
  describe('Scenario: Display total spending in Monthly Summary', () => {
    const categories = [
      { id: '1', type: '', name: '', supplier: '', cost: '£10', paymentDay: '', paymentMethod: '' },
      { id: '2', type: '', name: '', supplier: '', cost: '£20', paymentDay: '', paymentMethod: '' },
      { id: '3', type: '', name: '', supplier: '', cost: '£30', paymentDay: '', paymentMethod: '' },
    ];

    beforeEach(() => {
      render(<MonthlySummary categories={categories} />);
    });

    it('Then I should see the total amount spent for the current month', () => {
      expect(screen.getByTestId('monthly-total')).toHaveTextContent('£60.00');
    });

    it('And this amount should be clearly labeled (e.g., "Total Spending This Month")', () => {
      expect(screen.getByText(/total spending this month/i)).toBeInTheDocument();
    });

    it('And the currency should be correctly displayed (e.g., "£")', () => {
      expect(screen.getByTestId('monthly-total')).toHaveTextContent('£');
    });
  });
});