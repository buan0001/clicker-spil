window.addEventListener("load", playStuff);

function playStuff() {
  console.log("clickStuff");
  document
    .querySelector("#water_container")
    .addEventListener("mousedown", clickWater);
  document
    .querySelector("#alien_container")
    .addEventListener("mousedown", clickAlien);
}

function clickWater() {
  console.log("clickWater");
  document
    .querySelector("#water_container")
    .removeEventListener("mousedown", clickWater);
  document.querySelector("#water_container").classList.add("paused");
  document.querySelector("#water_sprite").classList.add("good");
  document
    .querySelector("#water_sprite")
    .addEventListener("animationend", restartWater);
}

function restartWater() {
  console.log("restartWater");
  document.querySelector("#water_container").classList.remove("paused");
  document.querySelector("#water_sprite").classList.remove("good");
  document.querySelector("#water_container").classList.remove("falling1");
  document.querySelector("#water_container").offsetLeft;
  document.querySelector("#water_container").classList.add("falling1");
  document
    .querySelector("#water_container")
    .addEventListener("mousedown", clickWater);
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
}

function restartAlien() {
  console.log("restartAlien");
  document.querySelector("#alien_container").classList.remove("paused");
  document.querySelector("#alien_sprite").classList.remove("bad");
  document.querySelector("#alien_container").classList.remove("falling2");
  document.querySelector("#alien_container").offsetLeft;
  document.querySelector("#alien_container").classList.add("falling2");
  document
    .querySelector("#alien_container")
    .addEventListener("mousedown", clickAlien);
}
