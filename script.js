"use strict";

const dom = {
  newGame: document.querySelector(".btn--new"),
  dice: document.querySelector(".dice"),
  roll: document.querySelector(".btn--roll"),
  hold: document.querySelector(".btn--hold"),
  score: [
    document.querySelector("#score--0"),
    document.querySelector("#score--1"),
  ],
  current: [
    document.querySelector("#current--0"),
    document.querySelector("#current--1"),
  ],
  player: [
    document.querySelector(".player--0"),
    document.querySelector(".player--1"),
  ],

  name: [
    document.getElementById("name--0"),
    document.getElementById("name--1"),
  ],

  //are you sure container
  areYouSure: document.querySelector(".are-you-sure-container"),
  yes: document.querySelector(".are-btn-yes"),
  no: document.querySelector(".are-btn-no"),
};

let score, active, currentScore;
score = [0, 0];
active = 0;
currentScore = 0;

let playing = false;
//------------------ Starters --------------//

function init() {
  score = [0, 0];

  dom.current[0].textContent = 0;
  dom.current[1].textContent = 0;
  dom.score[0].textContent = score[0];
  dom.score[1].textContent = score[1];

  dom.player[active].classList.remove("player--winner");
  dom.player[0].classList.add("player--active");
  dom.player[1].classList.remove("player--active");
  dom.name[active].textContent = `Player ${active + 1}`;

  dom.dice.style.display = "none";
  active = 0;
  currentScore = 0;

  dom.hold.disabled = false;
  dom.roll.disabled = false;
  playing = false;
}
init();

//----------------- Helpers ----------------//

const switchPlayer = () => {
  dom.current[active].textContent = 0;
  currentScore = 0;
  dom.player[active].classList.toggle("player--active");
  active = active ^ 1;
  dom.player[active].classList.toggle("player--active");
};

const random = () => {
  playing = true;
  dom.dice.style.display = "block";

  const randomNum = Math.trunc(Math.random() * 6 + 1);
  dom.dice.src = `./Images/dice-${randomNum}.png`;

  if (randomNum !== 1) {
    currentScore += randomNum;
    dom.current[active].textContent = currentScore;
  } else {
    switchPlayer();
  }
};

const holdValue = () => {
  score[active] += currentScore;
  dom.score[active].textContent = score[active];

  if (score[active] >= 100) {
    dom.player[active].classList.add("player--winner");
    dom.name[active].textContent = "winner!";
    dom.hold.disabled = true;
    dom.roll.disabled = true;
  } else {
    switchPlayer();
  }
};

const areYouSure = function () {
  if (score[active] < 100 && playing) {
    dom.areYouSure.classList.remove("display-none");
  } else if (!playing) {
    alert("start the game");
  } else if (score[active] >= 100) {
    init();
  }
};

//----------------- events -----------------//

dom.roll.addEventListener("click", random);

dom.hold.addEventListener("click", holdValue);

dom.newGame.addEventListener("click", areYouSure);

dom.no.addEventListener("click", () => {
  dom.areYouSure.classList.add("display-none");
});

dom.yes.addEventListener("click", () => {
  dom.areYouSure.classList.add("display-none");
  dom.name[active].textContent = `Player ${active + 1}`;
  init();
});
