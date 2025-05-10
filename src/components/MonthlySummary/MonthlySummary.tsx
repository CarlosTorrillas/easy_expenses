import React from 'react';
import { ExpenseCategory } from '../ExpenseCategories/ExpenseCategories';
import './MonthlySummary.css';

interface Props {
  categories: ExpenseCategory[];
}

const MonthlySummary: React.FC<Props> = ({ categories }) => {
  // Group by type
  const grouped = categories.reduce<Record<string, number>>((acc, cat) => {
    const value = parseFloat(cat.cost.replace('£', ''));
    if (!acc[cat.type]) acc[cat.type] = 0;
    acc[cat.type] += isNaN(value) ? 0 : value;
    return acc;
  }, {});

  const total = Object.values(grouped).reduce((sum, v) => sum + v, 0);

  return (
    <div>
      <div className="monthly-summary-total">
        <span style={{ marginRight: 12, fontWeight: 400, color: '#b08968' }}>
          Total Spending This Month:
        </span>
        <span data-testid="monthly-total">£{total.toFixed(2)}</span>
      </div>
      <div className="category-cards">
        {Object.entries(grouped).map(([type, sum]) => (
          <div className="category-card" key={type}>
            <span className="category-title">{type}</span>
            <span className="category-amount" data-testid={`category-total-${type}`}>
              £{sum.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlySummary;