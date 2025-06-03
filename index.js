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
      updateRemainingCards();
    });
});

document.getElementById("draw-btn").addEventListener("click", () => {
  fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      remainingCards = data.remaining;
      cardArray = data.cards;
      updateRemainingCards();
      displayCards();
      displayScore(data.cards[0].value, data.cards[1].value);
      if (remainingCards === 0) {
        document.getElementById("draw-btn").disabled = true;
        if (computerScore > yourScore) {
          gameStatusEl.textContent = "Computer won 😞";
        } else if (yourScore > computerScore) {
          gameStatusEl.textContent = "You won 🥳";
        } else {
          gameStatusEl.textContent = "it's a tie 🤝";
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
  let displayCardsHtml = "";
  cardArray.forEach((card) => {
    displayCardsHtml += `
    <div class="card"><img src="${card.image}"></div>
    `;
  });
  document.getElementById("card-container").innerHTML = displayCardsHtml;
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
