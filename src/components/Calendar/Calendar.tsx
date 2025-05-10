import React from 'react';
import './Calendar.css';
import { ExpenseCategory } from '../ExpenseCategories/ExpenseCategories';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface Props {
  categories?: ExpenseCategory[];
}

const Calendar: React.FC<Props> = ({ categories = [] }) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();

  // First day of the month (0 = Sunday)
  const firstDay = new Date(year, month, 1).getDay();
  // Number of days in the month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Build calendar grid
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null); // empty cells before the 1st
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  // Extract event days from categories' paymentDay (e.g., "5th" -> 5)
  const eventDays = new Set(
    categories
      .map(cat => parseInt(cat.paymentDay, 10))
      .filter(day => !isNaN(day))
  );

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <span className="calendar-title">
          {now.toLocaleString('default', { month: 'long' })} {year}
        </span>
      </div>
      <div className="calendar-grid">
        {WEEKDAYS.map((wd) => (
          <div key={wd} className="calendar-weekday">{wd}</div>
        ))}
        {days.map((d, i) =>
          d ? (
            <div
              key={i}
              data-testid={`calendar-day-${d}`}
              className={`calendar-day${d === today ? ' calendar-today' : ''}`}
            >
              {d}
              {eventDays.has(d) && <span className="calendar-event-dot" title="Event" />}
            </div>
          ) : (
            <div key={i} className="calendar-day empty" />
          )
        )}
      </div>
    </div>
  );
};

export default Calendar;