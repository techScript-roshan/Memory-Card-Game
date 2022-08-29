const cards = document.querySelectorAll(".card");

let matchedCard = 0;
let cardOne, cardTwo;
let disibleDeck = false;

function flipCard(e) {
  let clickedCard = e.target;
  if (clickedCard !== cardOne && !disibleDeck) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
      // return the cardOne value to clickedCard
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disibleDeck = true;
    let cardOneImg = cardOne.querySelector("img").src,
      cardTwoImg = cardTwo.querySelector("img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    // if two cards img matched
    matchedCard++; // increment matched value by 1

    // if matched value is 8 that means user has matched all the cards (8*2 = 16 cards )
    if (matchedCard == 8) {
      setTimeout(() => {
        return shuffleCard();
      }, 1000);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    return (disibleDeck = false);
  }
  // if two card not matched
  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);

  setTimeout(() => {
    // removing both shake & flip classes from the both card after 1.2 seconds
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = ""; // setting both card value to blank
    disibleDeck = false;
  }, 1200);
}

function shuffleCard() {
  matchedCard = 0;
  cardOne = cardTwo = "";
  disibleDeck = false;

  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1)); // sorting array item randomly

  cards.forEach((card, index) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector("img");
    imgTag.src = `IMG/img-${arr[index]}.png`;
    card.addEventListener("click", flipCard);
  });
}
shuffleCard();

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
