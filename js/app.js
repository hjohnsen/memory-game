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
* Create a list that holds all of your cards
*/
let cardList = ["diamond", "paper-plane-o", "anchor", "bolt",
"cube", "leaf", "bicycle", "bomb"];

cardList = shuffle(cardList.concat(cardList)); //get each twice, shuffles

/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/

const cards = $(".deck"); //all the cards will be in this list

for (let card of cardList) {
  let code = "<li class='card'> <i class='fa fa-" + card + "'></i></li>";
  cards.append(code);
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


const moveText = $(".moves"); //where the #moves gets printed
const starHolder = $(".stars");  //list with stars
const timer = $(".timer"); //timer printout

let moves = 0;  //this will keep track of moves made
let elapsedTime = 0;  //this will keep track of seconds elapsed

cards.on("click", ".card", function(evt){
  //when a card is clicked on:
  evt.preventDefault();
  let card = $(evt.target);
  card.addClass("open show");

  let matches = $(".show");
  if (matches.length==2){
    // two cards are showing, so check for matches
    firstCard = matches.children()[0].className;
    secondCard = matches.children()[1].className;
    if (firstCard==secondCard){
      //if classnames are the same, it's a match
      matches.addClass("match");
      matches.removeClass("open show");
      if ($(".match").length==16){
        //if there are 16 matched cards, you've won.
        clearTimeout(timerFunction); //stop timer
        modal = $("#winModal")[0];
        let starMessage;
        if (starHolder.children().length==1){
          starMessage = "1 star";
        }
        else {
          starMessage = starHolder.children().length + " stars";
        }
        $(".starCount").text(starMessage);
        modal.style.display = "block";
      }
    }
    else {
      //pauses for half a second before turning over
      setTimeout(function(){matches.removeClass("open show")}, 500);
    }
    // TODO: add in red or wait or whatever

    moves += 1;
    if (moves%10==0 && starHolder.children().length>0) {
      //decrement stars every 10 moves
      starHolder.children().last().remove();
    }
    moveText.text(moves);   //print the number of moves on screen
  }

})

var timerFunction = setInterval(function(){
  //this just keeps time in seconds
  elapsedTime++;
  timer.text(elapsedTime);
  console.log(elapsedTime);
}, 1000);

$(".restart").click(function(evt){
  // TODO: not sure if this is the best way to do this
  location.reload();
});
