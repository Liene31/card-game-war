let cardArray = [];
let deckId = "";
let remainingCards = "";

document.getElementById("new-deck-btn").addEventListener("click", () => {
  fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      deckId = data.deck_id;
      remainingCards = data.remaining;
      updateRemainingCards();
    });
});

document.getElementById("draw-btn").addEventListener("click", () => {
  fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      remainingCards = data.remaining;
      cardArray = data.cards;
      updateRemainingCards();
      displayCards();
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
