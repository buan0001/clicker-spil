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
  document.querySelector("#start").classList.add("hidden");
  document.querySelector("#water_container").classList.add("falling1");
  document.querySelector("#banana_container").classList.add("falling1");
  document.querySelector("#air_container").classList.add("falling1");
  document.querySelector("#fuel_container").classList.add("falling1");
  document.querySelector("#alien_container").classList.add("falling1");
  document.querySelector("#rotten_container").classList.add("falling1");
  document.querySelector("#water_sprite").classList.add("rotate2");
  document.querySelector("#banana_sprite").classList.add("rotate2");
  document.querySelector("#air_sprite").classList.add("rotate2");
  document.querySelector("#fuel_sprite").classList.add("rotate2");
  document.querySelector("#alien_sprite").classList.add("rotate2");
  document.querySelector("#rotten_sprite").classList.add("rotate2");
  console.log("addAnimations");
}

function registerClick() {
  document.querySelector("#water_container").addEventListener("mousedown", clickGood);
  document.querySelector("#air_container").addEventListener("mousedown", clickGood);
  document.querySelector("#banana_container").addEventListener("mousedown", clickGood);
  document.querySelector("#fuel_container").addEventListener("mousedown", clickGood);
  document.querySelector("#alien_container").addEventListener("mousedown", clickAlien);
  document.querySelector("#rotten_container").addEventListener("mousedown", clickRotten);
  document.querySelector("#background").addEventListener("mousedown", addClickz);
}

function clickGood() {
  console.log("clickGood");
  let good = this;
  console.log("======" + this + "=======");
  good.removeEventListener("mousedown", clickGood);
  good.classList.add("paused");
  good.querySelector("img").classList.add("click_good");
  good.addEventListener("animationend", restartGood);
  good.addEventListener("animationend", addPoints());
  // addPoints();
}

function restartGood() {
  console.log("restartGood");
  let good = this;
  console.log(good);
  good.classList.remove("paused");
  good.querySelector("img").classList.remove("click_good");
  good.classList.remove("falling1");
  good.offsetLeft;
  good.classList.add("falling1");
  good.addEventListener("mousedown", clickGood);
}
// function clickBad() {
//   console.log("clickBad");
//   let good = this;
//   console.log("======" + this + "=======");
//   good.removeEventListener("mousedown", clickBad);
//   good.classList.add("paused");
//   good.querySelector("img").classList.add("click_bad");
//   good.addEventListener("animationend", restartBad);
//   addPoints();
// }

// function restartBad() {
//   console.log("restartGood");
//   let good = this;
//   console.log(good);
//   good.classList.remove("paused");
//   good.querySelector("img").classList.remove("click_bad");
//   good.classList.remove("falling1");
//   good.offsetLeft;
//   good.classList.add("falling1");
//   good.addEventListener("mousedown", clickGood);
// }

function clickAlien() {
  console.log("clickAlien");
  let alien = this;
  alien.removeEventListener("mousedown", clickAlien);
  alien.classList.add("paused");
  alien.querySelector("img").classList.add("click_bad");
  alien.addEventListener("animationend", restartAlien);
  // if (hp > 0) {
  //   alien.addEventListener("animationend", removeHp())
  // }
}

function restartAlien() {
  console.log("restartAlien");
  let alien = this;
  alien.classList.remove("paused");
  alien.querySelector("img").classList.remove("click_bad");
  alien.classList.remove("falling1");
  alien.offsetLeft;
  alien.classList.add("falling1");
  alien.addEventListener("mousedown", clickAlien);
  if (hp > 0) {
    removeHp();
  }
}
function clickRotten() {
  console.log("clickRotten");
  let rotten = this;
  rotten.removeEventListener("mousedown", clickRotten);
  rotten.classList.add("paused");
  rotten.querySelector("img").classList.add("click_bad");
  rotten.addEventListener("animationend", restartRotten);
  removePoints();
}

function restartRotten() {
  let rotten = this;
  console.log("restartRotten");
  rotten.classList.remove("paused");
  rotten.querySelector("img").classList.remove("click_bad");
  rotten.classList.remove("falling1");
  rotten.offsetLeft;
  rotten.classList.add("falling1");
  rotten.addEventListener("mousedown", clickRotten);
}

function addPoints() {
  console.log("addPoints");
  points++;
  goodClickz++;
  addClickz();
  document.querySelector("#score_image").classList.add("gainStuff");
  document.querySelector("#score_image").addEventListener("animationend", displayPoints);
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
  console.log("updateClickz");
  accuracy = goodClickz / totalClickz;
  console.log(accuracy);
  document.querySelector("#accuracy_count").textContent = (accuracy * 100).toFixed(2) + "%";
  updateEverything();
}

function displayPoints() {
  console.log("displayPoints");
  document.querySelector("#score_count").textContent = points;
  document.querySelector("#score_image").classList.remove("gainStuff");
  document.querySelector("#score_image").classList.remove("loseStuff");
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
function updateEverything() {
  finalScore = (accuracy + 1) * points;
  console.log("======EVERYTHING=======");
  console.log("Points: " + points);
  console.log("total clickz: " + totalClickz);
  console.log("good clickz: " + goodClickz);
  console.log("hp: " + hp);
  console.log("accuracy: " + accuracy);
  console.log("Final score: " + finalScore);
  if (points >= 10) {
    youWin();
  }
}

function youWin() {
  console.log("You win!!!");
  document.querySelector("#level_complete").classList.remove("hidden");
  stopShit();
  document.querySelector("#final_score2").innerHTML =
    "Your score was: " + points + "<br /> With an accuracy of: " + (accuracy * 100).toFixed(2) + "% <br /> Total score: " + parseFloat(finalScore.toFixed(2));
  document.querySelector("#win_over").addEventListener("click", startOver);
}

function gameOver() {
  console.log("You lose :(");
  document.querySelector("#game_over").classList.remove("hidden");
  document.querySelector("#final_score1").innerHTML =
    "Your score was: " + points + "<br /> With an accuracy of: " + (accuracy * 100).toFixed(2) + "% <br /> Total score: " + parseFloat(finalScore.toFixed(2));
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
  document.querySelector("#accuracy_count").textContent = "100.00%";
  displayPoints();
  gainHp();
  addAnimations();
  registerClick();
}

function gainHp() {
  console.log("regain HP");
  document.querySelector("#hp1").classList.remove("alivege");
  document.querySelector("#hp2").classList.remove("alivege");
  document.querySelector("#hp3").classList.remove("alivege");
  document.querySelector("#hp1").offsetLeft;
  document.querySelector("#hp2").offsetLeft;
  document.querySelector("#hp3").offsetLeft;
  document.querySelector("#hp1").classList.remove("deadge");
  document.querySelector("#hp2").classList.remove("deadge");
  document.querySelector("#hp3").classList.remove("deadge");
  document.querySelector("#hp1").classList.add("alivege");
  document.querySelector("#hp2").classList.add("alivege");
  document.querySelector("#hp3").classList.add("alivege");
}

function removeAnimations() {
  console.log("stop shit");
  let ele =
    // restartGood();
    // restartFuel();
    // restartRotten();
    document.querySelector("#water_container").classList.remove("falling1");
  document.querySelector("#banana_container").classList.remove("falling1");
  document.querySelector("#air_container").classList.remove("falling1");
  document.querySelector("#fuel_container").classList.remove("falling1");
  document.querySelector("#alien_container").classList.remove("falling1");
  document.querySelector("#rotten_container").classList.remove("falling1");
  document.querySelector("#water_sprite").classList.remove("rotate2");
  document.querySelector("#banana_sprite").classList.remove("rotate2");
  document.querySelector("#air_sprite").classList.remove("rotate2");
  document.querySelector("#fuel_sprite").classList.remove("rotate2");
  document.querySelector("#alien_sprite").classList.remove("rotate2");
  document.querySelector("#rotten_sprite").classList.remove("rotate2");
}

function removeEvents() {
  document.querySelector("#water_container").removeEventListener("mousedown", clickGood);
  document.querySelector("#air_container").removeEventListener("mousedown", clickGood);
  document.querySelector("#banana_container").removeEventListener("mousedown", clickGood);
  document.querySelector("#fuel_container").removeEventListener("mousedown", clickGood);
  document.querySelector("#alien_container").removeEventListener("mousedown", clickAlien);
  document.querySelector("#rotten_container").removeEventListener("mousedown", clickRotten);
  document.querySelector("#background").removeEventListener("mousedown", addClickz);
}
