// RewardsSummaryTable.jsx
// Table component to display a paginated summary of reward points and spending per customer and month
import React from 'react';
import { useState } from 'react'
import PropTypes from 'prop-types'
import { MONTH_ORDER } from '../constants.js';
import '../App.css';

const PAGE_SIZE = 10 // Number of rows per page

export default function RewardsSummaryTable({ rewards }) {
  // Show empty state if no rewards data
  if (!rewards || Object.keys(rewards).length === 0) {
    return <div>No reward summary available.</div>;
  }
  // Sort and flatten rewards data for table rows
  const sortedRewards = Object.entries(rewards).sort(([a], [b]) => a.localeCompare(b));
  const rows = []
  sortedRewards.forEach(([customer, data]) => {
    Object.entries(data.months)
      .sort(([monthA], [monthB]) => (MONTH_ORDER[monthA] || 0) - (MONTH_ORDER[monthB] || 0))
      .forEach(([month, points]) => {
        rows.push({
          type: 'month',
          customer,
          month,
          spent: data.spentMonths[month],
          points,
        })
      })
    // Add a total row for each customer
    rows.push({
      type: 'total',
      customer,
      spent: data.spent,
      points: data.total,
    })
  })

  // State for current page
  const [page, setPage] = useState(0)
  // Calculate total number of pages
  const pageCount = Math.ceil(rows.length / PAGE_SIZE)
  // Slice rows for current page
  const pagedRows = rows.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  return (
    <>
      {/* Table of reward summary with accessible caption and column headers */}
      <h2 id="rewards-summary-heading">Reward Points Summary</h2>
      <table
        className="table-centered"
        aria-labelledby="rewards-summary-heading"
        aria-describedby="rewards-summary-desc"
        tabIndex={0}
      >
        <caption id="rewards-summary-desc" className="visually-hidden">
          Table summarizing total dollars spent and reward points earned per customer per month and in total. Use arrow keys to navigate rows and columns.
        </caption>
        <colgroup>
          <col style={{ width: '25%' }} />
          <col style={{ width: '25%' }} />
          <col style={{ width: '25%' }} />
          <col style={{ width: '25%' }} />
        </colgroup>
        <thead>
          <tr>
            {/* Column headers for summary fields */}
            <th scope="col" className="th-left w-25">Customer</th>
            <th scope="col" className="th-left w-25">Month</th>
            <th scope="col" className="th-right w-25">Total Spent ($)</th>
            <th scope="col" className="th-right w-25">
              Points
              {/* Info icon with tooltip for reward calculation explanation */}
              <span
                tabIndex={0}
                aria-label="Reward points are calculated as: 2 points for every dollar over $100, plus 1 point for every dollar between $51 and $100."
                title="2 points for every dollar over $100, plus 1 point for every dollar between $51 and $100."
                className="points-info"
                role="img"
                aria-describedby="points-tooltip-desc"
              >
                &#9432;
              </span>
              <span id="points-tooltip-desc" className="visually-hidden">
                Reward points are calculated as: 2 points for every dollar over $100, plus 1 point for every dollar between $51 and $100.
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Render each summary row for the current page */}
          {pagedRows.map((row, index) =>
            row.type === 'month' ? (
              <tr key={`${row.customer}-${row.month}-${row.spent}`}>
                <th scope="row" className="th-left w-25">{row.customer}</th>
                <td className="th-left w-25">{row.month}</td>
                <td className="th-right w-25">${row.spent}</td>
                <td className="th-right w-25">{row.points}</td>
              </tr>
            ) : (
              // Highlight total row for each customer
              <tr className="customer-total-row" key={`${row.customer}_summary`}>
                <th scope="row" className="th-left w-25">{row.customer}</th>
                <td className="th-left w-25">Total</td>
                <td className="th-right w-25">${row.spent}</td>
                <td className="th-right w-25">{row.points}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
      {/* Pagination controls with keyboard navigation */}
      <div className="pagination-bar">
        <button
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0}
          aria-label="Previous page"
          tabIndex={0}
          onKeyDown={e => {
            if ((e.key === 'ArrowLeft' || e.key === 'ArrowUp') && page > 0) {
              setPage(p => Math.max(0, p - 1));
              e.preventDefault();
              e.stopPropagation();
              return false;
            }
          }}
        >
          Previous
        </button>
        {/* Show current page and total pages */}
        <span>Page {page + 1} of {pageCount}</span>
        <button
          onClick={() => setPage(p => Math.min(pageCount - 1, p + 1))}
          disabled={page === pageCount - 1}
          aria-label="Next page"
          tabIndex={0}
          onKeyDown={e => {
            if ((e.key === 'ArrowRight' || e.key === 'ArrowDown') && page < pageCount - 1) {
              setPage(p => Math.min(pageCount - 1, p + 1));
              e.preventDefault();
              e.stopPropagation();
              return false;
            }
          }}
        >
          Next
        </button>
      </div>
    </>
  )
}

// PropTypes for validation
RewardsSummaryTable.propTypes = {
  rewards: PropTypes.objectOf(
    PropTypes.shape({
      total: PropTypes.number.isRequired,
      months: PropTypes.object.isRequired,
      spent: PropTypes.number.isRequired,
      spentMonths: PropTypes.object.isRequired,
    })
  ).isRequired,
}
