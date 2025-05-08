import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomeScreen from '../HomeScreen';
import '@testing-library/jest-dom';

describe('Feature: Home Screen Structure and Default View', () => {
  beforeEach(() => {
    render(<HomeScreen />);
  });

  test('The page displays a title "Home"', () => {
    expect(screen.getByRole('heading', { name: /home/i, level: 1 })).toBeInTheDocument();
  });

  test('The "Monthly Summary" section is shown by default', () => {
    expect(screen.getByRole('heading', { name: /monthly summary/i })).toBeInTheDocument();
    expect(screen.getByText(/monthly summary will be displayed here/i)).toBeInTheDocument();
  });

  const sections = [
    {
      button: /expense categories/i,
      heading: /expense categories/i,
    },
    {
      button: /recent transactions/i,
      heading: /recent transactions/i,
      content: /recent transactions will be displayed here/i,
    },
    {
      button: /calendar/i,
      heading: /calendar/i,
      content: /calendar will be displayed here/i,
    },
    {
      button: /quick actions/i,
      heading: /quick actions/i,
      content: /quick actions will be displayed here/i,
    },
    {
      button: /insights/i,
      heading: /insights/i,
      content: /insights and tips will be displayed here/i,
    },
  ];

  test.each(sections)(
    'When I click "$button", I see the $heading section',
    async ({ button, heading, content }) => {
      await userEvent.click(screen.getByRole('button', { name: button }));
      expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();

      if (content) {
        expect(screen.getByText(content)).toBeInTheDocument();
      } else {
        expect(screen.queryByText(/monthly summary will be displayed here/i)).not.toBeInTheDocument();
      }
      expect(screen.queryByText(/monthly summary will be displayed here/i)).not.toBeInTheDocument();
    }
  );
  test('The sidebar contains all sections', () => {
    sections.forEach(({ button }) => {
      expect(screen.getByRole('button', { name: button })).toBeInTheDocument();
    });
  });
  test('When I click "Monthly Summary", I see the Monthly Summary section', async () => {
    // First, click another section to hide Monthly Summary
    await userEvent.click(screen.getByRole('button', { name: /expense categories/i }));
    expect(screen.queryByText(/monthly summary will be displayed here/i)).not.toBeInTheDocument();
  
    // Now, click "Monthly Summary"
    await userEvent.click(screen.getByRole('button', { name: /monthly summary/i }));
    
    expect(screen.getByRole('heading', { name: /monthly summary/i })).toBeInTheDocument();
    expect(screen.getByText(/monthly summary will be displayed here/i)).toBeInTheDocument();
  });
});