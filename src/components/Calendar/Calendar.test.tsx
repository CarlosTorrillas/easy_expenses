import React from 'react';
import { render, screen } from '@testing-library/react';
import Calendar from './Calendar';

const categories = [
  { id: '1', type: 'Utilities', name: 'Water', supplier: '', cost: '£10', paymentDay: '5th', paymentMethod: '' },
  { id: '2', type: 'Food', name: 'Groceries', supplier: '', cost: '£20', paymentDay: '15th', paymentMethod: '' },
];

describe('Feature: Display a calendar view for the current month', () => {
  beforeEach(() => {
    render(<Calendar categories={categories} />);
  });

  it('Then I should see a calendar for the current month', () => {
    const now = new Date();
    const monthName = now.toLocaleString('default', { month: 'long' });
    const year = now.getFullYear();
    expect(screen.getByText(new RegExp(`${monthName} ${year}`))).toBeInTheDocument();
  });

  it('And the calendar should display all the days of the month', () => {
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      expect(screen.getByText(day.toString())).toBeInTheDocument();
    }
  });

  it('And the current day should be visually highlighted', () => {
    const now = new Date();
    const today = now.getDate().toString();
    const todayCell = screen.getByText(today);
    expect(todayCell).toHaveClass('calendar-today');
  });

  it('Scenario: Indicate days with financial events', () => {
    // Should show a dot or indicator on the 5th and 15th
    expect(screen.getByTestId('calendar-day-5').querySelector('.calendar-event-dot')).toBeInTheDocument();
    expect(screen.getByTestId('calendar-day-15').querySelector('.calendar-event-dot')).toBeInTheDocument();
  });
});