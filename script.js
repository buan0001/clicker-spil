"use strict";

window.addEventListener("load", startUp);
// window.addEventListener("load", playStuff);

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
  document.querySelector("#press_start").addEventListener("click", playStuff);
}

function playStuff() {
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
  console.log("playStuff");
  document
    .querySelector("#water_sprite")
    .addEventListener("mousedown", clickWater);
  document
    .querySelector("#air_container")
    .addEventListener("mousedown", clickAir);
  document
    .querySelector("#banana_container")
    .addEventListener("mousedown", clickBanana);
  document
    .querySelector("#fuel_container")
    .addEventListener("mousedown", clickFuel);
  document
    .querySelector("#alien_container")
    .addEventListener("mousedown", clickAlien);
  document
    .querySelector("#rotten_container")
    .addEventListener("mousedown", clickRotten);
  document
    .querySelector("#background")
    .addEventListener("mousedown", addClickz);
}

function clickWater() {
  console.log("clickWater");
  document
    .querySelector("#water_sprite")
    .removeEventListener("mousedown", clickWater);
  document.querySelector("#water_container").classList.add("paused");
  document.querySelector("#water_sprite").classList.add("good");
  document
    .querySelector("#water_sprite")
    .addEventListener("animationend", restartWater);
  addPoints();
}

function restartWater() {
  console.log("restartWater");
  document.querySelector("#water_container").classList.remove("paused");
  document.querySelector("#water_sprite").classList.remove("good");
  document.querySelector("#water_container").classList.remove("falling1");
  document.querySelector("#water_container").offsetLeft;
  document.querySelector("#water_container").classList.add("falling1");
  document
    .querySelector("#water_sprite")
    .addEventListener("mousedown", clickWater);
}

function clickAir() {
  console.log("clickAir");
  document
    .querySelector("#air_container")
    .removeEventListener("mousedown", clickAir);
  document.querySelector("#air_container").classList.add("paused");
  document.querySelector("#air_sprite").classList.add("good");
  document
    .querySelector("#air_sprite")
    .addEventListener("animationend", restartAir);
  addPoints();
}

function restartAir() {
  console.log("restartAir");
  document.querySelector("#air_container").classList.remove("paused");
  document.querySelector("#air_sprite").classList.remove("good");
  document.querySelector("#air_container").classList.remove("falling1");
  document.querySelector("#air_container").offsetLeft;
  document.querySelector("#air_container").classList.add("falling1");
  document
    .querySelector("#air_container")
    .addEventListener("mousedown", clickAir);
}
function clickBanana() {
  console.log("clickBanana");
  document
    .querySelector("#banana_container")
    .removeEventListener("mousedown", clickBanana);
  document.querySelector("#banana_container").classList.add("paused");
  document.querySelector("#banana_sprite").classList.add("good");
  document
    .querySelector("#banana_sprite")
    .addEventListener("animationend", restartBanana);
  addPoints();
}

function restartBanana() {
  console.log("restartBanana");
  document.querySelector("#banana_container").classList.remove("paused");
  document.querySelector("#banana_sprite").classList.remove("good");
  document.querySelector("#banana_container").classList.remove("falling1");
  document.querySelector("#banana_container").offsetLeft;
  document.querySelector("#banana_container").classList.add("falling1");
  document
    .querySelector("#banana_container")
    .addEventListener("mousedown", clickBanana);
}
function clickFuel() {
  console.log("clickFuel");
  document
    .querySelector("#fuel_container")
    .removeEventListener("mousedown", clickFuel);
  document.querySelector("#fuel_container").classList.add("paused");
  document.querySelector("#fuel_sprite").classList.add("good");
  document
    .querySelector("#fuel_sprite")
    .addEventListener("animationend", restartFuel);
  addPoints();
}

function restartFuel() {
  console.log("restartFuel");
  document.querySelector("#fuel_container").classList.remove("paused");
  document.querySelector("#fuel_sprite").classList.remove("good");
  document.querySelector("#fuel_container").classList.remove("falling1");
  document.querySelector("#fuel_container").offsetLeft;
  document.querySelector("#fuel_container").classList.add("falling1");
  document
    .querySelector("#fuel_container")
    .addEventListener("mousedown", clickFuel);
}
function clickAlien() {
  console.log("clickAlien");
  document
    .querySelector("#alien_container")
    .removeEventListener("mousedown", clickAlien);
  document.querySelector("#alien_container").classList.add("paused");
  document.querySelector("#alien_sprite").classList.add("bad");
  document
    .querySelector("#alien_sprite")
    .addEventListener("animationend", restartAlien);
  if (hp > 0) {
    removeHp();
  }
}

function restartAlien() {
  console.log("restartAlien");
  document.querySelector("#alien_container").classList.remove("paused");
  document.querySelector("#alien_sprite").classList.remove("bad");
  document.querySelector("#alien_container").classList.remove("falling1");
  document.querySelector("#alien_container").offsetLeft;
  document.querySelector("#alien_container").classList.add("falling1");
  document
    .querySelector("#alien_container")
    .addEventListener("mousedown", clickAlien);
}
function clickRotten() {
  console.log("clickRotten");
  document
    .querySelector("#rotten_container")
    .removeEventListener("mousedown", clickRotten);
  document.querySelector("#rotten_container").classList.add("paused");
  document.querySelector("#rotten_sprite").classList.add("bad");
  document
    .querySelector("#rotten_sprite")
    .addEventListener("animationend", restartRotten);
  removePoints();
}

function restartRotten() {
  console.log("restartRotten");
  document.querySelector("#rotten_container").classList.remove("paused");
  document.querySelector("#rotten_sprite").classList.remove("bad");
  document.querySelector("#rotten_container").classList.remove("falling1");
  document.querySelector("#rotten_container").offsetLeft;
  document.querySelector("#rotten_container").classList.add("falling1");
  document
    .querySelector("#rotten_container")
    .addEventListener("mousedown", clickRotten);
}

function addPoints() {
  console.log("addPoints");
  points++;
  goodClickz++;
  addClickz();
  document.querySelector("#score_image").classList.add("gainStuff");
  document
    .querySelector("#score_image")
    .addEventListener("animationend", displayPoints);
}

function removePoints() {
  points -= 5;
  addClickz();
  document.querySelector("#score_image").classList.add("loseStuff");
  document
    .querySelector("#score_image")
    .addEventListener("animationend", displayPoints);
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
  document.querySelector("#accuracy_count").textContent =
    (accuracy * 100).toFixed(2) + "%";
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
    "Your score was: " +
    points +
    "<br /> With an accuracy of: " +
    (accuracy * 100).toFixed(2) +
    "% <br /> Total score: " +
    parseFloat(finalScore.toFixed(2));
  document.querySelector("#win_over").addEventListener("click", startOver);
}

function gameOver() {
  console.log("You lose :(");
  document.querySelector("#game_over").classList.remove("hidden");
  stopShit();
  document.querySelector("#final_score1").innerHTML =
    "Your score was: " +
    points +
    "<br /> With an accuracy of: " +
    (accuracy * 100).toFixed(2) +
    "% <br /> Total score: " +
    parseFloat(finalScore.toFixed(2));
  document.querySelector("#lose_over").addEventListener("click", startOver);
}

function startOver() {
  console.log("startOver");
  stopShit();
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
  points = 0;
  hp = 3;
  totalClickz = 0;
  goodClickz = 0;
  document.querySelector("#accuracy_count").textContent = "100.00%";
  displayPoints();
  gainHp();
  playStuff();
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

function stopShit() {
  console.log("stop shit");
  restartWater();
  restartAir();
  restartAlien();
  restartBanana();
  restartFuel();
  restartRotten();
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
  document
    .querySelector("#water_sprite")
    .removeEventListener("mousedown", clickWater);
  document
    .querySelector("#air_container")
    .removeEventListener("mousedown", clickAir);
  document
    .querySelector("#banana_container")
    .removeEventListener("mousedown", clickBanana);
  document
    .querySelector("#fuel_container")
    .removeEventListener("mousedown", clickFuel);
  document
    .querySelector("#alien_container")
    .removeEventListener("mousedown", clickAlien);
  document
    .querySelector("#rotten_container")
    .removeEventListener("mousedown", clickRotten);
  document
    .querySelector("#background")
    .removeEventListener("mousedown", addClickz);
}
