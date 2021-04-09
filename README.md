# Budget-Calculator
**HOSTED:** https://maggie-budget-calculator.netlify.app/

This repo is a Budget Calculator where the user can enter and keep track of their Income, Expenses and Total Current Budget. 

## Development Process

I set up 2 classes: 

### TransactionList class:
The transactionList class tracks all of the individual transactions.
Some methods included:

**addNewTransaction()** <br>
A method that will accept some parameters and create a new transaction, insert it into the appropriate list and perform any additional updates required.

**removeTransaction()** <br> 
A method that will accept some paramters and remove an existing transaction object from the appropriate list of transactions based on it's unique identifier and will perform any additional updates required.

### Transaction class: 
This the class used to represent each individual transaction. 

### Funtionality

- Users are able to submit an amount and a description in the appropriate fields
- The amount that is submitted should accept a positive or negative value. If the amount is positive it is an income, while if it is negative, it is a expense.
- The description and amount cannot be empty, if it is, it must not attempt to create a new Transaction
- If the form submission is successful create a new line in either the income - in the expense or the income column.
- Once the form is submitted, you should create a new transaction object and add it to the transactionList. Update the UI, clear the description and value inputs and be prepared for more submissions.
- Your new transaction should be placed in the appropriate column, including a plus sign (+) if the transaction is in the income column, and a minus sign (-) if it is placed in the expense column.
- All the values in each of the 2 columns (income and expenses) should be added together and displayed at the top of the screen, in separate elements, as you can see from the example, as well as a singular grand total and include a + or - sign, depending on whether or not is positive or negative.
- You should be able to remove an individual expense or individual income line. Your totals should adjust immediately after removing these. This is where you ID's will come in handy. Take a look at data-attributes in case you need a refresher.
- Each expense item should show it's percentage relative to the total income. For example, if your expense is $10 and your total income so far is $100, then you should include 10% beside it.
- Add this Month's date to the top of the page (using JavaScript) as well as to each income and expense item. If you need a little refresher, you can take a look into the documentation Date Object.
- Be sure to use correct formatting for currency, the amount rounded to 2 decimal places, including a dollar sign ($). All + and - signs are located to the left of the currency sign.

## How to use
There is an *"Add description* text box where the user must enter a description of the income or expense that they are entering.
The user will enter the amount in the *"Value"* input. If it is a **positive** number, it will be added to the **Income**; if it is a **negative** number, it will be added to the **Expense**.
The app will use the data to adjust the **income**, **expenses**, and **total monthly budget**.

