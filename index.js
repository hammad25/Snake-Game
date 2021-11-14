
// Game constants and Variables

let inputDir = {x : 0, y : 0};
const foodSound = new Audio("music/food.wav");
const gameOverSound = new Audio("music/gameover.wav");
const moveSound = new Audio("music/move.wav");
const musicSound = new Audio("music/backmusic.wav");
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
  {x : 13, y : 15}
]
food = {x : 6, y : 7};


// Game Functions
function main(ctime){
  window.requestAnimationFrame(main);
  // console.log(ctime)
  if((ctime - lastPaintTime) / 1000 < 1/speed){
    return;
  }

  lastPaintTime = ctime;
  gameEngine();
}

function iscollide(snake){
  // if snake bump into itself
  for (let i = 1; i < snakeArr.length; i++) {
    // it snake collaps with its body
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){ 
      return true;
    } 
  }
  // if snake bump into board borders
  if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){ 
    return true;

  } 

}

function gameEngine(){
  // Part 1: updating the snake array and food

  if(iscollide(snakeArr)){
    gameOverSound.play();
    musicSound.pause();
    inputDir = {x : 0, y : 0};
    alert("Game Over. Press any key to play again!")
    snakeArr = [{x : 13, y : 15}];  // to resest the game 
    // musicSound.play();
    score = 0;
  }

  // If you have eaten the food, increament the score and regenerate the food
  if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){   //match the coordinates
    foodSound.play();
    score += 1;
    scorebox.innerHTML = "Score: " + score;
    snakeArr.unshift({x : snakeArr[0].x + inputDir.x, y : snakeArr[0].y + inputDir.y})
    // now you have to update food location 
    let a = 2;
    let b = 16;
    food = {x : Math.round(a + (b - a)* Math.random()), y : Math.round(a + (b - a)* Math.random())} // generate randome number between a to b , (search on internet) 
  }


  // Move the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {  //we started from 2nd last element and then locate the last elemnt to 2nd last and move on
    snakeArr[i + 1] = {...snakeArr[i]};  
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Part 2: Display the snake and food
  //display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index)=>{
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if(index === 0){
      snakeElement.classList.add('head');
    }
    else{
      snakeElement.classList.add('snake')
    }
    board.appendChild(snakeElement);
  });

  // display the snake
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food')
  board.appendChild(foodElement);
}








// Main logic starts here
musicSound.play();
window.requestAnimationFrame(main);
window.addEventListener("keydown", e =>{
  inputDir = {x : 0, y : 1} //starts the game
  moveSound.play();
  switch (e.key) {
    case 'ArrowUp':
      console.log("ArrowUp ")
      inputDir.x = 0;    // basically these are velocities
      inputDir.y = -1;
      break;
  
    case 'ArrowDown':
      console.log("ArrowDown ")
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    
    case 'ArrowLeft':
      console.log("ArrowLeft")
      inputDir.x = -1;
      inputDir.y = 0;
      break; 

    case 'ArrowRight':
      console.log("ArrowRight")
      inputDir.x = 1;
      inputDir.y = 0;
      break;  
  
    default:
      break;
  }

});