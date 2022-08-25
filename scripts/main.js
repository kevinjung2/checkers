console.log('document loaded');

//grab canvas and declare context
const canvas = document.getElementById('canvas');
const scoreEle = document.getElementById('score');
const highscoreEle = document.getElementById('high')
const ctx = canvas.getContext('2d');

//define out varibles up here at the top
// 30 by 30 grid
const canvasSize = 600;
const cellSize = 20;
const gridSize = canvasSize/cellSize
const startPos = [10, 10];

let snakeSize = 5;
let snakePos = [...startPos];
let snake = [];
let direction = ""
let speed = 100
let score = 0

let highScore = window.sessionStorage.getItem('highScore') || 0
highscoreEle.innerHTML = highScore

let foodPos = []

//resize canvas
canvas.height = canvasSize;
canvas.width = canvasSize;

document.onkeydown = (e) => {
  switch (e.key) {
    case "w":
      if (direction != "down") {
        direction = "up";
      }
      break;
    case "a":
      if (direction != "right") {
        direction = "left";
      }
      break;
    case "s":
      if (direction != "up") {
        direction = "down";
      }
      break;
    case "d":
      if (direction != "left") {
        direction = "right";
      }
      break;
    case "p":
      debugger;
      break;
  };
};


function draw(){
  //fill background
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,canvasSize,canvasSize);

  ctx.fillStyle = 'red';
  ctx.fillRect(foodPos[0]*cellSize, foodPos[1]*cellSize, cellSize, cellSize)

  ctx.fillStyle = 'green';
  ctx.strokeStyle = 'white';

  ctx.fillRect(snakePos[0]*cellSize, snakePos[1]*cellSize, cellSize, cellSize);
  ctx.strokeRect(snakePos[0]*cellSize, snakePos[1]*cellSize, cellSize, cellSize);

  for(const segment of snake){
    //draw a snake head
    ctx.fillRect(segment[0]*cellSize, segment[1]*cellSize, cellSize, cellSize);
  };
};

function reset(){
  snakeSize = 5;
  snakePos = [...startPos];
  snake = [];
  direction = ""
  speed = 1000
  score = 0
  scoreEle.innerHTML = score
}

function gameOver(){
  if (highScore == score) {
    window.sessionStorage.setItem('highScore', highScore)
    window.alert(`New High Score!! ${highScore}`)
  }else{
    window.alert(`Game Over. Score: ${score}`)
  }
  reset()
}

function pickFood(){
  let x = Math.floor(Math.random() * gridSize);
  let y = Math.floor(Math.random() * gridSize);

  for(const segment of snake){
    if(segment[0] == x && segment[1] == y){
      pickFood()
      return
    }
  }

  foodPos = [x, y]
}

function update(){
  if (direction == "") {
    draw()
    return
  }

  snake.unshift([...snakePos]);

  switch (direction) {
    case "up":
      snakePos[1] -= 1;
      break;
    case "down":
      snakePos[1] += 1;
      break;
    case "left":
      snakePos[0] -= 1;
      break;
    case "right":
      snakePos[0] += 1;
      break;
  };

  if (snake.length > snakeSize) {
    snake.pop();
  }

  //LOOP
  if (snakePos[0] < 0) {
    snakePos[0] = gridSize - 1
  }

  if (snakePos[1] < 0) {
    snakePos[1] = gridSize - 1
  }

  if (snakePos[0] == gridSize) {
    snakePos[0] = 0
  }

  if (snakePos[1] == gridSize) {
    snakePos[1] = 0
  }


  for(const segment of snake){
    if(snakePos[0] == segment[0] && snakePos[1] == segment[1]){
      gameOver()
    }
  }

  if(snakePos[0] == foodPos[0] && snakePos[1] == foodPos[1]){
    score += 1;
    snakeSize += 1;
    scoreEle.innerHTML = score
    if (score > highScore) {
      highScore = score;
      highscoreEle.innerHTML = highScore
    }
    pickFood();
  }

  draw()
};

pickFood()
let gameLoop = setInterval(update, speed)
