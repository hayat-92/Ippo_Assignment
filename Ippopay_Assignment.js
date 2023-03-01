// Define the Bank class
class Bank {
  constructor() {
    this.customers = {
      checking: [],
      savings: [],
    };
    this.loans = [];
  }

  // Method to create a new account for a customer
  createAccount(customer, accountType) {
    this.customers[accountType].push(customer);
    console.log(
      `${customer.name} has successfully opened a ${accountType} account.`
    );
  }

  // Method to apply for a loan
  applyForLoan(customer, loanAmount) {
    const income = customer.income;
    const expenses = customer.expenses;
    const existingLoanEmi = customer.existingLoanEmi || 0;
    const totalExpenses = expenses + existingLoanEmi;
    const expenditureIncomeRatio = totalExpenses / income;
    if (expenditureIncomeRatio > 0.36) {
      console.log(`${customer.name} is not eligible for the loan.`);
      this.loans.push({
        ...customer,
        loanAmount,
        loanApprovalStatus: "rejected",
      });
      return;
    }
    customer.loanAmount += loanAmount;
    this.loans.push({
      ...customer,
      loanAmount,
      loanApprovalStatus: "approved",
    });
    console.log(
      `${customer.name} has been approved for a loan of $${loanAmount}.`
    );
  }

  // Method to Pay Back loan
  payBackLoan(customer, amount) {
    if (customer.loanAmount >= amount) {
      customer.loanAmount -= amount;
      return amount;
    }
    return 0;
  }

  // Method to withdraw money from a customer's account
  withdrawMoney(customer, accountType, amount) {
    const index = this.customers[accountType].indexOf(customer);
    if (index === -1) {
      console.log(`${customer.name} does not have a ${accountType} account.`);
      return;
    }
    const balance = customer[accountType];
    if (balance < amount) {
      console.log(
        `Insufficient balance in ${customer.name}'s ${accountType} account.`
      );
      return;
    }
    customer[accountType] -= amount;
    console.log(
      `${customer.name} has withdrawn $${amount} from their ${accountType} account.`
    );
  }

  // Method to deposit money into a customer's account
  depositMoney(customer, accountType, amount) {
    const index = this.customers[accountType].indexOf(customer);
    if (index === -1) {
      console.log(`${customer.name} does not have a ${accountType} account.`);
      return;
    }
    customer[accountType] += amount;
    console.log(
      `${customer.name} has deposited $${amount} into their ${accountType} account.`
    );
  }

  // Method to get the number of customers who have opened a checking account
  getNumCheckingCustomers() {
    return this.customers.checking.length;
  }

  // Method to get the number of customers who have opened a savings account
  getNumSavingsCustomers() {
    return this.customers.savings.length;
  }

  // Method to get the best performing loans
  getBestLoans() {
    let loans = this.loans.filter((e) => e.loanApprovalStatus === "approved");
    return loans.sort((a, b) => b.loanAmount - a.loanAmount).slice(0, 5);
  }

  // Method to log the demographics of rejected loan applicants
  logRejectedLoanApplicants() {
    const rejectedLoans = this.loans.filter(
      (loan) => loan.loanApprovalStatus === "rejected"
    );
    const demographics = rejectedLoans.map((loan) => {
      return {
        name: loan.name,
        age: loan.age,
        gender: loan.gender,
        income: loan.income,
        expenses: loan.expenses,
        existingLoanEmi: loan.existingLoanEmi,
      };
    });
    console.log(demographics);
  }
}

// Define the Customer class
class Customer {
  constructor(name, age, gender, income, expenses, existingLoanEmi) {
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.income = income;
    this.expenses = expenses;
    this.existingLoanEmi = existingLoanEmi || 0;
    this.checking = 0;
    this.savings = 0;
    this.loanAmount = 0;
    this.loanApprovalStatus = "pending";
  }

  // Method to apply for a loan
  applyForLoan(bank, loanAmount) {
    bank.applyForLoan(this, loanAmount);
  }

  // Methid to pay back a loan
  payBackLoan(bank, loanAmount) {
    return bank.payBackLoan(this, loanAmount);
  }

  // Method to withdraw money from a customer's account
  withdrawMoney(bank, accountType, amount) {
    bank.withdrawMoney(this, accountType, amount);
  }

  // Method to deposit money into a customer's account
  depositMoney(bank, accountType, amount) {
    bank.depositMoney(this, accountType, amount);
  }
}

// Create a new bank instance
const bank = new Bank();

// Create some customers
const customer1 = new Customer("Faisal", 30, "male", 100000, 20000);
const customer2 = new Customer("Hayat", 25, "female", 40000, 15000);
const customer3 = new Customer("Hassan", 35, "male", 60000, 25000, 5000);

// Have the customers open accounts
bank.createAccount(customer1, "checking");
bank.createAccount(customer1, "savings");
bank.createAccount(customer2, "checking");
bank.createAccount(customer2, "savings");
bank.createAccount(customer3, "checking");
bank.createAccount(customer3, "savings");

// Have the customers deposit money into their accounts
customer1.depositMoney(bank, "checking", 10000);
customer1.depositMoney(bank, "savings", 5000);
customer2.depositMoney(bank, "checking", 8000);
customer2.depositMoney(bank, "savings", 6000);
customer3.depositMoney(bank, "checking", 12000);
customer3.depositMoney(bank, "savings", 10000);

// Have the customers apply for loans
customer1.applyForLoan(bank, 25000);
customer2.applyForLoan(bank, 30000);
customer3.applyForLoan(bank, 40000);

// Pay back the loan
const val = customer1.payBackLoan(bank, 5000);
console.log(`${customer1.name} has paid back $${val} amount of loan`);

// Have the customers withdraw money from their accounts
customer1.withdrawMoney(bank, "checking", 5000);
customer2.withdrawMoney(bank, "savings", 4000);
customer3.withdrawMoney(bank, "checking", 10000);

// Log the number of customers with checking and savings accounts
console.log(
  `Number of customers with checking accounts: ${bank.getNumCheckingCustomers()}`
);
console.log(
  `Number of customers with savings accounts: ${bank.getNumSavingsCustomers()}`
);

// Log the best performing loans
console.log("Best performing loans:");
console.log(bank.getBestLoans());

// Log the demographics of rejected loan applicants
console.log("Demographics of rejected loan applicants:");
bank.logRejectedLoanApplicants();
