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
            <th>Cost</th>
            <th>Payment Day</th>
          </tr>
        </thead>
        <tbody>
          {expenseCategories.map((cat) => (
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

const HomeScreen: React.FC = () => {
  const [selected, setSelected] = useState<string>('monthly');

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