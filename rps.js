//bezveze
/*const obj = { name: 'basketball', price: 2095 }
      console.log(obj);
      obj.price += 500;
      console.log(obj.price)
      obj['del-time'] = '3 days';
      console.log(obj['del-time']); */

let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

/* 
      if (!score) {
      score = {
      wins: 0,
      losses: 0,
      ties: 0
      };
      }
      */

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

function playGame(playerMove) {
  const compMove = pickComputerMove();
  let result = "";

  if (playerMove === "Scissors") {
    if (compMove === "Scissors") {
      result = "It is a Tie.";
    } else if (compMove === "Rock") {
      result = "You lost.";
    } else if (compMove === "Paper") {
      result = "You won.";
    }
  } else if (playerMove === "Paper") {
    if (compMove === "Scissors") {
      result = "You lost.";
    } else if (compMove === "Rock") {
      result = "You won.";
    } else if (compMove === "Paper") {
      result = "It is a Tie.";
    }
  } else if (playerMove === "Rock") {
    if (compMove === "Scissors") {
      result = "You won.";
    } else if (compMove === "Rock") {
      result = "It is a Tie.";
    } else if (compMove === "Paper") {
      result = "You lost.";
    }
  }

  if (result === "You won.") {
    score.wins += 1;
  } else if (result === "You lost.") {
    score.losses += 1;
  } else if (result === "It is a Tie.") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(".js-moves").innerHTML = `You 
    <img src="${playerMove}-emoji.png" class="move-icon">
    <img src="${compMove}-emoji.png" class="move-icon">Computer`;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let compMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    compMove = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    compMove = "Paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    compMove = "Scissors";
  }

  return compMove;
}

function handleFeedback(type) {
  const likeBtn = document.getElementById("likeBtn");
  const dislikeBtn = document.getElementById("dislikeBtn");

  if (type === "like") {
    likeBtn.classList.toggle("liked");
    dislikeBtn.classList.remove("disliked");
  } else {
    dislikeBtn.classList.toggle("disliked");
    likeBtn.classList.remove("liked");
  }
}
