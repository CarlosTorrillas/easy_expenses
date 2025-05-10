import React from 'react';
import { ExpenseCategory } from '../ExpenseCategories/ExpenseCategories';

interface Props {
  categories: ExpenseCategory[];
}

const MonthlySummary: React.FC<Props> = ({ categories }) => {
  const total = categories.reduce((sum, cat) => {
    const value = parseFloat(cat.cost.replace('£', ''));
    return sum + (isNaN(value) ? 0 : value);
  }, 0);

  return (
    <div>
      <div style={{ fontSize: '1.5rem', fontWeight: 700, margin: '1.5rem 0' }}>
        <span>Total Spending This Month: </span>
        <span data-testid="monthly-total">£{total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default MonthlySummary;