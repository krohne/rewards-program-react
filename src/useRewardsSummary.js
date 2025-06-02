import { useMemo } from 'react'
import { RewardSummary } from './models.js'
import { calculatePoints } from './utils.js'

/**
 * Aggregates reward points and spending for all customers from a list of transactions.
 * @param {Array} transactions - Array of Transaction objects
 * @returns {Object.<string, RewardSummary>} Rewards summary keyed by customer name
 */
export function useRewardsSummary(transactions) {
  return useMemo(() => {
    const rewards = {}
    if (transactions) {
      transactions.forEach(tx => {
        const { customer, amount } = tx
        const points = calculatePoints(amount)
        // Defensive: always use Date object for date calculations
        const dateObj = typeof tx.date === 'string' ? new Date(tx.date) : tx.date;
        const month = dateObj.getMonth()
        if (!rewards[customer]) rewards[customer] = new RewardSummary()
        rewards[customer].addTransaction(month, amount, points)
      })
    }
    return rewards
  }, [transactions])
}
