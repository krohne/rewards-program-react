// Transaction model
/**
 * Represents a retail transaction.
 * @class
 * @property {number} id - Unique transaction ID
 * @property {string} customer - Customer name
 * @property {string} date - ISO date string (YYYY-MM-DD)
 * @property {number} amount - Amount spent in dollars
 */
export class Transaction {
    constructor({ id, customer, date, amount }) {
        this.id = id;
        this.customer = customer;
        this.date = date;
        this.amount = amount;
    }
    /**
     * Returns the month name (e.g., 'March') for this transaction's date.
     * @returns {string}
     */
    getMonth() {
        const d = new Date(this.date);
        return d.toLocaleString('default', { month: 'long' });
    }
}

/**
 * Aggregates reward points and spending for a customer.
 * @class
 * @property {number} total - Total reward points
 * @property {Object.<string, number>} months - Points per month
 * @property {number} spent - Total dollars spent
 * @property {Object.<string, number>} spentMonths - Dollars spent per month
 */
export class RewardSummary {
  constructor() {
    this.total = 0
    this.months = {} // { [month]: points }
    this.spent = 0
    this.spentMonths = {} // { [month]: amount }
  }

  /**
   * Add a transaction's points and amount to the summary.
   * @param {string} month - Month of the transaction
   * @param {number} amount - Amount spent
   * @param {number} points - Points earned
   */
  addTransaction(month, amount, points) {
    this.months[month] ??= 0
    this.spentMonths[month] ??= 0
    this.months[month] += points
    this.spentMonths[month] += amount
    this.total += points
    this.spent += amount
  }
}
