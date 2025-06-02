const newDeckBtn = document.getElementById("new-deck-btn");
const drawBtn = document.getElementById("draw-btn");

async function getNewDeck() {
  const response = await fetch("https://www.deckofcardsapi.com/api/deck/new/");
  return response.json();
}

async function handleNewDeckBtn() {
  const data = await getNewDeck();
  console.log(data.deck_id);
  return data.deck_id;
}

async function drawCard() {
  const deckId = await handleNewDeckBtn();

  const response = await fetch(
    `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
  );
  return await response.json();
}

async function handleDrawBtn() {
  const data = await drawCard();
  console.log(data);
}

newDeckBtn.addEventListener("click", handleNewDeckBtn);
drawBtn.addEventListener("click", handleDrawBtn);
