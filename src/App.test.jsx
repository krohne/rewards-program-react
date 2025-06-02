import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App.jsx';

// Mock fetchTransactions to resolve instantly with sample data
jest.mock('./utils.js', () => ({
  ...jest.requireActual('./utils.js'),
  fetchTransactions: jest.fn(() => Promise.resolve([
    { id: 1, customer: 'Alice', date: '2025-03-15', amount: 120 },
    { id: 2, customer: 'Bob', date: '2025-04-10', amount: 80 },
  ])),
}));

describe('App', () => {
  it('collapsible transactions section is collapsed by default and toggles open/closed', async () => {
    render(<App />);
    // Wait for the app to finish rendering
    await screen.findByText(/reward points summary/i);
    // Collapsed by default
    const section = await screen.findByLabelText(/retail transactions/i, { selector: 'section' });
    expect(section.hasAttribute('hidden')).toBe(true);
    // Toggle open
    const toggleBtn = await screen.findByRole('button', { name: /show retail transactions/i });
    fireEvent.click(toggleBtn);
    expect(section.hasAttribute('hidden')).toBe(false);
    // Toggle closed
    fireEvent.click(toggleBtn);
    expect(section.hasAttribute('hidden')).toBe(true);
  });

  it('shows descriptive empty state if no transactions', async () => {
    // Patch fetchTransactions to return []
    const { fetchTransactions } = require('./utils.js');
    fetchTransactions.mockResolvedValueOnce([]);
    render(<App />);
    // Open the section
    const toggleBtn = await screen.findByRole('button', { name: /show retail transactions/i });
    fireEvent.click(toggleBtn);
    expect(await screen.findByText(/no transactions available/i)).toBeInTheDocument();
  });
});
