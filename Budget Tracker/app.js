// Get DOM elements
const totalIncomeDisplay = document.getElementById('totalIncome');
const totalExpenseDisplay = document.getElementById('totalExpense');
const remainingBalanceDisplay = document.getElementById('remainingBalance');
const balanceChart = document.getElementById('balanceChart');

// Chart.js: Create the chart
const ctx = balanceChart.getContext('2d');
const chart = new Chart(ctx, {
    type: 'pie', // Pie chart for income vs expenses
    data: {
        labels: ['Income', 'Expenses'],
        datasets: [{
            label: 'Expense vs Income',
            data: [0, 0], // Start with zero values
            backgroundColor: ['#4CAF50', '#FF5733'],
            borderWidth: 1
        }]
    }
});

// Function to update the summary and chart
function updateSummary(transactions) {
    let totalIncome = 0;
    let totalExpense = 0;

    // Calculate totals
    transactions.forEach(transaction => {
        if (transaction.type === 'income') {
            totalIncome += transaction.amount;
        } else if (transaction.type === 'expense') {
            totalExpense += transaction.amount;
        }
    });

    // Update the summary display
    totalIncomeDisplay.textContent = totalIncome.toFixed(2);
    totalExpenseDisplay.textContent = totalExpense.toFixed(2);
    const remainingBalance = totalIncome - totalExpense;
    remainingBalanceDisplay.textContent = remainingBalance.toFixed(2);

    // Update the chart with the new data
    chart.data.datasets[0].data = [totalIncome, totalExpense];
    chart.update();
}

// Load transactions from localStorage and update the summary
window.onload = function() {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    updateSummary(transactions);
};
