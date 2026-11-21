
# SpendWise - Interactive Budget Tracker

## Project Description

SpendWise is a personal budgeting application that helps users manage their money, record expenses and monitor their remaining balance.

## Improvements Made This Week

The application was upgraded with interactive JavaScript features. Users can now set a budget, add expenses, view expense records, delete expenses and see their financial balance update automatically.

## JavaScript Concepts Implemented

### 1. Conditional Statements

Conditional statements such as `if`, `else if` and `else` are used to validate user input and check whether the user is within or above their budget.

### 2. Arrays

An array called `expenses` stores multiple expense records. Each record contains an expense ID, name, category and amount.

### 3. Loops

A `for` loop processes expense records to calculate the total expenses and display all records in the table.

### 4. DOM Manipulation

JavaScript uses DOM methods such as `getElementById()`, `createElement()` and `textContent` to update dashboard information and display expense records directly on the webpage.

### 5. Event Listeners

Event listeners respond to user actions, including:
- Submitting the budget form.
- Adding a new expense.
- Clicking the delete button.

### 6. Connecting Everything Together

When a user adds or deletes an expense, JavaScript updates the expenses array, recalculates the totals and refreshes the dashboard.

## Challenges and Solutions

- Challenge: Managing multiple expense records.
  Solution: Used an array to store expense objects.

- Challenge: Updating the webpage automatically.
  Solution: Used DOM manipulation.

- Challenge: Checking whether spending exceeds the budget.
  Solution: Used conditional statements.

- Challenge: Responding to user actions.
  Solution: Added event listeners to forms and the expense table.

## Technologies Used

- HTML5
- CSS3
- JavaScript

## Project Files

- index.html - Dashboard structure.
- style.css - Dashboard styling.
- script.js - Interactive application logic.
- README.md - Project documentation.

## Author

Power Learn Project Web Development Student.
