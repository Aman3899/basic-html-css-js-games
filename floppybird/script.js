let gameStarted = false, gameOver = false, score = 0, highScore = 0;
let difficulty = 'medium', playerName = '';
let gravity, jumpForce = -12, gameSpeed;
let birdX = 100, birdY = 300, birdVelocity = 0, birdRotation = 0;
let pipes = [], gameLoop, pipeInterval;

const gameContainer = document.getElementById('game-container');
const bird = document.getElementById('bird');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const startModal = document.getElementById('start-modal');
const gameOverModal = document.getElementById('game-over-modal');
const finalScoreDisplay = document.getElementById('final-score');
const playerHighScoreDisplay = document.getElementById('player-high-score');
const playerNameInput = document.getElementById('player-name');
const loadingScreen = document.querySelector('.loading');

setTimeout(() => loadingScreen.classList.add('hidden'), 1500);

function init() {
    const ground = document.getElementById('ground');
    for (let i = 0; i < 40; i++) {
        const segment = document.createElement('div');
        segment.className = 'ground-segment';
        ground.appendChild(segment);
    }

    const grass = document.createElement('div');
    grass.className = 'grass';
    ground.appendChild(grass);
    for (let i = 0; i < 30; i++) {
        const tuft = document.createElement('div');
        tuft.className = 'grass-tuft';
        tuft.style.left = `${i * 15 + Math.random() * 5}px`;
        grass.appendChild(tuft);
    }

    for (let i = 0; i < 8; i++) createCloud();
    updateBirdPosition();

    const savedHighScore = localStorage.getItem('flappyBirdHighScore');
    if (savedHighScore) {
        highScore = parseInt(savedHighScore);
        highScoreDisplay.textContent = `High: ${highScore}`;
    }
    scoreDisplay.textContent = score;
}

function createCloud() {
    const cloud = document.createElement('div');
    cloud.className = 'cloud';
    const size = 60 + Math.random() * 120;
    const top = Math.random() * 250;
    let left = gameContainer.offsetWidth;
    cloud.style.width = `${size}px`;
    cloud.style.height = `${size / 2}px`;
    cloud.style.top = `${top}px`;
    cloud.style.left = `${left}px`;
    cloud.style.opacity = `${0.6 + Math.random() * 0.3}`;
    gameContainer.appendChild(cloud);

    function moveCloud() {
        if (!gameStarted || gameOver) return;
        left -= 0.8;
        cloud.style.left = `${left}px`;
        if (left < -size) {
            cloud.style.left = `${gameContainer.offsetWidth}px`;
            cloud.style.top = `${Math.random() * 250}px`;
        }
        requestAnimationFrame(moveCloud);
    }
    requestAnimationFrame(moveCloud);
}

function updateBirdPosition() {
    bird.style.left = `${birdX}px`;
    bird.style.top = `${birdY}px`;
    bird.style.transform = `rotate(${birdRotation}deg)`;
}

function createPipe() {
    const gapHeight = difficulty === 'easy' ? 220 : difficulty === 'medium' ? 160 : 130;
    const minHeight = 60;
    const maxHeight = gameContainer.offsetHeight - gapHeight - 100 - minHeight;
    const topHeight = minHeight + Math.random() * (maxHeight - minHeight);

    const pipeTop = document.createElement('div');
    pipeTop.className = 'pipe pipe-top';
    pipeTop.style.height = `${topHeight}px`;
    pipeTop.style.left = `${gameContainer.offsetWidth}px`;
    const topCap = document.createElement('div');
    topCap.className = 'pipe-cap';
    pipeTop.appendChild(topCap);

    const pipeBottom = document.createElement('div');
    pipeBottom.className = 'pipe pipe-bottom';
    pipeBottom.style.height = `${gameContainer.offsetHeight - topHeight - gapHeight - 100}px`;
    pipeBottom.style.top = `${topHeight + gapHeight}px`;
    pipeBottom.style.left = `${gameContainer.offsetWidth}px`;
    const bottomCap = document.createElement('div');
    bottomCap.className = 'pipe-cap';
    pipeBottom.appendChild(bottomCap);

    gameContainer.appendChild(pipeTop);
    gameContainer.appendChild(pipeBottom);

    pipes.push({ top: pipeTop, bottom: pipeBottom, x: gameContainer.offsetWidth, scored: false });
}

function movePipes() {
    pipes.forEach((pipe, index) => {
        pipe.x -= gameSpeed;
        pipe.top.style.left = `${pipe.x}px`;
        pipe.bottom.style.left = `${pipe.x}px`;

        if (pipe.x + 70 < 0) {
            pipe.top.remove();
            pipe.bottom.remove();
            pipes.splice(index, 1);
        }

        if (!pipe.scored && pipe.x + 70 < birdX) {
            score++;
            scoreDisplay.textContent = score;
            pipe.scored = true;
        }
    });
}

function checkCollision() {
    const birdRect = bird.getBoundingClientRect();
    const groundRect = document.getElementById('ground').getBoundingClientRect();

    if (birdRect.bottom >= groundRect.top || birdRect.top <= gameContainer.getBoundingClientRect().top) return true;

    for (const pipe of pipes) {
        const topPipeRect = pipe.top.getBoundingClientRect();
        const bottomPipeRect = pipe.bottom.getBoundingClientRect();

        if (
            (birdRect.right > topPipeRect.left && birdRect.left < topPipeRect.right &&
            (birdRect.top < topPipeRect.bottom || birdRect.bottom > bottomPipeRect.top))
        ) {
            return true;
        }
    }
    return false;
}

function gameUpdate() {
    if (!gameStarted || gameOver) return;

    birdVelocity += gravity;
    birdY += birdVelocity;
    birdRotation = Math.min(Math.max(birdVelocity * 3, -45), 90);

    updateBirdPosition();
    movePipes();

    if (checkCollision()) {
        endGame();
        return;
    }

    gameLoop = requestAnimationFrame(gameUpdate);
}

function startGame(mode) {
    playerName = playerNameInput.value.trim() || 'Player';
    if (!playerName) return alert('Please enter a name!');
    difficulty = mode;
    gameSpeed = mode === 'easy' ? 2 : mode === 'medium' ? 3.5 : 5;
    gravity = mode === 'easy' ? 0.4 : mode === 'medium' ? 0.5 : 0.65;

    startModal.classList.remove('active');
    gameStarted = true;
    birdY = 300;
    birdVelocity = 0;
    score = 0;
    scoreDisplay.textContent = score;
    pipes = [];

    pipeInterval = setInterval(createPipe, 1800);
    gameLoop = requestAnimationFrame(gameUpdate);
}

function endGame() {
    gameOver = true;
    clearInterval(pipeInterval);
    cancelAnimationFrame(gameLoop);

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('flappyBirdHighScore', highScore);
        highScoreDisplay.textContent = `High: ${highScore}`;
    }

    finalScoreDisplay.textContent = `Score: ${score}`;
    playerHighScoreDisplay.textContent = `${playerName}'s High Score: ${highScore}`;
    gameOverModal.classList.add('active');
}

function restartGame() {
    gameOverModal.classList.remove('active');
    gameOver = false;
    pipes.forEach(pipe => {
        pipe.top.remove();
        pipe.bottom.remove();
    });
    startGame(difficulty);
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && gameStarted && !gameOver) {
        birdVelocity = jumpForce;
    }
});

gameContainer.addEventListener('click', () => {
    if (gameStarted && !gameOver) {
        birdVelocity = jumpForce;
    }
});

init();