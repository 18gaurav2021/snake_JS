'use strict';
//game constants & variables
let snake_direction = { x: 0, y: 0 };
const gamoOverSound = new Audio('gameover.wav');
const musicSound = new Audio('music.wav');
const foodSound = new Audio('food.wav');
const moveSound = new Audio('move.wav');
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };
let score = 0;
let highScore = 0;
const speed = 5;
//game function
function main(ctime) {
  window.requestAnimationFrame(main);
  //   console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}
function isCollide(sarr) {
  //if you bump into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) {
      return true;
    }
  }
  //if you touch the wall
 if (sarr[0].x>=18||sarr[0].x<=0 ||sarr[0].y >= 18||sarr[0].y<=0)
  {
    return true;
  }
  return false;
}

function gameEngine() {
  //Part1:Updating the snake variables(Array)
  if (isCollide(snakeArr)) {
    gamoOverSound.play();
    musicSound.pause();
    alert('Game over , press any key to start the game');
    snakeArr = [{ x: 7, y: 3 }];
    // musicSound.play();
    score = 0;
  }

  //if eaten food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    score += 1;
    scoreBox.innerHTML = 'score:' + score;
    foodSound.play();
    let a = 2;
    let b = 16;
    snakeArr.unshift({
      x: snakeArr[0].x + snake_direction.x,
      y: snakeArr[0].y + snake_direction.y,
    });
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //Move the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += snake_direction.x;
  snakeArr[0].y += snake_direction.y;

  //Part2: Render/Dsiplay the food

  //Display the snake
  flexitems.innerHTML = '';
  snakeArr.forEach((e, index) => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add('head');
    } else {
      snakeElement.classList.add('snake');
    }

    flexitems.appendChild(snakeElement);
  });

  //Display the food
  const foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');
  flexitems.appendChild(foodElement);
}
//main logic starts here
window.requestAnimationFrame(main);
bt1.addEventListener('click',foo=>{
  snake_direction = { x: 0, y: -1 }; //start the game
  window.addEventListener('keydown', e => {
  if(e.key === ' ' || e.key === 'Spacebar'){
    snakeArr[0].x = snake_direction.x;
    snakeArr[0].y = snake_direction.y;
    
  }
  // moveSound.play();
  else{
    switch (e.key) {
      case 'ArrowUp':
        console.log('ArrowUp key pressed');
        snake_direction.x = 0;
        snake_direction.y = -1;
        break;
      case 'ArrowDown':
        console.log('ArrowDown key pressed');
        snake_direction.x = 0;
        snake_direction.y = 1;
        break;
      case 'ArrowLeft':
        console.log('ArrowLeft key pressed');
        snake_direction.x = -1;
        snake_direction.y = 0;
        break;
      case 'ArrowRight':
        console.log('ArrowRight key pressed');
        snake_direction.x = 1;
        snake_direction.y = 0;
        break;
      default:
        break;
    }
  }
  
});
});
