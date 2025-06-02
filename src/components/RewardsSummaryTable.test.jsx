import React from 'react';
import { render, screen } from '@testing-library/react';
import RewardsSummaryTable from './RewardsSummaryTable';

describe('RewardsSummaryTable', () => {
  it('renders summary rows with correct customer, months, points, and spent', () => {
    const rewards = {
      Alice: {
        total: 120,
        months: { March: 90, April: 30 },
        spent: 200,
        spentMonths: { March: 120, April: 80 },
      },
      Bob: {
        total: 60,
        months: { May: 60 },
        spent: 100,
        spentMonths: { May: 100 },
      },
    };
    render(<RewardsSummaryTable rewards={rewards} />);
    // There are two rows for Alice (detail and total), so use getAllByText and check length
    expect(screen.getAllByText('Alice').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('Bob').length).toBeGreaterThanOrEqual(2);
    // Months
    expect(screen.getByText('March')).toBeInTheDocument();
    expect(screen.getByText('April')).toBeInTheDocument();
    expect(screen.getByText('May')).toBeInTheDocument();
    // Spent values (formatted as $)
    expect(screen.getAllByText('$120')[0]).toBeInTheDocument();
    expect(screen.getAllByText('$80')[0]).toBeInTheDocument();
    expect(screen.getAllByText('$100')[0]).toBeInTheDocument();
    // Points per month
    expect(screen.getByText('90')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getAllByText('60')[0]).toBeInTheDocument();
    // Total row values
    expect(screen.getAllByText('120')[0]).toBeInTheDocument(); // Alice total points
    expect(screen.getAllByText('$200')[0]).toBeInTheDocument(); // Alice total spent
    expect(screen.getAllByText('60')[0]).toBeInTheDocument(); // Bob total points
    expect(screen.getAllByText('$100')[1]).toBeInTheDocument(); // Bob total spent
  });

  it('renders empty state if no rewards', () => {
    render(<RewardsSummaryTable rewards={{}} />);
    expect(screen.getByText(/no reward summary available/i)).toBeInTheDocument();
  });

  it('renders paginated summary rows', () => {
    const rewards = {};
    for (let i = 0; i < 25; i++) {
      rewards['Customer' + i] = {
        total: 100,
        months: { March: 50, April: 50 },
        spent: 200,
        spentMonths: { March: 100, April: 100 },
      };
    }
    render(<RewardsSummaryTable rewards={rewards} />);
    // Check that the pagination bar is present and correct
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    // The react-paginate "Previous" and "Next" are <a> with aria-disabled, not disabled attribute
    const prevBtn = screen.getByText('Previous');
    expect(prevBtn).toHaveAttribute('aria-disabled', 'true');
    const nextBtn = screen.getByText('Next');
    expect(nextBtn).toHaveAttribute('aria-disabled', 'false');
  });
});
