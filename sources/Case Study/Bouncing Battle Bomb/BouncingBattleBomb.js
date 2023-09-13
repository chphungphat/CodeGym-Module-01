const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//Circle
let x = canvas.width/2;
let y = canvas.height/2;
let radius = 15;
let setXY = [8, -8, 7, -7 ,6, -6]
let dx = setXY[Math.floor(Math.random() * 5)];
let dy = setXY[Math.floor(Math.random() * 5)];
let tempdx = dx;
let tempdy = dy;

//Paddle
let paddleHeight = 60;
let paddleWidth = 130;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = (canvas.height - paddleHeight);
let rightPress = false;
let leftPress = false;

//Brick
let brick = [];
let brickRow = 2;
let brickColumn = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffSetTop = 40;    
let brickOffSetLeft = 100;
let brickOffsetPadding = 80;

//Square
let squareX = Math.floor(Math.random() * 880 + 30);
let squareY = 240;
let squareWidth = 70;
let setPN = [1, -1]
let squareSpeed = (Math.floor(Math.random() * 7 + 12)) * setPN[Math.round(Math.random())];
let sCount = 0;

let score = 0;

//Image
let imgBomb =  new Image();
let imgUfo = new Image();
let imgTank = new Image();
let imgAlien = new Image();
imgBomb.src = 'bomb.png';
imgUfo.src = 'ufo.png';
imgTank.src = 'tank.png';
imgAlien.src = 'alien.png'

//Audio
let soundtrack = new Audio('soundtrack.mp3');
let explosion = new Audio('explosion.wav');
let you_lose = new Audio('you_lose.wav');
let victory = new Audio('victory.mp3');

for (let i = 0; i < brickColumn; i++) {
    brick[i] = [];
    for (let j = 0; j < brickRow; j++) {
        brick[i][j] = {
            x: 0,
            y: 0,
            status: 1
        };      
    }
}

function paddleKeyUp(e) {
    if (e.key == 'ArrowRight' || e.key == 'Right') {
        rightPress = false;
    } else if (e.key == 'ArrowLeft' || e.key == 'Left') {
        leftPress = false;
    }
}
function paddleKeyDown(e) {
    if (e.key == 'ArrowRight' || e.key == 'Right') {
        rightPress = true;
    } else if (e.key == 'ArrowLeft' || e.key == 'Left') {
        leftPress = true;
    }
}

// function mouseMove(e) {
//     const relativeX = e.clientX - canvas.offsetLeft;
//     if (relativeX > 0 && relativeX < canvas.width) {
//         paddleX = relativeX - paddleWidth/2;
//     }
// }

function drawCircle() {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.drawImage(imgBomb, x - radius - 5, y - radius - 17 , radius * 3.5, radius * 3.5);
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    // ctx.fillStyle = 'blue';
    // ctx.fill();
    ctx.drawImage(imgTank, paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.closePath();
}
function drawBircks() {
    for (let i = 0; i < brickColumn; i++) {
        for (let j = 0; j < brickRow; j++) {
            if (brick[i][j].status == 1) {
                let brickX = i * (brickWidth + brickPadding + brickOffsetPadding) + brickOffSetLeft;
                let brickY = j * (brickHeight + brickPadding + + brickOffsetPadding) + brickOffSetTop;
                brick[i][j].x = brickX;
                brick[i][j].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                // ctx.fillStyle = 'blue';
                // ctx.fill();
                ctx.drawImage(imgAlien, brickX, brickY, brickWidth, brickHeight);
                ctx.closePath();
            }
        }
    }
}

function drawSquare() {
    ctx.beginPath();
    ctx.rect(squareX, squareY, squareWidth, squareWidth);
    // ctx.fillStyle = 'green';
    // ctx.fill();
    ctx.drawImage(imgUfo, squareX - 10, squareY, squareWidth + 20, squareWidth)
    ctx.closePath();
}

function drawScore() {
    ctx.font = '25px Arial';
    ctx.fillStyle = 'rgb(95, 20, 20)';
    ctx.fillText('Score: ' + score, 8, 20);
}

function collisionDetectionBrick() {
    for (let i = 0; i < brickColumn; i++) {
        for (let j = 0; j < brickRow; j++) {
            const b = brick[i][j];
            if (b.status == 1) {
                if (x + radius > b.x &&
                    x - radius < b.x + brickWidth && 
                    y + radius > b.y &&
                    y - radius < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;  
                    score++;
                    explosion.play();
                    if (score == brickColumn * brickRow) {
                        victory.play();
                        alert('YOU WIN');
                        document.location.reload();
                        cancelAnimationFrame(requestID);
                    }
                }
            }
        }
    }
}

function movePaddle() {
    if (rightPress) {
        paddleX += 15;
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }
    } else if (leftPress) {
        paddleX -= 15;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }
}

function moveBall() {
    x += dx;
    y += dy;
    if (x - radius < 0 || x + radius > canvas.width) {
        dx = -dx;
    }
    if (y - radius < 0) {
        dy = -dy;
    } else if (y + radius >= canvas.height - paddleHeight) {
        if (y + radius < canvas.height) {
            if (x + radius > paddleX - dx && x - radius < paddleX + paddleWidth + dx ){
                dy = -dy;
            }
        } else if (y + radius >= canvas.height) {
            you_lose.play();
            // alert('YOU DIED');
            ctx.font = '80px Arial';
            ctx.fillStyle = 'rgb(95, 20, 20)';
            ctx.fillText('YOU DIED', canvas.width/3, canvas.height/2);
            ctx.font = '60px Arial';
            ctx.fillStyle = 'rgb(95, 20, 20)';
            ctx.fillText('Press R to replay', canvas.width/3, canvas.height/2 + 70);
            // document.location.reload();
            cancelAnimationFrame();
            
        }
    }
}
function moveSquare() {
    squareX += squareSpeed;
    if (squareX < 0 || squareX + squareWidth > canvas.width) {
        squareSpeed = -squareSpeed;
    }
}
function collisionDetectionSquare() {
    if (x + radius >= squareX &&
        x <= squareX + squareWidth &&
        y + radius >= squareY &&
        y <= squareY + squareWidth) {
           squareY = Math.floor(Math.random() * 201 + 240);
           squareSpeed = (Math.floor(Math.random() * 7 + 14)) * setPN[Math.round(Math.random())];
           x = squareX + squareWidth/2;
           y = squareY + squareWidth + radius;
           let tempX = [-8, 8, -7, 7, -6, 6];
           let tempY = [8, 7, 6];
           dx = tempX[Math.floor(Math.random() * 5)];
           dy = tempY[Math.floor(Math.random() * 2)];
        }
}

document.addEventListener('keyup', paddleKeyUp);
document.addEventListener('keydown', paddleKeyDown);
document.addEventListener('keydown', playGame);
document.addEventListener('keydown', pauseGame);
document.addEventListener('keydown', playSoundtrack);
document.addEventListener('keydown', pauseSoundtrack);
document.addEventListener('keydown', reloadPage);

let requestID;
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCircle();
    drawPaddle();
    drawBircks();
    drawSquare();
    drawScore();
    moveBall();
    movePaddle();
    collisionDetectionBrick();
    moveSquare();
    collisionDetectionSquare();
    requestID = requestAnimationFrame(draw);
}

function playGame(e) {
    if (e.key == ' ') {
        draw();
    }
}

function pauseGame(e) {
    if (e.key == 'p') {
        cancelAnimationFrame(requestID);
    }
}
function playSoundtrack(e) {
    if (e.key == 'm') {
        soundtrack.play();
    }
}
function pauseSoundtrack(e) {
    if (e.key == 'n') {
        soundtrack.pause();
    }
}
function reloadPage(e) {
    if (e.key == 'r') {
        document.location.reload();
    }
}