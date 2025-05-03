const gameContainer = document.getElementById('game-container');
const hangmanSvg = document.querySelector('.hangman-parts');
const wordDisplay = document.getElementById('word-display');
const keyboard = document.getElementById('keyboard');
const guessesLeftDisplay = document.getElementById('guesses-left');
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('start-btn');
const resultModal = document.getElementById('result-modal');
const resultTitle = document.getElementById('result-title');
const resultWord = document.getElementById('result-word');
const resultScore = document.getElementById('result-score');
const loadingScreen = document.querySelector('.loading');

// Static set of 100 words
const words = [
    "apple", "banana", "cherry", "dragon", "elephant", "flamingo", "giraffe", "hurricane", "igloo", "jungle",
    "kangaroo", "lemon", "mango", "ninja", "orange", "penguin", "quartz", "rainbow", "sunset", "tiger",
    "umbrella", "volcano", "waterfall", "xylophone", "yogurt", "zebra", "butterfly", "cactus", "dolphin", "eagle",
    "forest", "galaxy", "horizon", "island", "jellyfish", "koala", "lotus", "mountain", "nebula", "ocean",
    "parrot", "quail", "river", "starfish", "tornado", "unicorn", "vulture", "whale", "xenon", "yak",
    "zombie", "avocado", "bison", "coral", "desert", "emerald", "falcon", "glacier", "hyena", "indigo",
    "jackal", "kiwi", "lava", "meteor", "nomad", "oasis", "peacock", "quest", "reef", "savanna",
    "thunder", "utopia", "viper", "willow", "xerus", "yacht", "zenith", "amber", "blizzard", "cobra",
    "dune", "echo", "fossil", "goblin", "harbor", "ivory", "jasper", "kestrel", "lunar", "mirage",
    "nimbus", "opal", "prairie", "raven", "sphinx", "taiga", "vortex", "wisp", "yeti", "zephyr"
];

let currentWord = '', guessedLetters = [], guessesLeft = 6, score = 0, gameOver = false;

setTimeout(() => loadingScreen.classList.add('hidden'), 1500);

function startGame() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    guessesLeft = 6;
    gameOver = false;
    guessesLeftDisplay.textContent = guessesLeft;
    scoreDisplay.textContent = score;
    startBtn.textContent = 'Restart';
    resultModal.classList.remove('active');
    updateWordDisplay();
    createKeyboard();
    resetHangman();
}

function updateWordDisplay() {
    wordDisplay.textContent = currentWord.split('').map(letter => 
        guessedLetters.includes(letter) ? letter : '_'
    ).join(' ');
}

function createKeyboard() {
    keyboard.innerHTML = '';
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    alphabet.forEach(letter => {
        const btn = document.createElement('button');
        btn.className = 'key-btn';
        btn.textContent = letter;
        btn.dataset.letter = letter; // Add data-letter attribute for keydown event
        btn.addEventListener('click', () => guessLetter(letter, btn));
        keyboard.appendChild(btn);
    });
}

function guessLetter(letter, btn) {
    if (gameOver || guessedLetters.includes(letter)) return;

    guessedLetters.push(letter);
    btn.disabled = true;

    if (currentWord.includes(letter)) {
        btn.classList.add('correct');
        updateWordDisplay();
        if (!wordDisplay.textContent.includes('_')) {
            score += guessesLeft * 10; // Bonus points for remaining guesses
            endGame(true);
        }
    } else {
        btn.classList.add('incorrect');
        guessesLeft--;
        guessesLeftDisplay.textContent = guessesLeft;
        updateHangman();
        if (guessesLeft === 0) {
            endGame(false); // Explicitly end the game when guesses hit 0
        }
    }
}

function updateHangman() {
    const parts = hangmanSvg.children;
    parts[4 + (6 - guessesLeft)].classList.remove('hidden'); // Show parts progressively
}

function resetHangman() {
    const parts = hangmanSvg.children;
    for (let i = 4; i < parts.length; i++) {
        parts[i].classList.add('hidden');
    }
}

function endGame(won) {
    gameOver = true;
    resultTitle.textContent = won ? 'You Won!' : 'Game Over!';
    resultWord.textContent = `Word: ${currentWord}`;
    resultScore.textContent = `Score: ${score}`;
    resultModal.classList.add('active');
    keyboard.querySelectorAll('.key-btn').forEach(btn => btn.disabled = true);
}

function retryGame() {
    resultModal.classList.remove('active');
    startGame();
}

function revealWord() {
    resultModal.classList.remove('active');
    wordDisplay.textContent = currentWord.split('').join(' ');
    startBtn.textContent = 'Start Game';
    keyboard.querySelectorAll('.key-btn').forEach(btn => btn.disabled = true);
    gameOver = true; // Ensure game remains ended after revealing
}

document.addEventListener('keydown', (e) => {
    if (gameOver || !/[a-z]/.test(e.key)) return;
    const letter = e.key.toLowerCase();
    const btn = keyboard.querySelector(`.key-btn:not(:disabled)[data-letter="${letter}"]`);
    if (btn) {
        guessLetter(letter, btn);
    }
});

startBtn.addEventListener('click', startGame);

// Initial setup (removed unnecessary line since keyboard is created in startGame)
startGame(); // Start the game immediately on load