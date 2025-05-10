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

  describe('Scenario: Group expenses by category in the monthly summary', () => {
    const categories = [
      { id: '1', type: 'Utilities', name: 'Water', supplier: '', cost: '£10', paymentDay: '', paymentMethod: '' },
      { id: '2', type: 'Utilities', name: 'Electricity', supplier: '', cost: '£20', paymentDay: '', paymentMethod: '' },
      { id: '3', type: 'Food', name: 'Groceries', supplier: '', cost: '£30', paymentDay: '', paymentMethod: '' },
      { id: '4', type: 'Food', name: 'Dining Out', supplier: '', cost: '£15', paymentDay: '', paymentMethod: '' },
      { id: '5', type: 'Transportation', name: 'Bus', supplier: '', cost: '£5', paymentDay: '', paymentMethod: '' },
    ];

    beforeEach(() => {
      render(<MonthlySummary categories={categories} />);
    });

    it('Then my expenses should be grouped by their respective categories', () => {
      expect(screen.getAllByText(/utilities/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/food/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/transportation/i).length).toBeGreaterThan(0);
    });

    it('And for each category, I should see the total amount spent', () => {
      expect(screen.getByTestId('category-total-Utilities')).toHaveTextContent('£30.00');
      expect(screen.getByTestId('category-total-Food')).toHaveTextContent('£45.00');
      expect(screen.getByTestId('category-total-Transportation')).toHaveTextContent('£5.00');
    });
  });

  describe('Scenario: Display a visual representation of spending by category (e.g., Pie Chart)', () => {
    const categories = [
      { id: '1', type: 'Utilities', name: 'Water', supplier: '', cost: '£10', paymentDay: '', paymentMethod: '' },
      { id: '2', type: 'Utilities', name: 'Electricity', supplier: '', cost: '£20', paymentDay: '', paymentMethod: '' },
      { id: '3', type: 'Food', name: 'Groceries', supplier: '', cost: '£30', paymentDay: '', paymentMethod: '' },
    ];

    beforeEach(() => {
      render(<MonthlySummary categories={categories} />);
    });

    it('Then there should be a visual representation (e.g., a pie chart) showing the proportion of my total spending allocated to each expense category for the current month.', () => {
      expect(screen.getByTestId('spending-pie-chart')).toBeInTheDocument();
    });

    it('And each segment of the visual representation should be clearly labeled with the category name and/or percentage of total spending.', () => {
      expect(screen.getAllByText(/utilities/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/food/i).length).toBeGreaterThan(0);
      // expect(screen.getByText(/33%/i)).toBeInTheDocument(); // 10/30 = 33%
      // expect(screen.getByText(/66%/i)).toBeInTheDocument(); // 20/30 = 66%
    });
  });
});