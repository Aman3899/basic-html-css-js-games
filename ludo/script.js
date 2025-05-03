const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const startModal = document.getElementById('startModal');
const nameStep = document.getElementById('nameStep');
const modeStep = document.getElementById('modeStep');
const gameContainer = document.getElementById('gameContainer');
let board = [];
let players = ['red', 'green', 'blue', 'yellow'];
let currentPlayerIndex = 0;
let gameActive = false;
let gameMode = 'classic';
let playerName = '';
let tokens = { red: [0, 0, 0, 0], green: [0, 0, 0, 0], blue: [0, 0, 0, 0], yellow: [0, 0, 0, 0] };

const path = {
    red: [/* Define path indices */],
    green: [/* Define path indices */],
    blue: [/* Define path indices */],
    yellow: [/* Define path indices */]
    // Paths would need to be mapped based on a 15x15 grid Ludo board layout
};

// Simplified for brevity; actual paths would follow Ludo board design

function initBoard() {
    boardElement.innerHTML = '';
    board = Array(15).fill().map(() => Array(15).fill(''));
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            // Define safe zones, paths, and home areas (simplified)
            if ((i === 7 && j === 7) || (i === 0 && j === 0)) cell.classList.add('safe');
            boardElement.appendChild(cell);
        }
    }
    placeTokens();
}

function placeTokens() {
    // Place initial tokens (simplified)
    const tokenPositions = {
        red: [[1, 1], [1, 2], [2, 1], [2, 2]],
        green: [[1, 12], [1, 13], [2, 12], [2, 13]],
        blue: [[12, 1], [12, 2], [13, 1], [13, 2]],
        yellow: [[12, 12], [12, 13], [13, 12], [13, 13]]
    };
    players.forEach(player => {
        tokenPositions[player].forEach(([row, col], idx) => {
            const cell = boardElement.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            cell.innerText = `${player[0].toUpperCase()}${idx + 1}`;
            cell.classList.add('token', player);
        });
    });
}

boardElement.addEventListener('click', handleCellClick);

function handleCellClick(event) {
    if (!gameActive || currentPlayerIndex !== 0) return; // Human player only
    const cell = event.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    // Simplified move logic; actual logic would track token positions and dice rolls
    rollDiceAndMove();
}

function rollDiceAndMove() {
    const dice = Math.floor(Math.random() * 6) + 1;
    statusElement.innerText = `${playerName} rolled a ${dice}`;
    // Move logic based on mode (to be implemented)
    setTimeout(() => {
        if (currentPlayerIndex === 0 && gameActive) {
            currentPlayerIndex = 1;
            aiMove();
        }
    }, 1000);
}

function aiMove() {
    const dice = Math.floor(Math.random() * 6) + 1;
    statusElement.innerText = `AI (${players[currentPlayerIndex]}) rolled a ${dice}`;
    // AI move logic based on mode
    setTimeout(() => {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        if (currentPlayerIndex === 0) {
            statusElement.innerText = `${playerName}'s Turn`;
        } else {
            aiMove();
        }
    }, 1000);
}

function checkWinner() {
    // Implement win condition based on tokens reaching home
}

function nextStep() {
    const nameInput = document.getElementById('playerName').value.trim();
    if (nameInput) {
        playerName = nameInput;
        nameStep.style.display = 'none';
        modeStep.style.display = 'block';
    } else {
        alert('Please enter your name!');
    }
}

function startGame(mode) {
    gameMode = mode;
    gameActive = true;
    startModal.style.display = 'none';
    boardElement.style.display = 'grid';
    statusElement.innerText = `${playerName}'s Turn`;
    document.querySelector('.reset-btn').style.display = 'block';
    initBoard();
}

function resetGame() {
    initBoard();
    currentPlayerIndex = 0;
    gameActive = true;
    statusElement.innerText = `${playerName}'s Turn`;
    tokens = { red: [0, 0, 0, 0], green: [0, 0, 0, 0], blue: [0, 0, 0, 0], yellow: [0, 0, 0, 0] };
}

// Game Modes (to be fully implemented):
// - Classic: Standard Ludo rules
// - Speed: Faster movement, double dice
// - Team: 2v2 gameplay
// - Power-Up: Special abilities (e.g., teleport, shield)