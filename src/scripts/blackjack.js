import { Card } from "./models/card";

// Code goes here

let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two'];

let textArea = document.getElementById('text-area');
let newGameButton = document.getElementById('new-game-button');
let hitButton = document.getElementById('hit-button');
let stayButton = document.getElementById('stay-button');

// Game variables
let gameStarted = false;
let gameOver = false;
let playerWon = false;
let dealerCards = [];
let playerCards = [];
let dealerScore = 0;
let playerScore = 0;
let deck = [];

// When game is not started, do not display other buttons
hitButton.style.display = 'none';
stayButton.style.display = 'none';
showStatus();

// New game handler
newGameButton.addEventListener('click', function() {
  gameStarted = true;
  gameOver = false;
  playerWon = false;

  deck = createDeck();
  shuffleDeck(deck);
  playerCards = [nextCard(deck), nextCard(deck)];
  dealerCards = [nextCard(deck), nextCard(deck)];

  newGameButton.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  showStatus();
});

// Hit button handler
hitButton.addEventListener('click', function() {
  playerCards.push( nextCard(deck) );
  checkForEndgame();
  showStatus();
});

// Stay button handler
stayButton.addEventListener('click', function() {
  gameOver = true;
  dealerPlays();
  checkForEndgame();
  showStatus();
});

function dealerPlays(){
  while (playerScore <= 21 && dealerScore < playerScore && dealerScore <= 21) {
    dealerCards.push( nextCard(deck) );
    updateScores();
  }
}

function checkForEndgame() {
  updateScores();
  if (gameOver) {
    dealerPlays();
  }

  if (playerScore > 21) {
    playerWon = false;
    gameOver = true;
  } else if (dealerScore > 21) {
    playerWon = true;
    gameOver = true;
  } else if (gameOver) {
    if (playerScore >= dealerScore) {
      playerWon = true;
    }
  }
}

/**
 * Create a deck of Card objects.
 */
function createDeck() {
  let deck = [];

  for (let i=0; i < suits.length; i++) {
    for (let j=0; j < values.length; j++) {
      // Card object
      let card = new Card(values[j], suits[i]);
      deck.push(card);
    }
  }
  
  return deck;
}

/**
 * Update the score with the current dealt cards.
 */
function updateScores() {
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

/**
 * Get the total score for the current list of Card objects.
 * 
 * @param {object} cards: list of Card objects.
 */
function getScore(cards) {
  let sum = 0;
  let hasAce = false;

  for (let i = 0; i < cards.length; i++) {
    sum += cards[i].score();
    if (cards[i].value === 'Ace') {
      hasAce = true;
    }
  }

  if (hasAce && sum + 10 <= 21) {
    sum += 10;
  }

  return sum;
}

/**
 * Shuffle the given deck of Card objects.
 * Fisher-Yates shuffle. 
 * @param {object} deck 
 */
function shuffleDeck(deck) {
  for (let i=0; i < (deck.length-2); i++) {
    // generate random number between i and deck.length
    let range = deck.length - i;
    let pick = i + Math.trunc(Math.random() * range);

    // swap the current one and the random pick
    let temp = deck[i];
    deck[i] = deck[pick];
    deck[pick] = temp;
  }
}

function nextCard(deck) {
  return deck.shift();
}

function showStatus() {
  if (!gameStarted) {
    textArea.innerText = 'Welcome to Blackjack!';
    return;
  } 

  updateScores();

  textArea.innerText = '\n';

  textArea.innerText += 'Player has \n';
  for (let i = 0; i < playerCards.length; i++) {
    textArea.innerText += playerCards[i].getCardString() + '\n';
  }
  textArea.innerText += `The score is ${playerScore}.\n\n\n`;

  textArea.innerText += 'Dealer has \n';
  for (let i = 0; i < dealerCards.length; i++) {
    textArea.innerText += dealerCards[i].getCardString() + '\n';
  }
  textArea.innerText += `The score is ${dealerScore}.\n`;

  if (gameOver) {
    if (playerWon) {
      textArea.innerText += "\n\nYOU WIN!!";
    } else {
      textArea.innerText += "\n\nDEALER WINS";
    }

    newGameButton.style.display = 'inline';
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
  }
}
