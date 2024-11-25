/*-------------------------------- Constants --------------------------------*/
const cardBacks = [
    '../photos/scream1.png',
    '../photos/scream2.png',
    '../photos/scream3.png',
    '../photos/scream4.png',
    '../photos/scream5.png',
    '../photos/scream6.png',
    '../photos/scream7.png',
    '../photos/scream8.png',
    '../photos/scream9.png',
    '../photos/scream10.png',
    '../photos/scream11.png',
    '../photos/scream12.png'
];

/*---------------------------- Variables (state) ----------------------------*/

let flippedCards = [];
let shuffledCards = [];

/*------------------------ Cached Element References ------------------------*/

const cards = document.querySelectorAll('.card-inner');

/*-------------------------------- Functions --------------------------------*/

function flipCards(event) {
    const clickedCard = event.target.closest('.card-inner');
    console.log('Card clicked:', clickedCard);

    if (!clickedCard.classList.contains('flipped')) {
        clickedCard.classList.add('flipped');
        flippedCards.push(clickedCard);
        // if (flippedCards.length === 2) {
        //     checkForMatch();
    }
}


/*----------------------------- Event Listeners -----------------------------*/


document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM content loaded');
    const cards = document.querySelectorAll('.card-inner');

    cards.forEach(card => {
        card.addEventListener('click', flipCards);
    });
});
