let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

document.addEventListener("keydown", function (event) {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function (event) {
  const color = this.getAttribute("id")

  userClickedPattern.push(color); 
  playSound(color);
  flashElement(color);

  checkAnswers(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  const chosenColor = choseColor();
  level++;

  gamePattern.push(chosenColor);

  console.log(chosenColor);

  playSound(chosenColor);
  flashElement(chosenColor);

  $("h1").text("Level " + level);
}

function choseColor() {
  const colors = ["green", "red", "yellow", "blue"];

  rand = Math.floor(Math.random() * 4);

  return colors[rand];
}

function flashElement(element) {
  $("." + element).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playSound(color) {
  new Audio(src = "sounds/" + color + ".mp3").play();
}

function checkAnswers(level) {
  for (let i = 0; i <= level; i++) {
    if (gamePattern[i] != userClickedPattern[i]) {
      playSound("wrong");
      gameOver();
    }
  }
  if (gamePattern.length === userClickedPattern.length) {
    setTimeout(function () {
      nextSequence()
    }, 1000);
  }
}

function gameOver() {
  $("body").addClass("game-over");
  $("h1").text("Game Over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 1000);
  startOver();
}

function startOver() {
  gamePattern = [];
  level = 0;
  started = false;
  $("h1").text("Press any key to start");
}
