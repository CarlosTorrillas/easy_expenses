import React, { useState } from 'react';
import './HomeScreen.css';
import { ExpenseCategories } from '../ExpenseCategories';


interface ExpenseCategory {
  id: string;
  type: string; // e.g., 'Subscription', 'Water', etc.
  name: string; // e.g., 'Netflix', 'Thames Water'
  supplier: string;
  cost: string;
  paymentDay: string;
  paymentMethod: string;
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

const HomeScreen: React.FC = () => {
  const [selected, setSelected] = useState<string>('monthly');

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
        <ExpenseCategories categories={expenseCategories} />
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