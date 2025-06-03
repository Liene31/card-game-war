const cards = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "JACK",
  "QUEEN",
  "KING",
  "ACE",
];
const gameStatusEl = document.getElementById("game-status");
const drawBtn = document.getElementById("draw-btn");
let cardArray = [];
let deckId = "";
let remainingCards = "";
let computerScore = 0;
let yourScore = 0;

document.getElementById("new-deck-btn").addEventListener("click", () => {
  fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id;
      remainingCards = data.remaining;
      if (remainingCards > 0) {
        drawBtn.disabled = false;
      }
      updateRemainingCards();
    });
});

drawBtn.addEventListener("click", () => {
  fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      remainingCards = data.remaining;
      cardArray = data.cards;
      updateRemainingCards();
      displayCards();
      displayScore(data.cards[0].value, data.cards[1].value);
      if (remainingCards === 0) {
        drawBtn.disabled = true;
        if (computerScore > yourScore) {
          gameStatusEl.textContent = "Computer won 😞";
        } else if (yourScore > computerScore) {
          gameStatusEl.textContent = "You won 🥳";
        } else {
          gameStatusEl.textContent = "It's a tie 🤝";
        }
      }
    });
});

function updateRemainingCards() {
  document.getElementById(
    "remaining-cards"
  ).textContent = `Remaining Cards: ${remainingCards}`;
}

function displayCards() {
  document.getElementById("card-container").innerHTML = `
    <div class="card translate-left"><img src="${cardArray[0].image}"></div>
    <div class="card translate-right"><img src="${cardArray[1].image}"></div>
    `;
}

function displayScore(card1, card2) {
  const cardOneValue = cards.indexOf(card1);
  const cardTwoValue = cards.indexOf(card2);

  if (cardOneValue > cardTwoValue) {
    computerScore++;
    gameStatusEl.textContent = "Computer won this turn";
  } else if (cardTwoValue > cardOneValue) {
    yourScore++;
    gameStatusEl.textContent = "You won this turn";
  } else {
    gameStatusEl.textContent = "It's a war!";
  }
  document.getElementById(
    "computer-score"
  ).textContent = `Compure score: ${computerScore}`;
  document.getElementById(
    "your-score"
  ).textContent = `Your score: ${yourScore}`;
}
