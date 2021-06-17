const { Account } = require("./functions");

describe("the account class", () => {
  let account;
  beforeEach(() => {
    account = new Account();
  });

  it("deposit increases the bank balance", () => {
    account.deposit(200, "14/07/21");
    expect(account.getBankBalance()).toBe(700);
  });

  it("adds the transaction to the statement", () => {
    account.saveToStatement("14/01/2010", 100);
    expect(account.transactionsLog).toEqual([
      {
        date: "14/01/2010",
        amount: 100,
        balance: 500,
      },
    ]);
  });

  it("prints out the transactions in a list", () => {
    account.transactionsLog = [
      {
        date: new Date("01/14/2010"),
        amount: 100,
        balance: 500,
      },
      {
        date: new Date("01/15/2010"),
        amount: 200,
        balance: 700,
      },
    ];
    expect(account.printStatement()).toBe(
      ` Date || Amount || Balance\n 14/01/2010 || 100 || 500\n 15/01/2010 || 200 || 700`
    );
  });

  it("withdraws an amount from the bank balance", () => {
    account.withdraw(200, "14/01/2020");
    expect(account.getBankBalance()).toBe(300);
  });

  it("sorts the transactions into a chronological list based on date", () => {
    account.transactionsLog = [
      {
        date: new Date("01/14/2010"),
        amount: 100,
        balance: 500,
      },
      {
        date: new Date("06/17/2010"),
        amount: 200,
        balance: 700,
      },
      {
        date: new Date("03/15/2010"),
        amount: 200,
        balance: 700,
      },
    ];
    account.sortTransactionsLog();
    expect(account.printStatement()).toBe(
      ` Date || Amount || Balance\n 17/06/2010 || 200 || 700\n 15/03/2010 || 200 || 700\n 14/01/2010 || 100 || 500`
    );
  });
});

describe("user behaviour", () => {
  it("accepts withdrawals, deposits, and represents the correct the balance", () => {
    let account = new Account();
    account.deposit(500, new Date("01/20/2021"));
    account.deposit(1000, new Date("01/21/2021"));
    account.withdraw(800, new Date("01/30/2021"));
    expect(account.getBankBalance()).toBe(1200);
    account.sortTransactionsLog();
    expect(account.printStatement()).toBe(
      ` Date || Amount || Balance\n 30/01/2021 || -800 || 1200\n 21/01/2021 || 1000 || 2000\n 20/01/2021 || 500 || 1000`
    );
  });
});
