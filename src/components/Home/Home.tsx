import React, { useState, useEffect } from 'react';
import './Home.css';
import ExpenseCategories from '../ExpenseCategories/ExpenseCategories';
import { ExpenseCategory } from '../ExpenseCategories/ExpenseCategories';
import MonthlySummary from '../MonthlySummary/MonthlySummary';
import Calendar from '../Calendar/Calendar';

const sections = [
  { key: 'monthly', label: 'Monthly Summary' },
  { key: 'categories', label: 'Expense Categories' },
  { key: 'transactions', label: 'Recent Transactions' },
  { key: 'calendar', label: 'Calendar' },
  { key: 'actions', label: 'Quick Actions' },
  { key: 'insights', label: 'Insights' },
];

const expenseCategories: ExpenseCategory[] = [
  { id: '1', type: 'Water', name: 'Water', supplier: 'Thames Water', cost: '£30', paymentDay: '1st', paymentMethod: 'Direct Debit', bank: 'HSBC' },
  { id: '2', type: 'Electricity', name: 'Electricity', supplier: 'Octopus Energy', cost: '£45', paymentDay: '5th', paymentMethod: 'Direct Debit', bank: 'Lloyds' },
  { id: '3', type: 'Gas', name: 'Gas', supplier: 'British Gas', cost: '£40', paymentDay: '10th', paymentMethod: 'Bank Transfer', bank: 'Barclays' },
  { id: '4', type: 'Council Tax', name: 'Council Tax', supplier: 'Local Council', cost: '£120', paymentDay: '15th', paymentMethod: 'Direct Debit', bank: 'Santander' },
  { id: '5', type: 'Internet', name: 'Internet', supplier: 'BT', cost: '£25', paymentDay: '20th', paymentMethod: 'Bank Transfer', bank: 'HSBC' },
  { id: '6', type: 'Mobile', name: 'Mobile', supplier: 'EE', cost: '£20', paymentDay: '25th', paymentMethod: 'Direct Debit',  bank: 'Lloyds' },
  { id: '7', type: 'Insurance', name: 'Insurance', supplier: 'Aviva', cost: '£50', paymentDay: '30th', paymentMethod: 'Direct Debit', bank: 'Barclays' },
  { id: '8', type: 'Subscription', name: 'Netflix', supplier: 'Netflix', cost: '£10', paymentDay: '1st', paymentMethod: 'Direct Debit', bank: 'Santander' },
  { id: '9', type: 'Subscription', name: 'Disney plus', supplier: 'Disney plus', cost: '£10', paymentDay: '5th', paymentMethod: 'Direct Debit', bank: 'HSBC' },
  { id: '10', type: 'Subscription', name: 'Amazon Prime', supplier: 'Amazon Prime', cost: '£8', paymentDay: '10th', paymentMethod: 'Direct Debit' },
  { id: '11', type: 'Subscription', name: 'Spotify', supplier: 'Spotify', cost: '£10', paymentDay: '15th', paymentMethod: 'Pay Pal' },
  { id: '12', type: 'Subscription', name: 'HBO Max', supplier: 'HBO Max', cost: '£12', paymentDay: '20th', paymentMethod: 'Google Pay' },
  { id: '13', type: 'Subscription', name: 'Apple Music', supplier: 'Apple Music', cost: '£10', paymentDay: '25th', paymentMethod: 'Direct Debit' },
];

const Home: React.FC = () => {
  const [selected, setSelected] = useState<string>('monthly');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  const sectionContent: Record<string, React.ReactNode> = {
    monthly: (
      <MonthlySummary categories={expenseCategories} />
    ),
    categories: (
      <ExpenseCategories categories={expenseCategories} />
    ),
    transactions: (
      <p>Recent transactions will be displayed here.</p>
    ),
    calendar: (
      <Calendar categories={expenseCategories} />
    ),
    actions: (
      <p>Quick actions will be displayed here.</p>
    ),
    insights: (
      <p>Insights and tips will be displayed here.</p>
    ),
  };

  // Get the current section label for the header
  const currentSection = sections.find(s => s.key === selected);

  return (
    <div className="home-layout">
      {/* Fixed header */}
      <header className="main-header">
        <button
          className="burger-menu"
          aria-label="Open menu"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <span />
          <span />
          <span />
        </button>
        <h2 className="screen-title">{currentSection?.label}</h2>
      </header>
      <nav className={`sidebar${sidebarOpen ? ' open' : ''}`}>
        <h1>Home</h1>
        <ul>
          {sections.map((section) => (
            <li
              key={section.key}
              className={selected === section.key ? 'active' : ''}
              onClick={() => {
                setSelected(section.key);
                setSidebarOpen(false);
              }}
              tabIndex={0}
              role="button"
              aria-pressed={selected === section.key}
            >
              {section.label}
            </li>
          ))}
        </ul>
      </nav>
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
      <main className="main-content">
        {sectionContent[selected]}
      </main>
    </div>
  );
};

export default Home;