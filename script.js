"use strict";

window.addEventListener("load", startButtons);

let points = 0;
let hp = 3;
let totalClickz = 0;
let goodClickz = 0;
let accuracy;
let finalScore;
let isGameRunning = false;
let highScore;

function startButtons() {
  let pressStart = document.querySelector("#press_start");
  pressStart.addEventListener("click", startUp);
  pressStart.addEventListener("mouseover", soundButton);

  let winMenu = document.querySelector("#win_menu");
  winMenu.addEventListener("click", goToStart);
  winMenu.addEventListener("mouseover", soundButton);

  let loseMenu = document.querySelector("#lose_menu");
  loseMenu.addEventListener("click", goToStart);
  loseMenu.addEventListener("mouseover", soundButton);

  let winRestart = document.querySelector("#win_restart");
  winRestart.addEventListener("click", startUp);
  winRestart.addEventListener("mouseover", soundButton);

  let loseRestart = document.querySelector("#lose_restart");
  loseRestart.addEventListener("click", startUp);
  loseRestart.addEventListener("mouseover", soundButton);
}

function soundButton() {
  let but = document.querySelector("#sound_button");
  but.volume = 0.2;
  but.currentTime = 0;
  but.play();
}

function startUp() {
  document.querySelector("#accuracy_count").textContent = "???";
  isGameRunning = true;

  soundBackground();
  addAnimations();
  registerClick();
  addPositions();
  finishAnimation();
  hideScreens();
  startTimer();
}

function soundBackground() {
  console.log("soundBackground");

  let lose = document.querySelector("#sound_lose");
  lose.currentTime = 0;
  lose.pause();

  let win = document.querySelector("#sound_win");
  win.currentTime = 0;
  win.pause();

  let sound = document.querySelector("#sound_background");
  sound.volume = 1;
  sound.play();
  sound.loop = true;
}

function addAnimations() {
  console.log("addAnimations");
  document.querySelectorAll(".sprite").forEach((sprite) => sprite.classList.add("rotate2"));
  document.querySelectorAll(".fall").forEach((container) => container.classList.add("falling1"));

  document.querySelector("#alien_container1").classList.add("line1");
  document.querySelector("#alien_container2").classList.add("line4");
}

function registerClick() {
  console.log("registerClick");
  document.querySelectorAll(".good").forEach((container) => container.addEventListener("mousedown", clickGood));
  document.querySelectorAll(".bad").forEach((container) => container.addEventListener("mousedown", clickBad));
  document.querySelector("#background").addEventListener("mousedown", addClickz);
}

function addPositions() {
  console.log("addPositions");

  document.querySelector("#water_container").classList.add("vertical1");
  document.querySelector("#air_container").classList.add("vertical3");
  document.querySelector("#fuel_container").classList.add("vertical5");
  document.querySelector("#banana_container").classList.add("vertical7");
  document.querySelector("#rotten_container").classList.add("vertical9");
  document.querySelector("#alien_container1").classList.add("horizontal1");
  document.querySelector("#alien_container2").classList.add("horizontal5");
}

function finishAnimation() {
  console.log("finishAnimation");
  if ((isGameRunning = true)) {
    document.querySelectorAll(".fall").forEach((container) => container.addEventListener("animationend", newFall));
    document.querySelector("#alien_container1").addEventListener("animationend", newLine);
    document.querySelector("#alien_container2").addEventListener("animationend", newLine);
  }
}

function hideScreens() {
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
  document.querySelector("#start").classList.add("hidden");
}

function startTimer() {
  let time = document.querySelector("#time_container");
  time.querySelector("#time_sprite").classList.add("shrink");
  time.addEventListener("animationend", timeIsUp);
}

function newFall() {
  let pos = this;
  pos.classList.remove("falling1", "falling2", "falling3");
  let f = Math.ceil(Math.random() * 3);
  pos.offsetLeft;
  pos.classList.add("falling" + f);
  newVertical.call(this);
}

function newVertical() {
  let pos = this;
  pos.classList.remove("vertical1", "vertical2", "vertical3", "vertical4", "vertical5", "vertical6", "vertical7", "vertical8", "vertical9", "vertical10");
  let v = Math.ceil(Math.random() * 10);
  pos.offsetLeft;
  pos.classList.add("vertical" + v);
}

function newLine() {
  let pos = this;
  pos.classList.remove("line1", "line2", "line3", "line4");
  let l = Math.ceil(Math.random() * 4);
  pos.offsetLeft;
  pos.classList.add("line" + l);
  newHeight.call(this);
}

function newHeight() {
  let pos = this;
  pos.classList.remove("horizontal1", "horizontal2", "horizontal3", "horizontal4", "horizontal5", "horizontal6", "horizontal7", "horizontal8", "horizontal9", "horizontal10");
  let h = Math.ceil(Math.random() * 7);
  pos.offsetLeft;
  pos.classList.add("horizontal" + h);
}

function clickGood() {
  console.log("clickGood");
  let good = this;

  if (good == document.querySelector("#water_container")) {
    console.log("sound_water");
    let water = document.querySelector("#sound_water");
    water.currentTime = 0;
    water.volume = 0.5;
    water.play();
  } else if (Math.random() >= 0.66) {
    console.log("sound_good1");
    let good1 = document.querySelector("#sound_good1");
    good1.currentTime = 0;
    good1.volume = 0.5;
    good1.play();
  } else if (Math.random() <= 0.33) {
    console.log("sound_good2");
    let good2 = document.querySelector("#sound_good2");
    good2.currentTime = 0;
    good2.volume = 0.4;
    good2.play();
  } else {
    console.log("sound_good3");
    let good3 = document.querySelector("#sound_good3");
    good3.currentTime = 0;
    good3.volume = 0.3;
    good3.play();
  }

  good.removeEventListener("mousedown", clickGood);
  good.classList.add("paused");
  good.querySelector("img").classList.add("click_good");
  good.addEventListener("animationend", restartGood);

  addPoints();
}

function restartGood() {
  console.log("restartGood");
  let good = this;
  good.removeEventListener("animationend", restartGood);
  good.classList.remove("paused");
   good.classList.remove("falling1", "falling2", "falling3");
   good.querySelector("img").classList.remove("click_good");

  if (isGameRunning) {
    good.addEventListener("mousedown", clickGood);

    newFall.call(this);
  }
}

function clickBad() {
  console.log("clickBad");
  let rot1 = document.querySelector("#sound_yuck1");
  let rot2 = document.querySelector("#sound_yuck2");
  let alien = document.querySelector("#sound_alien");
  let bad = this;

  addClickz();

  bad.removeEventListener("mousedown", clickBad);
  bad.classList.add("paused");
  bad.querySelector("img").classList.add("click_bad");
  bad.addEventListener("animationend", restartBad);

  if (bad == document.querySelector("#alien_container1") || bad == document.querySelector("#alien_container2")) {
    console.log("CLICKALIEN");
    alien.currentTime = 0;
    alien.play();

    removeHp();
  } else if (Math.random() >= 0.5) {
    console.log("CLICKROTTEN1");
    rot1.currentTime = 0;
    rot1.play();

    removePoints();
  } else {
    console.log("CLICKROTTEN2");
    rot2.currentTime = 0;
    rot2.volume = 0.5;
    rot2.play();

    removePoints();
  }
}

function restartBad() {
  console.log("restartbad");
  let bad = this;
  bad.removeEventListener("animationend", restartBad);
  bad.classList.remove("paused");
  bad.querySelector("img").classList.remove("click_bad");
  bad.addEventListener("mousedown", clickBad);

  bad.classList.remove("line1", "line2", "line3", "line4");
  bad.classList.remove("falling1", "falling2", "falling3");
  
  if (isGameRunning && bad.id == "rotten_container") {
    newFall.call(this);
  } else if (isGameRunning) {
    newLine.call(this);
  }
}

function addPoints() {
  console.log("addPoints");
  points++;
  goodClickz++;
  addClickz();
  document.querySelector("#score_image").classList.add("gainStuff");
  document.querySelector("#score_image").addEventListener("animationend", displayPoints);
  if (points >= 5) {
    youWin();
  }
}

function removePoints() {
  points -= 5;
  document.querySelector("#score_image").classList.add("loseStuff");
  document.querySelector("#score_image").addEventListener("animationend", displayPoints);
}
function displayPoints() {
  console.log("displayPoints");
  let board = document.querySelector("#score_board");
  board.querySelector("span").textContent = points;
  board.querySelector("img").classList.remove("gainStuff");
  board.querySelector("img").classList.remove("loseStuff");
}

function removeHp() {
  console.log("removeHp");
  updateHp();
  hp--;
  if (hp <= 0) {
    youLose();
  }
}

function updateHp() {
  console.log("updateHp");
  document.querySelector("#hp" + hp).classList.remove("alivege");
  document.querySelector("#hp" + hp).classList.add("deadge");
}
function addClickz() {
  console.log("addClickz");
  totalClickz++;
  displayClickz();
}

function displayClickz() {
  console.log("Clickz");
  accuracy = goodClickz / totalClickz;
  finalScore = (accuracy + 1) * points;

  console.log(accuracy);
  document.querySelector("#accuracy_count").textContent = (accuracy * 100).toFixed(2) + "%";
}

function timeIsUp() {
  console.log("timeIsUp");

  if (finalScore >= 35) {
    youWin();
  } else {
    youLose();
  }
}

function youWin() {
  console.log("You win!!!");

  document.querySelector("#sound_background").volume = 0.4;
  let sound = document.querySelector("#sound_win");
  sound.play();

  if (finalScore > highScore || highScore == undefined) {
    highScore = finalScore;
    console.log("HIGHSCORE=======================");
  }
  document.querySelector("#highscore_win").textContent = "Your highscore is: " + parseFloat(highScore.toFixed(2));

  document.querySelector("#level_complete").classList.remove("hidden");
  document.querySelector("#score_win").innerHTML = "Your score was: " + points + "<br /> With an accuracy of: " + (accuracy * 100).toFixed(2) + "%";
  document.querySelector("#final_win").textContent = "Total score: " + parseFloat(finalScore.toFixed(2));

  resetGame();
}

function youLose() {
  console.log("You lose :(");

  document.querySelector("#sound_background").pause();
  let sound = document.querySelector("#sound_lose");
  sound.play();

  if (finalScore > highScore || highScore == undefined) {
    highScore = finalScore;
    console.log("HIGHSCORE=======================");
  }
  document.querySelector("#highscore_lose").textContent = "Your highscore is: " + parseFloat(highScore.toFixed(2));

  document.querySelector("#game_over").classList.remove("hidden");
  document.querySelector("#score_lose").innerHTML = "Your score was: " + points + "<br /> With an accuracy of: " + (accuracy * 100).toFixed(2) + "%";
  document.querySelector("#final_lose").innerHTML = "Total score: " + parseFloat(finalScore.toFixed(2));

  resetGame();
}

function goToStart() {
  console.log("gotostart");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
  document.querySelector("#start").classList.remove("hidden");
}

function resetGame() {
  isGameRunning = false;

  document.querySelector("#time_sprite").classList.remove("shrink");

  removeEvents();
  resetVariables();
  gainHp();
  displayPoints();
  removeAnimations();
}

function removeAnimations() {
  console.log("remove animations");
  document.querySelectorAll(".container").forEach((container) => container.classList.remove("falling1", "falling2", "falling3", "line1", "line2", "line3", "line4"));
  document.querySelectorAll(".container").forEach((container) => container.offsetLeft);
  document.querySelectorAll(".sprite").forEach((sprite) => sprite.classList.remove("rotate2"));
}

function removeEvents() {
  console.log("removeEvents");
  document.querySelectorAll(".good").forEach((container) => container.removeEventListener("mousedown", clickGood));
  document.querySelectorAll(".bad").forEach((container) => container.removeEventListener("mousedown", clickBad));
  document.querySelector("#background").removeEventListener("mousedown", addClickz);
}

function resetVariables() {
  console.log("RESET!!!!!!!!!!!!!!!");
  points = 0;
  hp = 3;
  goodClickz = 0;
  finalScore = 0;
  accuracy = 0;
  totalClickz = 0;
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
