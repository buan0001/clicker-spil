"use strict";

window.addEventListener("load", startButtons);

let points = 0;
let hp = 3;
let totalClickz = 0;
let goodClickz = 0;
let accuracy = 0
let finalScore = 0
let isGameRunning = false;
let highScore = localStorage.getItem("highScore");

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

  let loseResetHighscore = document.querySelector("#lose_resetHighscore");
  loseResetHighscore.addEventListener("click", resetHighscore);
  loseResetHighscore.addEventListener("mouseover", soundButton);
  
  let winResetHighscore = document.querySelector("#win_resetHighscore");
  winResetHighscore.addEventListener("click", resetHighscore);
  winResetHighscore.addEventListener("mouseover", soundButton);

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
  startTimer();

  // Beklager, havde allerede lavet state machine. Alt der har noget med "fade" at gøre er (ekstra) grimt
  // Ville ikke tilføje flere funktioner og skulle ændre i det

  document.querySelector("#elements").classList.remove("hidden");

  let start = document.querySelector("#start");
  start.classList.remove("fade_in");
  start.offsetLeft;
  start.classList.add("fade_out");
  start.addEventListener("animationend", hideScreens);

  let gameOver = document.querySelector("#game_over");
  gameOver.classList.remove("fade_in");
  gameOver.offsetLeft;
  gameOver.classList.add("fade_out");
  gameOver.addEventListener("animationend", hideScreens);

  let levelComplete = document.querySelector("#level_complete");
  levelComplete.classList.remove("fade_in");
  levelComplete.offsetLeft;
  levelComplete.classList.add("fade_out");
  levelComplete.addEventListener("animationend", hideScreens);

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
  let start = document.querySelector("#start");
  start.removeEventListener("animationend", hideScreens);
  start.classList.remove("fade_out");
  start.classList.add("hidden");

  let gameOver = document.querySelector("#game_over");
  gameOver.removeEventListener("animationend", hideScreens);
  gameOver.classList.remove("fade_out");
  gameOver.classList.add("hidden");
  gameOver.classList.remove("opague");

  let levelComplete = document.querySelector("#level_complete");
  levelComplete.removeEventListener("animationend", hideScreens);
  levelComplete.classList.remove("fade_out");
  levelComplete.classList.add("hidden");
  levelComplete.classList.remove("opague");
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
    if (points >= 4) {
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

  if (finalScore >= 70) {
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

  if (finalScore > highScore || highScore == null) {
    highScore = finalScore;
    localStorage.setItem("highScore", parseFloat(highScore.toFixed(2)));
    console.log("HIGHSCORE=======================");
  }

  document.querySelector("#elements").classList.add("hidden");
  document.querySelector("#level_complete").classList.remove("hidden");
  document.querySelector("#level_complete").classList.add("fade_in");

  document.querySelector("#score_win").innerHTML = "Your score was: " + points + "<br /> With an accuracy of: " + (accuracy * 100).toFixed(2) + "%";
  document.querySelector("#final_win").textContent = "Total score: " + parseFloat(finalScore.toFixed(2));
  document.querySelector("#highscore_win").textContent = "Your highscore is: " + localStorage.getItem("highScore");

  resetGame();
}

function youLose() {
  console.log("You lose :(");

  document.querySelector("#sound_background").pause();
  let sound = document.querySelector("#sound_lose");
  sound.play();

  if (finalScore > highScore || highScore == null) {
    highScore = finalScore;
    localStorage.setItem("highScore", parseFloat(highScore.toFixed(2)));
    console.log("HIGHSCORE=======================");
  }

  document.querySelector("#game_over").classList.remove("hidden");
  document.querySelector("#game_over").classList.add("fade_in");

  document.querySelector("#score_lose").innerHTML = "Your score was: " + points + "<br /> With an accuracy of: " + (accuracy * 100).toFixed(2) + "%";
  document.querySelector("#final_lose").innerHTML = "Total score: " + parseFloat(finalScore.toFixed(2));
  document.querySelector("#highscore_lose").textContent = "Your highscore is: " + localStorage.getItem("highScore");

  resetGame();
}

function goToStart() {
  console.log("gotostart");
  
  let gameOver = document.querySelector("#game_over");
  gameOver.classList.remove("fade_in");
  gameOver.offsetLeft;
  gameOver.classList.add("fade_out");
  gameOver.classList.add("opague");

  let levelComplete = document.querySelector("#level_complete");
  levelComplete.classList.remove("fade_in");
  levelComplete.offsetLeft;
  levelComplete.classList.add("fade_out");
  levelComplete.classList.add("opague");

  let start = document.querySelector("#start");
  start.classList.remove("hidden");
  start.classList.add("fade_in");

  document.querySelector("#elements").classList.remove("hidden");
}

function resetHighscore() {
  console.log("reset");
  localStorage.setItem("highScore", 0);
  document.querySelector("#highscore_lose").textContent = "Your highscore is: " + localStorage.getItem("highScore");
  document.querySelector("#highscore_win").textContent = "Your highscore is: " + localStorage.getItem("highScore");
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
