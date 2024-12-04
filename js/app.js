// Although this is version 2 thats amended by chatgpt / the card backs still wont show. 

// ----------------------------- Constants -----------------------------
const cardBacks = [
    '../photos/scream1.png',
    '../photos/scream2.png',
    '../photos/scream3.png',
    '../photos/scream4.png',
    '../photos/scream5.png',
    '../photos/scream6.png',
];

// ----------------------------- Variables (state) -----------------------------

let shuffledCards = [...cardBacks, ...cardBacks]; // I googled this
let flippedCards = [];
let matches = 0;
let timerInterval;
const gameTime = 120;
let remainingTime = gameTime;

// ----------------------------- Functions -----------------------------

// Shuffle the cards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
} // I fixed this with chat gpt 


// I used chatgpt this entire thing as I orignally added HTML and it was just turned the image left and right so I tried to do it this way hoping it will turn

// Create card elements
function createCard(imageSrc) {
    const card = document.createElement('div');
    card.classList.add('card-inner');


    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    card.appendChild(cardFront);

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.style.backgroundImage = `url(${imageSrc})`;
    card.appendChild(cardBack);

    card.addEventListener('click', () => flipCard(card));

    return card;
}

// Flip cards:
function flipCard(card) {
    if (card.classList.contains('flipped') || flippedCards.length === 2) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// Check for a match
function checkMatch() {
    const [first, second] = flippedCards;
    const firstImage = first.querySelector('.card-back').style.backgroundImage;
    const secondImage = second.querySelector('.card-back').style.backgroundImage;

    if (firstImage === secondImage) {
        matches++;
        flippedCards = [];
        updateMatches();

        // Check for win condition
        if (matches === cardBacks.length) {
            endGame("Yey! You survived Ghostface!");
        }
    } else {
        setTimeout(() => {
            first.classList.remove('flipped');
            second.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// Update matche Numbers
function updateMatches() {
    const matchesDisplay = document.getElementById('matches');
    matchesDisplay.innerText = `Matches: ${matches}/${cardBacks.length}`;
}

// Start the game
function startGame() {
    matches = 0;
    remainingTime = gameTime;
    flippedCards = [];
    shuffledCards = [...cardBacks, ...cardBacks]; // I googled this to understand
    shuffle(shuffledCards);

    const gameContainer = document.querySelector('.game-container');
    gameContainer.innerHTML = ''; // I googled this to understand

    shuffledCards.forEach(imageSrc => {
        const card = createCard(imageSrc);
        gameContainer.appendChild(card);
    });

    document.getElementById('message').innerText = "Match all pairs to survive Ghostface!";
    document.getElementById('start-button').innerText = "Restart";
    updateMatches();
    startTimer();
}

// Start the timer
function startTimer() {
    const timerDisplay = document.getElementById('timer');
    timerDisplay.innerText = `Time: ${remainingTime}s`;

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        remainingTime--;
        timerDisplay.innerText = `Time: ${remainingTime}s`;

        if (remainingTime === 0) {
            endGame("Time's up! Ghostface killed you!");
        }
    }, 1000);  // I keep fixing this 1000 thing with chatgpt as I don't fully understand it
}

// End the game
function endGame(message) {
    clearInterval(timerInterval);
    document.getElementById('message').innerText = message;
    const cards = document.querySelectorAll('.card-inner');
    cards.forEach(card => card.removeEventListener('click', flipCard));
}

// ----------------------------- Event Listeners -----------------------------

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start-button').addEventListener('click', startGame);
});
