// Selecting the elements
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

// Game variables
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Winning combinations
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Initialize the game
function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
    updateStatus();
}

// Handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        updateStatus(`${currentPlayer} Wins!`);
        gameActive = false;
    } else if (board.every(cell => cell !== "")) {
        updateStatus("It's a Draw!");
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updateStatus();
    }
}

// Check for a win
function checkWin() {
    return winConditions.some(condition => {
        return condition.every(index => board[index] === currentPlayer);
    });
}

// Update the status text
function updateStatus(message) {
    statusText.textContent = message || `Player ${currentPlayer}'s Turn`;
}

// Reset the game
function resetGame() {
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    cells.forEach(cell => (cell.textContent = ""));
    updateStatus();
}

// Start the game
initializeGame();
