/*-------------------------------- Constants --------------------------------*/

const cardBacks = [
    'scream1', 'scream2', 'scream3', 'scream4',
    'scream5', 'scream6', 'scream7', 'scream8',
    'scream9', 'scream10', 'scream11', 'scream12'
];

/*---------------------------- Variables (state) ----------------------------*/

let flippedCards = [];
// let shuffledCards = [];
// let cardBack1, cardBack2;
let matchedPairs = 0;

/*------------------------ Cached Element References ------------------------*/

const cards = document.querySelectorAll('.card-inner');
const gameBoard = document.querySelector('.game');

/*-------------------------------- Functions --------------------------------*/

function flipCards(event) {
    const clickedCard = event.target.closest('.card-inner');
    console.log('Card clicked:', clickedCard);
    if (!clickedCard || clickedCard.classList.contains('flipped')) return;

        clickedCard.classList.add('flipped');
        flippedCards.push(clickedCard);

    if (flippedCards.length === 2){
        setTimeout(checkForMatch, 1000);
    }


}

function checkForMatch(){
    const [card1, card2] = flippedCards;
    const cardBack1 = card1.querySelector('.card-back').id;
    const cardBack2 = card2.querySelector('.card-back').id;

    if (cardBack1 === cardBack2) {
        console.log('Match');
        matchedPairs++;
        if (matchedPairs === cardBacks.length / 2){
            console.log('matched')
        }
    } else {
        console.log('No Match')
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }
    flippedCards = [];
}



/*----------------------------- Event Listeners -----------------------------*/


document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM content loaded');
    const cards = document.querySelectorAll('.card-inner');

    cards.forEach(card => {
        card.addEventListener('click', flipCards);
    });
});
