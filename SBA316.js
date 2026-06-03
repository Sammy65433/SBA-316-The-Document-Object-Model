// SBA 316:
// The Document Object Model

// NBA Team Guess Game
// This is a single‑page web app that tests the player’s NBA knowledge.
// The app gives a clue (e.g., “This team plays in Los Angeles and wears purple and gold.”).
// The player types the team name into a form field and submits it.

// 1. build html first

// 2. keep it small - 5 rounds
// Game Data
// Put teams in array list - obj has 2props clue/answer

const teams = [
  {
    clue: "Founded in 1947, this franchise won its first championship in 1972.",
    answer: "lakers",
  },
  {
    clue: "This team has the most NBA championships.",
    answer: "celtics",
  },
  {
    clue: "This team dominated the 1990s, led by a player nicknamed “His Airness” who wore number 23.",
    answer: "bulls",
  },
  {
    clue: "This team set single-season record with 73 wins in 2016",
    answer: "warriors",
  },
  {
    clue: "This team won back-to-back titles in 2012-13",
    answer: "Heat",
  },
];

// console.log(teams);

// 3.Set up variables:

// Dom Elements
// clue / guess-form / team-input / feedback / score / reset-btn / history

// Num of correct answers
// start at 0 cause no guesses been made
let score = 0;

// index of current clue in teams array
// start at 0 so clue is shown
let currentIndex = 0;

const clueEl = document.getElementById("clue");
const formEl = document.getElementById("guess-form");
const inputEl = document.getElementById("team-input");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const resetBtn = document.getElementById("reset-btn");
const historyEl = document.getElementById("history");

// console.log(clueEl);

// Game logic
// Show a clue - get a guess - give feedback - show next clue

// / flow summary -
// page load -> rendeClue() user see clue
//

// render 1st clue
// Pull clue str from team
function renderClue() {
  //   console.log("renderClue called - index:", currentIndex);
  //   console.log("clue text:", teams[currentIndex].clue);

  // writing text in element <p id="clue"
  //   without this text, player has no prompt, - Meaningless
  clueEl.textContent = teams[currentIndex].clue;
}
renderClue();

// player sees clue (renderClue)
// they type a guess and click submit ----submit form fires
// handleGuess takes over and make sure its not blank
// when it passes move on checkAnswer

// user submits form -> handleGuess() (validation) -> checkAnswer
// Call when page loads

// Event listener
formEl.addEventListener("submit", handleGuess);
resetBtn.addEventListener("click", resetGame);

// Handle Guess
function handleGuess(e) {
  // console.assert.log('event ->', e.type);

  e.preventDefault();

  // console.log('raw input →', inputEl.value);
  // grab the data, clean and normalise
  const userGuess = inputEl.value.trim().toLowerCase();

  // console.log('clean guess →', `"${userGuess}"`);

  // make sure they enter something
  // empty after the trim
  if (userGuess === "") {
    // console.log('empty guess – feedback shown');
    feedbackEl.textContent = "Please enter a team name."; //message
    feedbackEl.className = ""; //clear class
    // console.log(userGuess)

    return; //exit
  }
  // console.log('checking answer for →', userGuess);
  checkAnswer(userGuess);
}

// Check the Answer
// i need to check to make sure the answers are correct
function checkAnswer(userGuess) {
  // get correct for clue
  const correct = teams[currentIndex].answer;
  // console.log(' correct answer ->', correct);

  // compare userguess vs correct
  if (userGuess === correct) {
    score++; // increase score
    // console.log('guess correct -> score =', score);
    feedbackEl.textContent = "Correct"; //player sees message correct
    feedbackEl.className = "correct";
  } else {
    console.log("guess wrong -> user:", userGuess, "| correct:", correct);

    feedbackEl.textContent = `Wrong. Answer: ${correct}`; //player sees message wrong
    feedbackEl.className = "wrong";
  }

  // working so far !!!!!!!!!!!
}
// Update the score board
scoreEl.textContent = `Score: ${score}`;
console.log("scoreboard updated ->", scoreEl.textContent);

// Record this round - gotta make a function for the history
addHistory(userGuess, correct);

// go to next round
currentIndex++;
console.log("next index -", currentIndex);
// if more clues remain -> increment currentIndex -> renderClue() again
// if no clues left -> endgame

// if more clues left show the next clue and clear the field
if (currentIndex < teams.length) {
  console.log("render next clue");

  renderClue();
  inputEl.value = "";
} else {
  console.log("no more clues - end game");
  endGame();
}
// History Function - creating a new list item and append it
// see every attempt
// build a node n insert append
// keep data seperate
function addHistory(guess, answer) {
  console.log("add to history -> guess:", guess, "| answer:", answer);

  const li = document.createElement("li"); //make <li>
  li.textContent = `You guessed "${guess}", answer was "${answer}"`; //fill text
  historyEl.appendChild(li); // add to id="history"
}
// END GAME FUNCTION
function endGame() {
  clueEl.textContent = "Game Over!"; //Replace clue with message

  // finally score
  // how many guesses were right vs how many clues was presented
  // if score is 2 and teams.length is 3 final score: 2/3
  //  i should see "Final Score: 2/3"
  const finalMsg = `Final score: ${score} / ${teams.length}`;
  feedbackEl.textContent = finalMsg;
  feedbackEl.className = "correct";
  console.log("Congrats", finalMsg);

  // BOM method - pop up
  alert("Nice job finishing the NBA game!");
}

// Gotta reset the game
function resetgame() {
        currentIndex = 0; // 1st clue 

    score = 0; // score 0

    // Refresh everything from the previous game 
    scoreEl.textContent = 'Score: 0'; //clear display 

    feedbackEl.textContent = ''; //remove text 
    feedbackEl.className = ''; // strip the colors class
    inputEl.value = ''; //empty text box
    historyEl.innerHTML = ''; //wipe history in li

    renderClue(); //show 1st clue again 

}
