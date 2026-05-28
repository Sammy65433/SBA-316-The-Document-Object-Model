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
    clue: "This team plays in Los Angeles and wears purple and gold.",
    answer: "lakers",
  },
  {
    clue: "This team plays in Boston and wears green.",
    answer: "celtics",
  },
  {
    clue: "This team plays in Chicago and is named after an animal.",
    answer: "bulls",
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
//   without this text player has no prompt, - Meaningless
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
formEl.addEventListener('submit', handleGuess);
resetBtn.addEventListener('click', resetGame);

// Handle Guess
function handleGuess(e) {
    e.preventDefault();

    // grab the data, clean and normalise 
    const userGuess = inputEl.value.trim().toLowerCase();

    // make sure they enter something 
    // empty after the trim
    if (userGuess === '') {
        feedbackEl.textContent = 'Please enter a team name.'; //message 
        feedbackEl.className = ''; //clear class 
        return; //exit 
    }
    checkAnswer(userGuess);
}

// Check the Answer 
// i need to check to make sure the answers are correct 


if (userGuess === correct) {
    score++;
}
// if more clues remain -> increment currentIndex -> renderClue() again 
// if no clues left -> endgame 