const newDeckBtn = document.getElementById("new-deck-btn");
const drawBtn = document.getElementById("draw-btn");
let cardArray = [];
let deckId = "";
let remainingCards = "";

function handleNewDeckBtn() {
  fetch("https://www.deckofcardsapi.com/api/deck/new/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      deckId = data.deck_id;
      remainingCards = data.remaining;
      updateRemainingCards();
    });
}

function handleDrawBtn() {
  fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      remainingCards = data.remaining;
      cardArray = data.cards;
      console.log(cardArray);
      updateRemainingCards();
    });
}

function updateRemainingCards() {
  document.getElementById(
    "remaining-cards"
  ).textContent = `Remaining Cards: ${remainingCards}`;
}

function displayCards() {
  const cardContainer = document.getElementById("card-container");
  console.log(cardArray); // I need to call this function in handleDrawBtn
}

newDeckBtn.addEventListener("click", handleNewDeckBtn);
drawBtn.addEventListener("click", handleDrawBtn);
