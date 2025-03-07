let score = JSON.parse(localStorage.getItem("score")) || {
  win: 0,
  loss: 0,
  tie: 0,
};
showScore();

const rock = document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
  showScore();
});
const paper = document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
  showScore();
});
const scissor = document.querySelector('.js-scissor-button').addEventListener('click', () => {
  playGame('scissors');
  showScore();
});

const reset = document.querySelector('.js-reset-button').addEventListener('click', () => {
  score.win = 0;
  score.loss = 0;
  score.tie = 0;
  showScore();
  localStorage.removeItem('score');
});

const autoplay = document.querySelector('.js-autoPlay-button').addEventListener('click', () => {
  autoPlay();
});

function showScore() {
  const win = document.querySelector(".win");
  const loss = document.querySelector(".loss");
  const tie = document.querySelector(".tie");

  win.innerHTML = `Wins : ${score.win}`;
  loss.innerHTML = `Losses : ${score.loss}`;
  tie.innerHTML = `Ties : ${score.tie}`;
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";
  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You win.";
    } else {
      result = "Tie.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else {
      result = "You lose.";
    }
  } else {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else {
      result = "You win.";
    }
  }

  if (result === "You win.") {
    score.win += 1;
  } else if (result === "You lose.") {
    score.loss += 1;
  } else if (result === "Tie.") {
    score.tie += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));
  localStorage.setItem("result", JSON.stringify(result));

  const status = document.querySelector(".status");
  status.innerText = result;

  const move = document.querySelector(".moves");
  move.innerHTML = `Your Move : 
    <img src="./images/${playerMove}-emoji.png" alt="./images/${playerMove}-emoji" class="move-icon">
    <img src="./images/${computerMove}-emoji.png" alt="./images/${computerMove}-emoji" class="move-icon">
    : Computer's move `;

  showScore();
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }
  return computerMove;
}

let isAutoPlaying = false;
let intervalId;

function autoPlay(){
  if(!isAutoPlaying){
    intervalId = setInterval(() => {
      const autoplayMove = pickComputerMove();
      playGame(autoplayMove);
    }, 1000);
    isAutoPlaying = true;
  }else{
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector('body').addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('rock');
  }else if(event.key === 'p'){
    playGame('paper');
  }else if(event.key === 's'){
    playGame('scissors');
  }
}); 