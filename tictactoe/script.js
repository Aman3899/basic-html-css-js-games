const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const startModal = document.getElementById('startModal');
const nameStep = document.getElementById('nameStep');
const difficultyStep = document.getElementById('difficultyStep');
const gameContainer = document.getElementById('gameContainer');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let difficulty = 'easy';
let playerName = '';

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
];

boardElement.addEventListener('click', handleCellClick);

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedCellIndex] !== '' || !gameActive) return;

    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());
    checkResult();
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusElement.innerText = `${playerName || 'Player'} (${currentPlayer}) Wins!`;
        gameActive = false;
        document.querySelector('.reset-btn').style.display = 'block';
        return;
    }

    if (!board.includes('')) {
        statusElement.innerText = 'Draw!';
        gameActive = false;
        document.querySelector('.reset-btn').style.display = 'block';
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.innerText = `${playerName || 'Player'}'s Turn (${currentPlayer})`;
    if (currentPlayer === 'O') {
        setTimeout(aiMove, 1000); // 1000ms delay for AI move
    }
}

function aiMove() {
    let availableCells = board.map((cell, index) => (cell === '' ? index : null)).filter(val => val !== null);
    let move;
    
    if (difficulty === 'easy') {
        move = availableCells[Math.floor(Math.random() * availableCells.length)];
    } else if (difficulty === 'medium') {
        move = findBestMove(false) || availableCells[Math.floor(Math.random() * availableCells.length)];
    } else {
        move = findBestMove(true);
    }

    board[move] = 'O';
    const cell = document.querySelector(`[data-index='${move}']`);
    cell.innerText = 'O';
    cell.classList.add('o');
    checkResult();
}

function nextStep() {
    const nameInput = document.getElementById('playerName').value.trim();
    if (nameInput) {
        playerName = nameInput;
        nameStep.style.display = 'none';
        difficultyStep.style.display = 'block';
    } else {
        alert('Please enter your name!');
    }
}

function startGame(level) {
    difficulty = level;
    startModal.style.display = 'none';
    boardElement.style.display = 'grid';
    statusElement.innerText = `${playerName}'s Turn (X)`;
    gameContainer.querySelector('.title').style.display = 'block';
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusElement.innerText = `${playerName}'s Turn (X)`;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('x', 'o');
    });
    document.querySelector('.reset-btn').style.display = 'none';
}

// Minimax and helper functions remain the same
function findBestMove(isHard) {
    let bestScore = -Infinity;
    let move = null;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            let score = minimax(board, 0, false, isHard);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

function minimax(board, depth, isMaximizing, isHard) {
    let scores = { X: -10, O: 10, draw: 0 };
    let result = checkWinner();
    if (result !== null) return scores[result];

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false, isHard);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true, isHard);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkWinner() {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes('') ? null : 'draw';
}