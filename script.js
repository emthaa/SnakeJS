let board = document.querySelector("#board")
let content = document.querySelector('#content')
let board_size = 6
let boardArr = []
let deadZoneX = []
let deadZoneY = []
let gameState = true
const squares = board_size * board_size

function calculateDeadZone() {
  for (i = -1; i < board_size; i++) {
    deadZoneY.push(-1)
    deadZoneX.push(i)
  }
  for (i = -1; i < board_size; i++) {
    deadZoneY.push(board_size)
    deadZoneX.push(i)
  }
  for (i = -1; i < board_size; i++) {
    deadZoneY.push(i)
    deadZoneX.push(-1)
  }
  for (i = -1; i < board_size; i++) {
    deadZoneY.push(i)
    deadZoneX.push(board_size)
  }

}


calculateDeadZone()


//TO DO: 
//BUGS:


board.style.gridTemplateColumns = `repeat(${board_size},1fr)`;
board.style.gridTemplateRows = `repeat(${board_size},1fr)`;

function createBoard() {
  for (let y = 0; y < board_size; y++) {
    boardArr[y] = []
    for (let x = 0; x < board_size; x++) {
      const square = document.createElement('div');
      square.className = "square";
      board.appendChild(square);
      boardArr[y][x] = square
    }
  }
}

createBoard()



function clearBoard() {
  for (let y = 0; y < board_size; y++) {
    for (let x = 0; x < board_size; x++) {
      drawApple()
      boardArr[y][x].style.backgroundColor = 'black'
      boardArr[y][x].style.border = 'none'

    }
  }
}


class snakeBod {
  constructor(currXpos, currYpos, nextXpos, nextYpos, lastXpos, lastYpos) {
    this.nextXpos = nextXpos;
    this.nextYpos = nextYpos;
    this.currXpos = currXpos;
    this.currYpos = currYpos;
    this.lastXpos = lastXpos;
    this.lastYpos = lastYpos;
  }
}



let snakeHead = new snakeBod(2, 2, 0, 0, 0, 0)
let snakeHeadVis = boardArr[snakeHead.currYpos][snakeHead.currXpos]
let snakeBody = [snakeHead]
let snakeBodyVis = [snakeHeadVis]

snakeHeadVis.style.backgroundColor = 'rgb(0,200,0)'
snakeHeadVis.style.border = '3px solid black'
let check1 = false
let check2 = false

function drawSnake(xpos, ypos) {
  snakeBody[0].currXpos += xpos
  snakeBody[0].currYpos += ypos
  if (check1 == true || check2 == true) {
    return
  }
  check1 = deadZoneCheckCollision()

  for (i = 0; i < snakeBody.length; i++) {



    snakeBodyVis[i] = boardArr[snakeBody[i].currYpos][snakeBody[i].currXpos]


    snakeBodyVis[i].style.backgroundColor = 'green'
    snakeBodyVis[i].style.border = '3px solid black'
    snakeBodyVis[0].style.backgroundColor = "rgb(0,200,0)"
    snakeBodyVis[0].style.border = '3px solid black'
    if (snakeBody[i + 1]) {

      snakeBody[i + 1].currXpos = snakeBody[i].lastXpos;
      snakeBody[i + 1].currYpos = snakeBody[i].lastYpos;

      console.log('tail', snakeBody[i + 1], 'i', i + 1)
      snakeBodyVis[i + 1] = boardArr[snakeBody[i + 1].currYpos][snakeBody[i + 1].currXpos]
      snakeBodyVis[i + 1].style.backgroundColor = 'green'

    }

    snakeBody[i].lastXpos = snakeBody[i].currXpos;
    snakeBody[i].lastYpos = snakeBody[i].currYpos;

  }
  check2 = checkBodyCollision()
}

function gameOver() {
  gameState = false;
  const GameOverScreen = document.createElement('div')
  GameOverScreen.id = 'GameOverScreen'
  content.appendChild(GameOverScreen)

  const GameOverText = document.createElement('div')
  GameOverText.id = 'GameOverText'
  GameOverScreen.appendChild(GameOverText)
  GameOverText.innerHTML = 'Game Over'

  const gameOverScore = document.createElement('div')
  gameOverScore.id = 'GameOverScore'
  GameOverScreen.appendChild(gameOverScore)
  gameOverScore.innerHTML = `Score: ${snakeBody.length * 100 - 100}`

  const gameOverButton = document.createElement('button')
  gameOverButton.id = 'gameOverButton'
  GameOverScreen.appendChild(gameOverButton)
  gameOverButton.innerHTML = 'Play Again'
  gameOverButton.addEventListener('click', function() {
    location.reload()
  })
}

function checkWin(){
  if(snakeBody.length == squares){
    win()
  }
}

function win(){
  gameState = false
}

function checkBodyCollision() {
  for (i = 1; i < snakeBody.length; i++) {
    if (snakeHead.currXpos == snakeBody[i].currXpos && snakeHead.currYpos == snakeBody[i].currYpos) {
      gameOver()
      return true
    }

  }


}

function deadZoneCheckCollision() {
  for (i = 0; i < deadZoneX.length; i++) {
    if (snakeHead.currXpos == deadZoneX[i] && snakeHead.currYpos == deadZoneY[i]) {
      gameOver()
      return true
    }
  }
}

function linkSnake() {
  for (i = 1; i < snakeBody.length; i++) {
    if (snakeBody[i + 1]) {
      snakeBody[i].nextXpos = snakeBody[i + 1].currXpos
      snakeBody[i].nextYpos = snakeBody[i + 1].currYpos
    }
  }
}

function growSnake() {
  let tail = snakeBody[snakeBody.length - 1];
  newTail = new snakeBod(tail.lastXpos, tail.lastYpos)
  snakeBody.push(newTail)
}

function findAppleCord() {
  while (true) {
    yApplePos = Math.floor(Math.random() * board_size);
    xApplePos = Math.floor(Math.random() * board_size);

    for (i = 0; i < snakeBody.length; i++) {
      if (snakeBody[i].currXpos == xApplePos && snakeBody[i].currYpos == yApplePos) {
        findAppleCord()
      }
    }

    return [xApplePos, yApplePos]


  }

}

function drawApple() {
  if (snakeBody.length != squares) {
    apple = boardArr[cords[1]][cords[0]]
    apple.style.backgroundColor = 'red'
    apple.style.border = '3px solid black'

    if (snakeBody[0].currYpos == cords[1] && snakeBody[0].currXpos == cords[0] && gameState != false) {
      growSnake()
      
      checkWin()
      cords = findAppleCord()
      drawApple()
    }
  }
}




canMoveUp = true
canMoveDown = true
canMoveLeft = false
canMoveRight = true

function moveUp() {
  clearBoard()
  drawApple()
  snakeBody[0].lastXpos = snakeBody[0].currXpos
  snakeBody[0].lastYpos = snakeBody[0].currYpos
  drawSnake(0, -1)
  canMoveUp = false
  canMoveDown = false
  canMoveLeft = true
  canMoveRight = true
}

function moveDown() {
  clearBoard()
  drawApple()
  snakeBody[0].lastXpos = snakeBody[0].currXpos
  snakeBody[0].lastYpos = snakeBody[0].currYpos
  drawSnake(0, 1)

  canMoveUp = false
  canMoveDown = false
  canMoveLeft = true
  canMoveRight = true
}

function moveRight() {
  clearBoard()
  drawApple()
  snakeBody[0].lastXpos = snakeBody[0].currXpos
  snakeBody[0].lastYpos = snakeBody[0].currYpos
  drawSnake(1, 0)

  canMoveUp = true
  canMoveDown = true
  canMoveLeft = false
  canMoveRight = false
}
function moveLeft() {
  clearBoard()
  drawApple()
  snakeBody[0].lastXpos = snakeBody[0].currXpos
  snakeBody[0].lastYpos = snakeBody[0].currYpos
  drawSnake(-1, 0)

  canMoveUp = true
  canMoveDown = true
  canMoveLeft = false
  canMoveRight = false
}

const speed = 200
let intervalUp
let intervalRight
let intervalLeft
let intervalDown
cords = findAppleCord()



drawApple()

document.addEventListener('keydown', function(event) {

  if (event.keyCode == 87 && canMoveUp == true && gameState != false) { //up
    clearInterval(intervalLeft);
    clearInterval(intervalRight);
    clearInterval(intervalDown);
    moveUp()
    intervalUp = setInterval(moveUp, speed)

  } else if (event.keyCode == 68 && canMoveRight == true && gameState != false) {
    clearInterval(intervalUp);
    clearInterval(intervalLeft);
    clearInterval(intervalDown);
    moveRight()
    intervalRight = setInterval(moveRight, speed)

  } else if (event.keyCode == 65 && canMoveLeft == true && gameState != false) {
    clearInterval(intervalUp);
    clearInterval(intervalRight);
    clearInterval(intervalDown);
    moveLeft()
    intervalLeft = setInterval(moveLeft, speed)
  } else if (event.keyCode == 83 && canMoveDown == true && gameState != false) {
    clearInterval(intervalUp);
    clearInterval(intervalRight);
    clearInterval(intervalLeft);
    moveDown()
    intervalDown = setInterval(moveDown, speed)
  }
});




