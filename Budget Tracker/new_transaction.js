// Get DOM elements
const transactionForm = document.getElementById('transactionForm');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');

// Function to handle form submission
transactionForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeInput.value;

    // Validation for empty or invalid input
    if (!description || isNaN(amount) || amount <= 0) {
        alert("Please enter valid details.");
        return;
    }

    // Get existing transactions from localStorage
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    // Create new transaction object
    const transaction = {
        description,
        amount,
        type,
        date: new Date().toLocaleString()  // Record the date when the transaction was added
    };

    // Add the new transaction to the array
    transactions.push(transaction);

    // Save the updated transactions array back to localStorage
    localStorage.setItem('transactions', JSON.stringify(transactions));

    // Clear form fields
    descriptionInput.value = '';
    amountInput.value = '';
    typeInput.value = 'income';

    // Redirect back to the main page (index.html)
    window.location.href = 'index.html';
});
