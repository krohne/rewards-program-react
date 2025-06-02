import { CUSTOMERS } from './constants.js'
import { Transaction } from './models.js'

function getRandomDate(startDate, endDate) {
    // Convert dates to milliseconds
    const startMillis = startDate.getTime();
    const endMillis = endDate.getTime();

    // Generate a random millisecond value within the range
    const randomMillis = startMillis + Math.random() * (endMillis - startMillis);

    // Convert back to a Date object
    return new Date(randomMillis);
}

/**
 * Simulates fetching a list of retail transactions asynchronously.
 * @async
 * @returns {Promise<Transaction[]>} Promise resolving to an array of Transaction objects
 * @throws {Error} If the fetch fails (simulated)
 */
export async function fetchTransactions() {
    const startDate = new Date(2025, 2, 1); // March 1, 2025
    const endDate = new Date(2025, 4, 31); // May 31, 2025
    await new Promise(resolve => setTimeout(resolve, 1200))
    // Simulate a random error (10% chance)
    if (Math.random() < 0.1) {
        throw new Error('Failed to fetch transactions. Please try again.')
    }
    const data = Array.from({ length: 100 }, (_, i) => {
        // Generate random dates in March, April, or May 2025
        // JS months: 0=Jan, 1=Feb, 2=Mar, 3=Apr, 4=May
        const date = getRandomDate(startDate, endDate).toISOString().slice(0, 10)
        const amount = Math.floor(Math.random() * 200 + 10)
        return new Transaction({
            id: i + 1,
            customer: CUSTOMERS[Math.floor(Math.random() * CUSTOMERS.length)],
            date,
            amount,
        })
    })
    return data
}

/**
 * Calculates reward points for a given transaction amount.
 * 2 points for every dollar over $100, plus 1 point for every dollar between $51 and $100.
 * @param {number} amount - The transaction amount in dollars.
 * @returns {number} The calculated reward points.
 */
export function calculatePoints(amount) {
    const amt = Math.floor(Number(amount));
    if (amt <= 50) return 0;
    if (amt <= 100) return amt - 50;
    // Over $100: 2 points per dollar over $100, plus 1 point per dollar between $51 and $100
    return (amt - 100) * 2 + 50;
}
