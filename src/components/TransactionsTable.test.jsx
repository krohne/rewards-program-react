import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionsTable from './TransactionsTable';

describe('TransactionsTable', () => {
  it('renders all transaction rows with correct data', () => {
    const transactions = [
      { id: 1, customer: 'Alice', date: '2025-03-15', amount: 120 },
      { id: 2, customer: 'Bob', date: '2025-04-10', amount: 80 },
    ];
    render(<TransactionsTable transactions={transactions} />);
    // Customer names
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    // Amounts with dollar sign
    expect(screen.getByText('$120')).toBeInTheDocument();
    expect(screen.getByText('$80')).toBeInTheDocument();
    // Reward points: 120 -> 90, 80 -> 30
    expect(screen.getByText('90')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    // Dates
    expect(screen.getByText('2025-03-15')).toBeInTheDocument();
    expect(screen.getByText('2025-04-10')).toBeInTheDocument();
  });

  it('renders empty state if no transactions', () => {
    render(<TransactionsTable transactions={[]} />);
    expect(screen.getByText(/no transactions/i)).toBeInTheDocument();
  });

  it('renders paginated transactions', () => {
    const transactions = [];
    for (let i = 0; i < 25; i++) {
      transactions.push({
        id: i + 1,
        customer: 'Customer' + i,
        date: '2025-03-15',
        amount: 100 + i,
      });
    }
    render(<TransactionsTable transactions={transactions} />);
    // Check that the pagination bar is present and correct
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeEnabled();
    expect(screen.getByText('Previous')).toBeDisabled();
  });
});
