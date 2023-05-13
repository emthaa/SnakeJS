let board = document.querySelector("#board")
let board_size = 6
let boardArr = []
let con = document.querySelector('#console')

//TO DO: -> MAKE COLLISION WITH BODY AND WALL, SCORE, END GAME

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
      boardArr[y][x].style.backgroundColor = 'white'
      boardArr[y][x].style.border = 'none'

    }
  }
}

let pos = {
  y: 0,
  x: 0
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





let snakeHead = new snakeBod(0, 0, 0, 0, 0, 0)
let snakeHeadVis = boardArr[snakeHead.currYpos][snakeHead.currXpos]
let snakeBody = [snakeHead]
let snakeBodyVis = [snakeHeadVis]
snakeHeadVis.style.backgroundColor = 'rgb(0,200,0)'
snakeHeadVis.style.border = '3px solid black'
snakeBodyVis[0].style.backgroundColor = "rgb(0,200,0)"
    snakeBodyVis[0].style.border = '3px solid black'
function drawSnake(xpos, ypos) {
  snakeBody[0].currXpos += xpos
  snakeBody[0].currYpos += ypos
  for (i = 0; i < snakeBody.length; i++) {



    snakeBodyVis[i] = boardArr[snakeBody[i].currYpos][snakeBody[i].currXpos]

    snakeBodyVis[0].style.backgroundColor = "rgb(0,200,0)"
    snakeBodyVis[0].style.border = '3px solid black'
    snakeBodyVis[i].style.backgroundColor = 'green'
    snakeBodyVis[i].style.border = '3px solid black'
    
    if (snakeBody[i + 1]) {
      
      snakeBody[i + 1].currXpos = snakeBody[i].lastXpos;
      snakeBody[i + 1].currYpos = snakeBody[i].lastYpos;
      console.log('tail', snakeBody[i + 1], 'i', i + 1)
      snakeBodyVis[i + 1] = boardArr[snakeBody[i + 1].currYpos][snakeBody[i + 1].currXpos] //95 not defined
      snakeBodyVis[i + 1].style.backgroundColor = 'green'
      
    }
    
    snakeBody[i].lastXpos = snakeBody[i].currXpos;
    snakeBody[i].lastYpos = snakeBody[i].currYpos;
    
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
  console.log(snakeBody)
  con.innerHTML = snakeBody.length
}

function findAppleCord() {
  let foundSpot = false
  while (foundSpot == false) {
    yApplePos = Math.floor(Math.random() * board_size);
    xApplePos = Math.floor(Math.random() * board_size);
    let counter = 0 
    for(i = 0;i<snakeBody.length;i++){
      if(snakeBody[i].currXpos == xApplePos && snakeBody[i].currYpos == yApplePos){
        findAppleCord()
      }
    }

      return [xApplePos, yApplePos]
    

  }
  
}



function drawApple() {

  apple = boardArr[cords[1]][cords[0]]
  apple.style.backgroundColor = 'red'
  apple.style.border = '3px solid black'

  if (snakeBody[0].currYpos == cords[1] && snakeBody[0].currXpos == cords[0]) {
    growSnake()
    cords = findAppleCord()   //MAKE SNAKE GROW HERE <-----
    drawApple()

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

  canMoveUp = false //already moving up
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

const speed = 350
let intervalUp
let intervalRight
let intervalLeft
let intervalDown
cords = findAppleCord()

drawApple()
drawSnake(pos.x, pos.y)

document.addEventListener('keydown', function(event) {

  if (event.keyCode == 87 && canMoveUp == true) { //up
    clearInterval(intervalLeft);
    clearInterval(intervalRight);
    clearInterval(intervalDown);
    moveUp()
    intervalUp = setInterval(moveUp, speed)

  } else if (event.keyCode == 68 && canMoveRight == true) {
    clearInterval(intervalUp);
    clearInterval(intervalLeft);
    clearInterval(intervalDown);
    moveRight()
    intervalRight = setInterval(moveRight, speed)

  } else if (event.keyCode == 65 && canMoveLeft == true) {
    clearInterval(intervalUp);
    clearInterval(intervalRight);
    clearInterval(intervalDown);
    moveLeft()
    intervalLeft = setInterval(moveLeft, speed)
  } else if (event.keyCode == 83 && canMoveDown == true) {
    clearInterval(intervalUp);
    clearInterval(intervalRight);
    clearInterval(intervalLeft);
    moveDown()
    intervalDown = setInterval(moveDown, speed)
  }
});





