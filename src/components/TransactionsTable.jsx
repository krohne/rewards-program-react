// TransactionsTable.jsx
// Table component to display paginated list of transactions with reward points calculation
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { calculatePoints } from '../utils.js'

const PAGE_SIZE = 10 // Number of rows per page

export default function TransactionsTable({ transactions }) {
  // State for current page
  const [page, setPage] = useState(0)
  // Calculate total number of pages
  const pageCount = Math.ceil(transactions.length / PAGE_SIZE)
  // Slice transactions for current page
  const pagedTransactions = transactions.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
  // Show empty state if no transactions
  if (!transactions || transactions.length === 0) {
    return <div>No transactions available.</div>;
  }
  return (
    <>
      {/* Table of transactions with accessible caption and column headers */}
      <table
        className="table-centered"
        aria-labelledby="transactions-table-heading"
        aria-describedby="transactions-table-desc"
        tabIndex={0}
      >
        <caption id="transactions-table-desc" className="visually-hidden">
          Table of retail transactions. Use arrow keys to navigate rows and columns.
        </caption>
        <colgroup>
          <col className="th-left-10" />
          <col className="th-left-25" />
          <col className="th-left-20" />
          <col className="th-right-225" />
          <col className="th-right-225" />
        </colgroup>
        <thead>
          <tr>
            {/* Column headers for transaction fields */}
            <th scope="col" className="th-left-10">ID</th>
            <th scope="col" className="th-left-25">Customer</th>
            <th scope="col" className="th-left-20">Date</th>
            <th scope="col" className="th-right-225">Amount ($)</th>
            <th scope="col" className="th-right-225">Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {/* Render each transaction row for the current page */}
          {pagedTransactions.map(tx => (
            <tr key={tx.id}>
              <th scope="row" className="th-left-10">{tx.id}</th>
              <td className="th-left-25">{tx.customer}</td>
              <td className="th-left-20">{tx.date}</td>
              <td className="th-right-225">${tx.amount}</td>
              {/* Calculate reward points for each transaction */}
              <td className="th-right-225">{calculatePoints(tx.amount)}</td>
            </tr>
          ))}
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
TransactionsTable.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      customer: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
}
