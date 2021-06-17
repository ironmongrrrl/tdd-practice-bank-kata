class Account {
  constructor() {
    this.bankBalance = 500;
    this.transactionsLog = [];
  }

  // would have a date interface to stop date being always passed into functions

  deposit = (deposit, date) => {
    this.bankBalance += deposit;
    this.saveToStatement(date, deposit);
  };

  withdraw = (amount, date) => {
    this.bankBalance -= amount;
    this.saveToStatement(date, -amount);
  };

  getBankBalance = () => {
    return this.bankBalance;
  };

  saveToStatement = (date, amount) => {
    this.transactionsLog.push({
      date: date,
      amount: amount,
      balance: this.bankBalance,
    });
  };

  sortTransactionsLog = () => {
    this.transactionsLog.sort((a, b) => b.date - a.date);
  };

  convertToLocaleDateString = (date) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  printStatement = () => {
    let statement = " Date || Amount || Balance";
    this.transactionsLog.forEach((log) => {
      const stringDate = this.convertToLocaleDateString(log.date);
      statement += `\n ${stringDate} || ${log.amount} || ${log.balance}`;
    });
    return statement;
  };
}

module.exports = {
  Account,
};
