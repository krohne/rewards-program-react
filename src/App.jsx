import React from 'react'
import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import TransactionsTable from './components/TransactionsTable.jsx'
import RewardsSummaryTable from './components/RewardsSummaryTable.jsx'
import { fetchTransactions } from './utils.js'
import { useRewardsSummary } from './useRewardsSummary.js'
import './App.css'

function App() {
  const [transactions, setTransactions] = useState([]) // Changed from null to []
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [transactionsCollapsed, setTransactionsCollapsed] = useState(true)

  const loadTransactions = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchTransactions()
      setTransactions(data)
    } catch (err) {
      setError(err.message || 'An error occurred while fetching transactions.')
      setTransactions(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTransactions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const rewards = useRewardsSummary(transactions)

  const handleRetry = () => {
    setError(null)
    setLoading(true)
    setTransactions(null)
    loadTransactions()
  }

  return (
    <>
      <Header />
      <h1 style={{ margin: '0.5em 0 0.25em', fontSize: '2.2em', fontWeight: 700 }}>
        Rewards Program Demo
      </h1>
      <h2 style={{ margin: '0.5em 0 0.25em', fontSize: '1.3em', fontWeight: 500, color: '#535bf2' }}>
        Homework Assignment
      </h2>
      {error && (
        <div role="alert" style={{ color: '#b00020', background: '#fff0f0', padding: '1em', margin: '1em auto', maxWidth: 500, borderRadius: 8 }}>
          <strong>Error:</strong> {error}
          <div style={{ marginTop: '1em' }}>
            <button onClick={handleRetry} style={{ padding: '0.5em 1.5em', fontWeight: 600, background: '#646cff', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
              Retry
            </button>
          </div>
        </div>
      )}
      {loading && !error ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '2em 0' }}>
          <div className="spinner" aria-label="Loading" role="status" />
          <p aria-live="polite" style={{ marginTop: '1em' }}>Loading transactions...</p>
        </div>
      ) : (
        <>
          {!loading && !error && <RewardsSummaryTable rewards={rewards} />}
          <div style={{ marginTop: '3em' }}>
            <button
              aria-expanded={!transactionsCollapsed}
              aria-controls="transactions-table-section"
              onClick={() => setTransactionsCollapsed((c) => !c)}
              style={{
                padding: '0.5em 1.5em',
                fontWeight: 600,
                background: '#646cff',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                marginBottom: '1em',
                outline: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5em',
              }}
              id="transactions-toggle-btn"
            >
              <span style={{ display: 'inline-block', transition: 'transform 0.2s', transform: transactionsCollapsed ? 'rotate(0deg)' : 'rotate(90deg)' }} aria-hidden="true">▶</span>
              {transactionsCollapsed ? 'Show' : 'Hide'} Retail Transactions
            </button>
            <section
              id="transactions-table-section"
              aria-labelledby="transactions-toggle-btn"
              aria-label="Retail Transactions"
              hidden={transactionsCollapsed}
              aria-live="polite"
            >
              <h2 id="transactions-table-heading">Retail Transactions (Last 3 Months)</h2>
              {Array.isArray(transactions) && !transactionsCollapsed && transactions.length > 0 && (
                <TransactionsTable transactions={transactions} />
              )}
              {Array.isArray(transactions) && !transactionsCollapsed && transactions.length === 0 && (
                <div>No transactions available.</div>
              )}
            </section>
          </div>
        </>
      )}
    </>
  )
}

export default App
