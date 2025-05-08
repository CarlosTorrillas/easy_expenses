import React, { useState } from 'react';
import './HomeScreen.css';

interface ExpenseCategory {
  name: string;
  supplier: string;
  cost: string;
  paymentDay: string;
}

const sections = [
  { key: 'monthly', label: 'Monthly Summary' },
  { key: 'categories', label: 'Expense Categories' },
  { key: 'transactions', label: 'Recent Transactions' },
  { key: 'calendar', label: 'Calendar' },
  { key: 'actions', label: 'Quick Actions' },
  { key: 'insights', label: 'Insights' },
];

const expenseCategories: ExpenseCategory[] = [
  { name: 'Water', supplier: 'Thames Water', cost: '£30', paymentDay: '1st' },
  { name: 'Electricity', supplier: 'Octopus Energy', cost: '£45', paymentDay: '5th' },
  { name: 'Gas', supplier: 'British Gas', cost: '£40', paymentDay: '10th' },
  { name: 'Council Tax', supplier: 'Local Council', cost: '£120', paymentDay: '15th' },
  { name: 'Internet', supplier: 'BT', cost: '£25', paymentDay: '20th' },
  { name: 'Mobile', supplier: 'EE', cost: '£20', paymentDay: '25th' },
];

const HomeScreen: React.FC = () => {
  const [selected, setSelected] = useState<string>('monthly');
  const [sortBy, setSortBy] = useState<string>(''); // e.g., 'cost'
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  // Sorting logic for expense categories
  const getSortedCategories = () => {
    if (selected !== 'categories' || !sortBy) return expenseCategories;
    const sorted = [...expenseCategories].sort((a, b) => {
      if (sortBy === 'cost') {
        const costA = parseFloat(a.cost.replace('£', ''));
        const costB = parseFloat(b.cost.replace('£', ''));
        return sortAsc ? costA - costB : costB - costA;
      }
      // Add more sort options if needed
      return 0;
    });
    return sorted;
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(column);
      setSortAsc(true);
    }
  };

  const sectionContent: Record<string, React.ReactNode> = {
    monthly: (
      <>
        <h2>Monthly Summary</h2>
        <p>Monthly summary will be displayed here.</p>
      </>
    ),
    categories: (
      <>
        <h2>Expense Categories</h2>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Supplier</th>
              <th
                className="sortable-column"
                onClick={() => handleSort('cost')}
                title="Click to sort by cost"
                tabIndex={0}
                onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') handleSort('cost'); }}
                aria-label={`Sort by cost ${sortBy === 'cost' ? (sortAsc ? 'descending' : 'ascending') : ''}`}
              >
                Cost
                <span
                  aria-hidden="true"
                  className={`sort-arrow${sortBy === 'cost' ? ' visible' : ''}`}
                >
                  {sortBy === 'cost' ? (sortAsc ? '▲' : '▼') : '▲'}
                </span>
              </th>
              <th>Payment Day</th>
            </tr>
          </thead>
          <tbody>
            {getSortedCategories().map((cat) => (
              <tr key={cat.name}>
                <td>{cat.name}</td>
                <td>{cat.supplier}</td>
                <td>{cat.cost}</td>
                <td>{cat.paymentDay}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    ),
    transactions: (
      <>
        <h2>Recent Transactions</h2>
        <p>Recent transactions will be displayed here.</p>
      </>
    ),
    calendar: (
      <>
        <h2>Calendar</h2>
        <p>Calendar will be displayed here.</p>
      </>
    ),
    actions: (
      <>
        <h2>Quick Actions</h2>
        <p>Quick actions will be displayed here.</p>
      </>
    ),
    insights: (
      <>
        <h2>Insights</h2>
        <p>Insights and tips will be displayed here.</p>
      </>
    ),
  };

  return (
    <div className="home-layout">
      <nav className="sidebar">
        <h1>Home</h1>
        <ul>
          {sections.map((section) => (
            <li
              key={section.key}
              className={selected === section.key ? 'active' : ''}
              onClick={() => setSelected(section.key)}
              tabIndex={0}
              role="button"
              aria-pressed={selected === section.key}
            >
              {section.label}
            </li>
          ))}
        </ul>
      </nav>
      <main className="main-content">
        {sectionContent[selected]}
      </main>
    </div>
  );
};

export default HomeScreen;