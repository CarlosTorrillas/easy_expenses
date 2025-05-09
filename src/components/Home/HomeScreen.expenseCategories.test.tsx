import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomeScreen from './Home';
import '@testing-library/jest-dom';

const expenseCategories = [
    { id: '1', type: 'Water', name: 'Water', supplier: 'Thames Water', cost: '£30', paymentDay: '1st', paymentMethod: 'Direct Debit' },
    { id: '2', type: 'Electricity', name: 'Electricity', supplier: 'Octopus Energy', cost: '£45', paymentDay: '5th', paymentMethod: 'Direct Debit' },
    { id: '3', type: 'Gas', name: 'Gas', supplier: 'British Gas', cost: '£40', paymentDay: '10th', paymentMethod: 'Bank Transfer' },
    { id: '4', type: 'Council Tax', name: 'Council Tax', supplier: 'Local Council', cost: '£120', paymentDay: '15th', paymentMethod: 'Direct Debit' },
    { id: '5', type: 'Internet', name: 'Internet', supplier: 'BT', cost: '£25', paymentDay: '20th', paymentMethod: 'Bank Transfer' },
    { id: '6', type: 'Mobile', name: 'Mobile', supplier: 'EE', cost: '£20', paymentDay: '25th', paymentMethod: 'Direct Debit' },
    { id: '7', type: 'Insurance', name: 'Insurance', supplier: 'Aviva', cost: '£50', paymentDay: '30th', paymentMethod: 'Direct Debit' },
    { id: '8', type: 'Subscription', name: 'Netflix', supplier: 'Netflix', cost: '£10', paymentDay: '1st', paymentMethod: 'Direct Debit' },
    { id: '9', type: 'Subscription', name: 'Disney plus', supplier: 'Disney plus', cost: '£10', paymentDay: '5th', paymentMethod: 'Direct Debit' },
    { id: '10', type: 'Subscription', name: 'Amazon Prime', supplier: 'Amazon Prime', cost: '£8', paymentDay: '10th', paymentMethod: 'Direct Debit' },
    { id: '11', type: 'Subscription', name: 'Spotify', supplier: 'Spotify', cost: '£10', paymentDay: '15th', paymentMethod: 'Pay Pal' },
    { id: '12', type: 'Subscription', name: 'HBO Max', supplier: 'HBO Max', cost: '£12', paymentDay: '20th', paymentMethod: 'Google Pay' },
    { id: '13', type: 'Subscription', name: 'Apple Music', supplier: 'Apple Music', cost: '£10', paymentDay: '25th', paymentMethod: 'Direct Debit' },
];

const sortColumns: { column: string; header: RegExp; key: keyof typeof expenseCategories[number]; label: string }[] = [
  { column: 'type', header: /type/i, key: 'type', label: 'Type' },
  { column: 'category', header: /category/i, key: 'name', label: 'Category' },
  { column: 'supplier', header: /supplier/i, key: 'supplier', label: 'Supplier' },
  { column: 'cost', header: /cost/i, key: 'cost', label: 'Cost' },
  { column: 'paymentDay', header: /payment day/i, key: 'paymentDay', label: 'Payment Day' },
  { column: 'paymentMethod', header: /payment method/i, key: 'paymentMethod', label: 'Payment Method' },
];

describe('Feature: View Different Expense Categories', () => {
  beforeEach(async () => {
    render(<HomeScreen />);
    await userEvent.click(screen.getByRole('button', { name: /expense categories/i }));
  });

  test('displays a table with the correct headers', () => {
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /type/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /category/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /supplier/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /cost/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /payment day/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /payment method/i })).toBeInTheDocument();
  });

  test('displays basic details for each expense category', () => {
    expenseCategories.forEach((cat) => {
      const row = screen.getByTestId(`expense-row-${cat.id}`);
      const cells = within(row).getAllByRole('cell');
      expect(cells[0].textContent?.trim()).toBe(cat.type);
      expect(cells[1].textContent?.trim()).toBe(cat.name);
      expect(cells[2].textContent?.trim()).toBe(cat.supplier);
      expect(cells[3].textContent?.trim()).toBe(cat.cost);
      expect(cells[4].textContent?.trim()).toBe(cat.paymentDay);
      expect(cells[5].textContent?.trim()).toBe(cat.paymentMethod);
    });
  });

  test.each(sortColumns)(
    'sorts categories when the user clicks on the $label column header',
    async ({ header, key }: { header: RegExp; key: keyof typeof expenseCategories[number] }) => {
      const headerEl = screen.getByRole('columnheader', { name: header });
      await userEvent.click(headerEl);

      const sortedCategories = [...expenseCategories].sort((a, b) => {
        if (key === 'cost') {
          const costA = parseFloat(a.cost.replace('£', ''));
          const costB = parseFloat(b.cost.replace('£', ''));
          return costA - costB;
        }
        if (key === 'paymentDay') {
          const dayA = parseInt(a.paymentDay, 10);
          const dayB = parseInt(b.paymentDay, 10);
          return dayA - dayB;
        }
        return a[key as keyof typeof a].localeCompare(b[key as keyof typeof b]);
      });

      const rows = screen.getAllByRole('row').slice(1);
      const displayedCategories = rows.map((row) =>
        within(row).getAllByRole('cell')[sortColumns.findIndex(col => col.key === key)]?.textContent
      );

      expect(displayedCategories).toEqual(sortedCategories.map((cat) => cat[key] as string));
    }
  );
});