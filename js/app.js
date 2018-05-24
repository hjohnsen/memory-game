/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

const cards = $(".deck")
let turn = 0; // this will keep track of 1st vs 2nd card shown
let moves = 0;  //this will keep track of moves made


cards.on("click", ".card", function(evt){
  evt.preventDefault();
  let card = $(evt.target);
  card.addClass("open show")
  turn += 1;
  console.log(turn);

  if (turn==2){
    let matches = $(".show");
    firstCard = matches.children()[0].className;
    secondCard = matches.children()[1].className;
    console.log(firstCard);
    console.log(secondCard);
    if (firstCard==secondCard){
      console.log("match");
      matches.addClass("match");
    }
    else {
      console.log("not a match");
    }
    // TODO: add in red or wait or whatever
    matches.removeClass("open show")
    turn = turn%2;

    moves += 1;
  }

})
