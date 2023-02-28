"use strict";

// window.addEventListener("load", startUp);
window.addEventListener("load", startUp2);

let points = 0;
let hp = 3;
let totalClickz = 0;
let goodClickz = 0;
let accuracy;
let finalAccuracy;
let finalScore;

function startUp() {
  console.log("startup");
  document.querySelector("#start").classList.remove("hidden");
  document.querySelector("#press_start").addEventListener("click", addAnimations);
  registerClick();
}

function startUp2() {
  addAnimations();
  registerClick();
}

function addAnimations() {
  console.log("addAnimations");
  document.querySelector("#start").classList.add("hidden");
  document.querySelectorAll(".container").forEach((container) => container.classList.add("falling1"));
  document.querySelectorAll(".sprite").forEach((sprite) => sprite.classList.add("rotate2"));
}

function registerClick() {
  console.log("registerClick");
  document.querySelectorAll(".good").forEach((container) => container.addEventListener("mousedown", clickGood));
  document.querySelectorAll(".bad").forEach((container) => container.addEventListener("mousedown", clickBad));
  document.querySelector("#background").addEventListener("mousedown", addClickz);
}

function clickGood() {
  console.log("clickGood");
  let good = this;
  console.log(good);
  good.removeEventListener("mousedown", clickGood);
  good.classList.add("paused");
  good.querySelector("img").classList.add("click_good");
  good.addEventListener("animationend", restartGood);
  addPoints();
}

function restartGood() {
  console.log("restartGood");
  let good = this;
  console.log(good);
  good.querySelector("img").classList.remove("click_good");
  good.classList.remove("paused");
  good.classList.remove("falling1");
  good.offsetLeft;
  good.classList.add("falling1");
  good.addEventListener("mousedown", clickGood);
}

function clickBad() {
  console.log("clickBad");
  let bad = this;
  console.log("======" + this + "=======");
  bad.removeEventListener("mousedown", clickBad);
  bad.classList.add("paused");
  bad.querySelector("img").classList.add("click_bad");
  bad.addEventListener("animationend", restartBad);
  if (bad == document.querySelector("#alien_container")) {
    if (hp > 0) {
      bad.addEventListener("animationend", removeHp());
    }
  } else {
    removePoints();
  }
}

function restartBad() {
  console.log("restartbad");
  let bad = this;
  console.log(bad);
  bad.classList.remove("paused");
  bad.querySelector("img").classList.remove("click_bad");
  bad.classList.remove("falling1");
  bad.offsetLeft;
  bad.classList.add("falling1");
  bad.addEventListener("mousedown", clickBad);
}

function addPoints() {
  console.log("addPoints");
  points++;
  goodClickz++;
  addClickz();
  document.querySelector("#score_image").classList.add("gainStuff");
  document.querySelector("#score_image").addEventListener("animationend", displayPoints);
    if (points >= 3) {
      youWin();
    } 
}

function removePoints() {
  points -= 5;
  addClickz();
  document.querySelector("#score_image").classList.add("loseStuff");
  document.querySelector("#score_image").addEventListener("animationend", displayPoints);
}

function addClickz() {
  console.log("addClickz");
  totalClickz++;
  displayClickz();
}

function displayClickz() {
  console.log("Clickz");
  accuracy = goodClickz / totalClickz;
  console.log(accuracy);
  document.querySelector("#accuracy_count").textContent = (accuracy * 100).toFixed(2) + "%";
  // updateEverything();
}

function displayPoints() {
  console.log("displayPoints");
  let board = document.querySelector("#score_board")
  board.querySelector("span").textContent = points;
  board.querySelector("img").classList.remove("gainStuff");
  board.querySelector("img").classList.remove("loseStuff");

}

function removeHp() {
  console.log("removeHp");
  updateHp();
  addClickz();
  hp--;
  if (hp <= 0) {
    gameOver();
  }
}

function updateHp() {
  console.log("updateHp");
  document.querySelector("#hp" + hp).classList.remove("alivege");
  document.querySelector("#hp" + hp).classList.add("deadge");
}
// function updateEverything() {
//   finalScore = (accuracy + 1) * points;
//   console.log("======EVERYTHING=======");
//   console.log("Points: " + points);
//   console.log("total clickz: " + totalClickz);
//   console.log("good clickz: " + goodClickz);
//   console.log("hp: " + hp);
//   console.log("accuracy: " + accuracy);
//   console.log("Final score: " + finalScore);
//   if (points >= 3) {
//     youWin();
//   }
// }

function youWin() {
  console.log("You win!!!");
  finalScore = (accuracy + 1) * points;
  removeAnimations();
  document.querySelector("#level_complete").classList.remove("hidden");
  document.querySelector("#final_score2").innerHTML = "Your score was: " + points + "<br /> With an accuracy of: " + (accuracy * 100).toFixed(2) + "% <br /> Total score: " + parseFloat(finalScore.toFixed(2));
  document.querySelector("#win_over").addEventListener("click", startOver);
}

function gameOver() {
  console.log("You lose :(");
  finalScore = (accuracy + 1) * points;
  document.querySelector("#game_over").classList.remove("hidden");
  document.querySelector("#final_score1").innerHTML = "Your score was: " + points + "<br /> With an accuracy of: " + (accuracy * 100).toFixed(2) + "% <br /> Total score: " + parseFloat(finalScore.toFixed(2));
  document.querySelector("#lose_over").addEventListener("click", startOver);
}

function startOver() {
  console.log("startOver");
  removeAnimations();
  removeEvents();
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
  points = 0;
  hp = 3;
  totalClickz = 0;
  goodClickz = 0;
  displayPoints();
  addAnimations();
  registerClick();
  gainHp();
  document.querySelector("#accuracy_count").textContent = "100.00%";
}

function gainHp() {
  console.log("regain HP");
  let hp1 = document.querySelector("#hp1");
  let hp2 = document.querySelector("#hp2");
  let hp3 = document.querySelector("#hp3");
  hp1.classList.remove("alivege");
  hp2.classList.remove("alivege");
  hp3.classList.remove("alivege");
  hp1.offsetLeft;
  hp2.offsetLeft;
  hp3.offsetLeft;
  hp1.classList.remove("deadge");
  hp2.classList.remove("deadge");
  hp3.classList.remove("deadge");
  hp1.classList.add("alivege");
  hp2.classList.add("alivege");
  hp3.classList.add("alivege");
}

function removeAnimations() {
  console.log("remove animations");
  document.querySelectorAll(".container").forEach((container) => container.classList.remove("falling1"));
  document.querySelectorAll(".container").forEach((container) => container.offsetLeft)
  document.querySelectorAll(".sprite").forEach((sprite) => sprite.classList.remove("rotate2"));
}

function removeEvents() {
  console.log("removeEvents");
  document.querySelectorAll(".good").forEach((container) => container.removeEventListener("mousedown", clickGood));
  document.querySelectorAll(".bad").forEach((container) => container.removeEventListener("mousedown", clickBad));
  document.querySelector("#background").removeEventListener("mousedown", addClickz);
}