import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomeScreen from '../HomeScreen';
import '@testing-library/jest-dom';

const expenseCategories = [
  { name: 'Water', supplier: 'Thames Water', cost: '£30', paymentDay: '1st' },
  { name: 'Electricity', supplier: 'Octopus Energy', cost: '£45', paymentDay: '5th' },
  { name: 'Gas', supplier: 'British Gas', cost: '£40', paymentDay: '10th' },
  { name: 'Council Tax', supplier: 'Local Council', cost: '£120', paymentDay: '15th' },
  { name: 'Internet', supplier: 'BT', cost: '£25', paymentDay: '20th' },
  { name: 'Mobile', supplier: 'EE', cost: '£20', paymentDay: '25th' },
];

describe('Feature: View Different Expense Categories', () => {
  beforeEach(async () => {
    render(<HomeScreen />);
    // Navigate to Expense Categories section
    await userEvent.click(screen.getByRole('button', { name: /expense categories/i }));
  });

//   test('displays a clearly labeled section titled "Expense Categories"', () => {
//     expect(screen.getByRole('heading', { name: /expense categories/i })).toBeInTheDocument();
//   });
    test('displays a table with the correct headers', () => {
        expect(screen.getByRole('table')).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: /category/i })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: /supplier/i })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: /cost/i })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: /payment day/i })).toBeInTheDocument();
    });

  test('displays basic details for each expense category', () => {
    expenseCategories.forEach((cat) => {
      const row = screen.getByText(cat.name).closest('tr');
      expect(within(row!).getByText(cat.supplier)).toBeInTheDocument();
      expect(within(row!).getByText(cat.cost)).toBeInTheDocument();
      expect(within(row!).getByText(cat.paymentDay)).toBeInTheDocument();
    });
  });

  test('displays table headers for each expense category detail', () => {
    expect(screen.getByRole('columnheader', { name: /supplier/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /cost/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /payment day/i })).toBeInTheDocument();
  });

  test('sorts categories when the user clicks on the column headers', async () => {
    const costHeader = screen.getByRole('columnheader', { name: /cost/i });
    await userEvent.click(costHeader);

    const sortedCategories = [...expenseCategories].sort((a, b) => {
      const costA = parseFloat(a.cost.replace('£', ''));
      const costB = parseFloat(b.cost.replace('£', ''));
      return costA - costB;
    });

    // Get all table rows except the header
    const rows = screen.getAllByRole('row').slice(1);
    // Get the category name from the first cell of each row
    const displayedCategories = rows.map((row) =>
      within(row).getAllByRole('cell')[0].textContent
    );

    expect(displayedCategories).toEqual(sortedCategories.map((cat) => cat.name));
  });
    
  

//   test('displays Direct Debit bank name when applicable', async () => {
//     // Simulate selecting a category with Direct Debit (e.g., "Electricity")
//     await userEvent.click(screen.getByText('Electricity'));
//     // Expect the bank name to be displayed (replace "Bank of Example" with your test data)
//     expect(screen.getByText(/bank/i)).toBeInTheDocument();
//   });

//   test('displays categories in alphabetical order', () => {
//     const categoryElements = screen.getAllByTestId('expense-category-name');
//     const renderedNames = categoryElements.map((el) => el.textContent);
//     const sortedNames = [...renderedNames].sort((a, b) => a!.localeCompare(b!));
//     expect(renderedNames).toEqual(sortedNames);
//   });
});