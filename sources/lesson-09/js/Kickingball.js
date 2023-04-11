let ball = document.getElementById("ballImage");

function initial() {
    ball = document.getElementById("ballImage");
    ball.style.position = "relative";
    ball.style.left = "0px";
}

document.getElementById("Clickme").addEventListener("click", moveRight);

function moveRight() {
    ball.style.left = parseInt(ball.style.left) + 10 +"px";
}

window.onload = initial;