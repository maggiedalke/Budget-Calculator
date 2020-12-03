// The purpose of the JavaScript file is to handle the Budget Calculator process
// Author Maggie Dalke

window.addEventListener('load', function () {
  // Dom Variables
  const addDescription = document.querySelector('.add__description');
  const addAmount = document.querySelector('.add__value');
  const addButton = document.querySelector('.add__btn');
  const budgetMonth = document.querySelector('.budget__title--month');

  // Functions
  // Setting the budget month and year in the DOM
  function setPageDate() {
    const todaysDate = new Date();
    const budgetDateString = todaysDate.toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });
    budgetMonth.innerHTML = budgetDateString;
  }
  setPageDate();

  // Setting date the transactions are entered.
  function transactionDate() {
    const todaysDate = new Date();
    const monthDayYear =
      todaysDate.toLocaleString('default', { month: 'short', day: 'numeric' }) +
      ', ' +
      todaysDate.getFullYear();
    return monthDayYear;
  }

  // unique id to add to each new instance.
  let idCounter = 0;

  class Transaction {
    constructor(description, amount) {
      this.description = description;
      this.amount = parseFloat(amount);
      this.date = transactionDate();
      this.id = idCounter++;
    }
  }

  class TransactionList {
    constructor() {
      this.incomeList = [];
      this.expenseList = [];
    }

    // Adding a new transaction to the incomeList array or expenseList array
    addNewTransaction() {
      const transaction = new Transaction(
        addDescription.value,
        addAmount.value
      );
      if (addAmount.value >= 0) {
        this.incomeList.push(transaction);
      } else {
        this.expenseList.push(transaction);
      }
      this.render();
    }

    // Remove a transaction from the incomeList array or expenseList array
    removeTransaction(id) {
      const transactionArr = this.incomeList.concat(this.expenseList);
      function findTransIndex(transaction) {
        return transaction.id === id;
      }

      const foundTrans = transactionArr.find(findTransIndex);
      if (foundTrans.amount >= 0) {
        const incomeIndex = this.incomeList.findIndex(findTransIndex);
        this.incomeList.splice(incomeIndex, 1);
      } else {
        const expenseIndex = this.expenseList.findIndex(findTransIndex);
        this.expenseList.splice(expenseIndex, 1);
      }
      this.render();
    }

    // Calculates the total of income.
    incomeTotal() {
      let incomeTotal = 0;
      this.incomeList.forEach((income) => {
        incomeTotal = incomeTotal + income.amount;
      });
      return incomeTotal;
    }

    // Calculates the total of expenses.
    expenseTotal() {
      let expenseTotal = 0;
      for (let i = 0; i <= this.expenseList.length - 1; i++) {
        const expense = this.expenseList[i];
        expenseTotal = expenseTotal + expense.amount;
      }
      return expenseTotal;
    }

    // Returns the incomeTotal minus expensesTotal
    grandTotal() {
      return this.incomeTotal() + this.expenseTotal();
    }

    // Updating the DOM with the new Budget total.
    renderBudgetTotal() {
      const currentBudget = document.querySelector('.budget__value');
      const grandTotal = this.grandTotal();
      const sign = grandTotal >= 0 ? '+' : '-';

      currentBudget.innerHTML = sign + ' $' + Math.abs(grandTotal).toFixed(2);
    }

    // Updating the DOM with the new Income total.
    renderIncomeTotal() {
      const currentIncome = document.querySelector('.budget__income--value');
      const incomeTotal = this.incomeTotal();
      const sign = incomeTotal >= 0 ? '+' : '';

      currentIncome.innerHTML = sign + ' $' + Math.abs(incomeTotal).toFixed(2);
    }

    // Updating the DOM with the new Expense total.
    renderExpenseTotal() {
      const currentExpense = document.querySelector('.budget__expenses--value');
      const incomeTotal = this.incomeTotal();
      const expenseTotal = this.expenseTotal();
      const sign = expenseTotal < 1 ? '-' : '';
      const expensePercent = document.querySelector(
        '.budget__expenses--percentage'
      );

      currentExpense.innerHTML =
        sign + ' $' + Math.abs(expenseTotal).toFixed(2);
      // Handling condition of NaN.
      if (expenseTotal < 0 && incomeTotal > 0) {
        expensePercent.innerHTML =
          parseInt((expenseTotal / incomeTotal) * 100) + '%';
      }
    }

    // Updating the DOM Income List section.
    renderIncomeList() {
      const incomeListEle = document.querySelector('.income__list');

      // Loops through and removes any children from the Income list DOM section
      while (incomeListEle.firstChild) {
        incomeListEle.removeChild(incomeListEle.lastChild);
      }

      this.incomeList.forEach((income) => {
        const htmlVariable = `
        <div class="item" data-transaction-id="${income.id}">
        <div class="item__description">${income.description} </div>
        <div class="right">
        <div class="item__value">+ $ ${income.amount}</div>
        <div class="item__delete">
              <button class="item__delete--btn" id="btn-${income.id}"><i class="ion-ios-close-outline"></i></button>
              </div>
          </div>
          <div class="item__date">${income.date}</div>
          </div>`;
        incomeListEle.insertAdjacentHTML('beforeend', htmlVariable);

        const deleteButton = document.getElementById(`btn-${income.id}`);
        deleteButton.addEventListener('click', (e) => {
          this.removeTransaction(income.id);
        });
      });
    }

    // Updating the DOM Expense List section.
    renderExpenseList() {
      const expenseListEle = document.querySelector('.expenses__list');
      const incomeTotal = this.incomeTotal();
      const expenseTotal = this.expenseTotal();

      // Loops through and removes any children from the Expense list DOM section
      while (expenseListEle.firstChild) {
        expenseListEle.removeChild(expenseListEle.lastChild);
      }

      this.expenseList.forEach((expense) => {
        let expensePercentage = 0;
        if (expenseTotal < 0 && incomeTotal > 0) {
          expensePercentage = parseInt((expense.amount / incomeTotal) * 100);
        }

        const htmlVariable = `
        <div class="item" data-transaction-id="${expense.id}">
        <div class="item__description">${expense.description} </div>
        <div class="right">
        <div class="item__value">- $ ${Math.abs(expense.amount)}</div>
        <div class="item__percentage">${expensePercentage}%</div>
        <div class="item__delete">
        <button class="item__delete--btn" id="btn-${
          expense.id
        }"><i class="ion-ios-close-outline"></i></button>
              </div>
          </div>
          <div class="item__date">${expense.date}</div>
          </div>`;
        expenseListEle.insertAdjacentHTML('beforeend', htmlVariable);

        const deleteButton = document.getElementById(`btn-${expense.id}`);
        deleteButton.addEventListener('click', (e) => {
          this.removeTransaction(expense.id);
        });
      });
    }

    // Calls all of the render methods.
    render() {
      this.renderBudgetTotal();
      this.renderIncomeTotal();
      this.renderExpenseTotal();
      this.renderIncomeList();
      this.renderExpenseList();
    }
  }

  // New Instance of Transaction
  let newTranList = new TransactionList();
  newTranList.render();

  // Event Listeners

  /* Event Listener on the check/submit button
   * Will not accept an empty values
   * Resets the values of description and value to empty an empty string.
   */
  addButton.addEventListener('click', (e) => {
    if (addDescription.value === '' || addAmount.value === '') {
      alert('Error - Need more info!');
    } else {
      newTranList.addNewTransaction();
      addDescription.value = '';
      addAmount.value = '';
    }
  });
});
