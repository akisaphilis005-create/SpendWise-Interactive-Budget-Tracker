
// ========================================
// SPENDWISE - INTERACTIVE BUDGET TRACKER
// ========================================

// 1. Store application data using variables and an array
let totalBudget = 0;
let expenses = [];

let nextExpenseId = 1;

// Select HTML elements using the DOM
const budgetForm = document.getElementById("budget-form");
const budgetInput = document.getElementById("budget-input");

const expenseForm = document.getElementById("expense-form");
const expenseNameInput = document.getElementById("expense-name");
const expenseCategoryInput = document.getElementById("expense-category");
const expenseAmountInput = document.getElementById("expense-amount");

const totalBudgetDisplay = document.getElementById("total-budget");
const totalExpensesDisplay = document.getElementById("total-expenses");
const remainingBalanceDisplay = document.getElementById("remaining-balance");

const budgetMessage = document.getElementById("budget-message");
const formMessage = document.getElementById("form-message");
const expenseTableBody = document.getElementById("expense-table-body");

// Format amounts as Kenyan Shillings
function formatCurrency(amount) {
    return new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES"
    }).format(amount);
}

// 2. Calculate total expenses using a loop
function calculateTotalExpenses() {
    let total = 0;

    for (let i = 0; i < expenses.length; i++) {
        total += expenses[i].amount;
    }

    return total;
}

// 3. Calculate the remaining balance
function calculateRemainingBalance() {
    return totalBudget - calculateTotalExpenses();
}

// 4. Use conditionals to provide budget feedback
function updateBudgetMessage() {
    const remaining = calculateRemainingBalance();

    if (totalBudget <= 0) {
        budgetMessage.textContent = "Please set your budget to get started.";
        budgetMessage.className = "message";
    } else if (remaining < 0) {
        budgetMessage.textContent =
            "Warning! You have exceeded your budget by " +
            formatCurrency(Math.abs(remaining)) + ".";
        budgetMessage.className = "message error";
    } else if (remaining === 0) {
        budgetMessage.textContent =
            "You have used your entire budget.";
        budgetMessage.className = "message error";
    } else {
        budgetMessage.textContent =
            "Good job! You have " + formatCurrency(remaining) +
            " remaining.";
        budgetMessage.className = "message success";
    }
}

// 5. Display the dashboard information dynamically
function updateDashboard() {
    const totalExpenses = calculateTotalExpenses();
    const remainingBalance = calculateRemainingBalance();

    totalBudgetDisplay.textContent = formatCurrency(totalBudget);
    totalExpensesDisplay.textContent = formatCurrency(totalExpenses);
    remainingBalanceDisplay.textContent = formatCurrency(remainingBalance);

    updateBudgetMessage();
}

// 6. Display all expense records using a loop
function displayExpenses() {
    // Clear the previous table contents
    expenseTableBody.innerHTML = "";

    // Show a message if there are no expenses
    if (expenses.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 4;
        cell.textContent = "No expenses added yet.";

        row.appendChild(cell);
        expenseTableBody.appendChild(row);
        return;
    }

    // Loop through the expenses array
    for (let i = 0; i < expenses.length; i++) {
        const expense = expenses[i];

        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = expense.name;

        const categoryCell = document.createElement("td");
        categoryCell.textContent = expense.category;

        const amountCell = document.createElement("td");
        amountCell.textContent = formatCurrency(expense.amount);

        const actionCell = document.createElement("td");

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.type = "button";
        deleteButton.dataset.id = expense.id;
        deleteButton.setAttribute(
            "aria-label",
            "Delete " + expense.name
        );

        actionCell.appendChild(deleteButton);

        row.appendChild(nameCell);
        row.appendChild(categoryCell);
        row.appendChild(amountCell);
        row.appendChild(actionCell);

        expenseTableBody.appendChild(row);
    }
}

// 7. Handle budget form submission using an event listener
budgetForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const newBudget = Number(budgetInput.value);

    if (!Number.isFinite(newBudget) || newBudget <= 0) {
        budgetMessage.textContent =
            "Please enter a valid budget greater than zero.";
        budgetMessage.className = "message error";
        return;
    }

    totalBudget = newBudget;

    updateDashboard();

    budgetMessage.textContent =
        "Your budget has been saved successfully.";
    budgetMessage.className = "message success";

    budgetForm.reset();
});

// 8. Handle adding expenses using an event listener
expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = expenseNameInput.value.trim();
    const category = expenseCategoryInput.value;
    const amount = Number(expenseAmountInput.value);

    // Validate user input using conditionals
    if (name === "" || category === "") {
        formMessage.textContent =
            "Please enter an expense name and choose a category.";
        formMessage.className = "message error";
        return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
        formMessage.textContent =
            "Please enter a valid expense amount greater than zero.";
        formMessage.className = "message error";
        return;
    }

    // Store the new expense as an object inside the array
    const newExpense = {
        id: nextExpenseId,
        name: name,
        category: category,
        amount: amount
    };

    expenses.push(newExpense);
    nextExpenseId++;

    // Update the webpage
    displayExpenses();
    updateDashboard();

    formMessage.textContent =
        "Expense added successfully!";
    formMessage.className = "message success";

    expenseForm.reset();
});

// 9. Handle delete button clicks using event delegation
expenseTableBody.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-button")) {
        const expenseId = Number(event.target.dataset.id);

        // Find and remove the selected expense
        expenses = expenses.filter(function(expense) {
            return expense.id !== expenseId;
        });

        // Refresh the webpage
        displayExpenses();
        updateDashboard();

        formMessage.textContent =
            "Expense deleted successfully.";
        formMessage.className = "message success";
    }
});

// 10. Display the initial dashboard
displayExpenses();
updateDashboard();

console.log("SpendWise interactive application loaded successfully.");
