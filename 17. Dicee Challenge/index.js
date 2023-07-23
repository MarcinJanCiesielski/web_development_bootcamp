let randomNumber1;
let randomNumber2;
let img1 = "";
let img2 = "";
let text = "";

randomNumber1 = dice();
randomNumber2 = dice();

img1 = "images/dice" + randomNumber1 +".png";
img2 = "images/dice" + randomNumber2 + ".png";

document.querySelector(".img1").setAttribute("src", img1);
document.querySelector(".img2").setAttribute("src", img2);

if (randomNumber1 > randomNumber2) {
  text = "🚩 Player1 won!";
} else if(randomNumber1 < randomNumber2) {
text = "Player2 won! 🚩";
} else {
  text = "Tie!";
}

document.querySelector("h1").innerHTML = text;


function dice() {
  return Math.floor(Math.random() * 6) + 1;
}
