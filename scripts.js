const board = document.getElementById('board');
const status = document.getElementById('status');
const restartButton = document.getElementById('restart');

const playerX = 'X';
const playerO = 'O';
let currentPlayer = playerX;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];


function initGame() {
    board.innerHTML = '';
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = playerX;
    status.textContent = `Player ${currentPlayer}'s turn`;

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (gameState[index] !== '' || checkWinner() || currentPlayer !== playerX) {
        return;
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    if (checkWinner()) {
        status.textContent = `Player ${currentPlayer} wins!`;
    } else if (gameState.every(cell => cell !== '')) {
        status.textContent = 'It\'s a draw!';
    } else {
        currentPlayer = playerO;
        status.textContent = `Player ${currentPlayer}'s turn`;
        setTimeout(aiMove, 500);
    }
}

function aiMove() {
    const availableCells = gameState.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
    if (availableCells.length === 0) return;

    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    gameState[randomIndex] = playerO;
    const cell = document.querySelector(`.cell[data-index="${randomIndex}"]`);
    cell.textContent = playerO;
    cell.classList.add(playerO.toLowerCase());

    if (checkWinner()) {
        status.textContent = `Player ${playerO} wins!`;
    } else if (gameState.every(cell => cell !== '')) {
        status.textContent = 'It\'s a draw!';
    } else {
        currentPlayer = playerX;
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    for (const pattern of winningPatterns) {
        const [a, b, c] = pattern;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
    }
    return false;
}

restartButton.addEventListener('click', initGame);

initGame();
