// Variables
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('start-button'); 
const stopButton = document.getElementById('stop-button');

const buttonUp = document.getElementById('buttonNorte');
const buttonDown = document.getElementById('buttonSur');
const buttonLeft = document.getElementById('buttonEste');
const buttonRight = document.getElementById('buttonOeste');

let snake = [{ x: 20, y:20 }];
let food = { x: 25, y: 25 };
let direction = 'right';
let score = 0;
let gameInterval;

// Functions
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * 20, food.y * 20, 20, 20);

    // Draw snake
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
    });

    document.addEventListener('DOMContentLoaded', function () {

      // Cambiar la ubicación de los botones
      buttonUp.style.gridColumn = '2';
      buttonUp.style.gridRow = '1';
    
      buttonDown.style.gridColumn = '1';
      buttonDown.style.gridRow = '2';
    
      buttonLeft.style.gridColumn = '3';
      buttonLeft.style.gridRow = '2';
    
      buttonRight.style.gridColumn = '2';
      buttonRight.style.gridRow = '3';
    });

     // Manejar clics en los botones
     buttonUp.addEventListener('click', handleButtonClick);
     buttonDown.addEventListener('click', handleButtonClick);
     buttonLeft.addEventListener('click', handleButtonClick);
     buttonRight.addEventListener('click', handleButtonClick);

    // mostrarAviso("rojo", "Puedes poner la versión tactil");
}

function move() {
    // Move the snake
    const head = { ...snake[0] };
    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }

    // Check for collisions
    if (head.x < 0 || head.x >= canvas.width / 20 || head.y < 0 || head.y >= canvas.height / 20) {
        stopGame();
        return;
    }

    if (head.x === food.x && head.y === food.y) {
        // Eat the food
        score++;
        scoreElement.textContent = score;
        generateFood();
    } else {
        // Remove the last segment of the snake
        snake.pop();
    }

    // Add the new head to the front of the snake
    snake.unshift(head);

    // Check for self-collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            stopGame();
            return;
        }
    }

    // Draw the updated game state
    draw();
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / 20)),
        y: Math.floor(Math.random() * (canvas.height / 20))
    };

    // Ensure the food is not generated on the snake
    for (const segment of snake) {
        if (food.x === segment.x && food.y === segment.y) {
            generateFood();
            break;
        }
    }
}

function startGame() {
    // Reset variables
    snake = [{ x: 10, y: 10 }];
    direction = 'right';
    score = 0;
    scoreElement.textContent = score;
    generateFood();

    // Start the game interval
    gameInterval = setInterval(move, 250);
}

function stopGame() {
    // Stop the game interval
    clearInterval(gameInterval);
    //score = 0;
    //.textContent = score;
    // Show a message or perform other actions as needed
    // For now, let's alert the score and restart the game
    //alert(`Game Over! Your score is ${score}`);
   // startGame();
 
}

/*
function move(){
  
// Event listeners for arrow key input
  document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
  });

}
*/

// Event listeners for buttons
startButton.addEventListener('click', startGame);
//stopButton.addEventListener('click', stopGame);

// Initial game setup
draw();

function update() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 1;
    document.getElementById("score").innerHTML = score;
    food = {
      x: Math.floor(Math.random() * (canvas.width / snakeSize)),
      y: Math.floor(Math.random() * (canvas.height / snakeSize)),
    };
    saveScore(); // Guarda la puntuación
  } else {
    snake.pop();
  }
  if (
    head.x < 0 ||
    head.x >= canvas.width / snakeSize ||
    head.y < 0 ||
    head.y >= canvas.height / snakeSize ||
    checkCollision(head.x, head.y, snake.slice(1))
  ) {
    clearInterval(game);
    stop(game)
    //alert("Game Over");
    restartGame(); // Llama a la función para reiniciar el juego
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.forEach(drawSnakePart);
  drawFood();
}

function saveScore() {
  // Get player name and score
  var playerName = document.getElementById("playerName").value;
  var score2 =  score
  console.log(score)

  // Save score to configuration file (you may use localStorage, a server, etc.)
  // Example using localStorage:
  var scores = JSON.parse(localStorage.getItem("scores")) || [];
  scores.push({ name: playerName, score: score });
  localStorage.setItem("scores", JSON.stringify(scores));

  // Update score container
  updateScoreContainer();

  // Update leaderboard
  updateLeaderboard();
}


function updateScoreContainer() {
  
  // Update the score container with the scores from the configuration file
  var scores = JSON.parse(localStorage.getItem("scores")) || [];
  // Display scores
  


  var scoreContainer = document.getElementById("scoreContainer");
  scoreContainer.innerHTML = "";

    // Limitar la cantidad de puntajes a 10
    //scores = scores.slice(0, 10);


  scores.forEach(function (entry) {
    var scoreElement = document.createElement("div");
    scoreElement.textContent = entry.name + ": " + entry.score;
    scoreContainer.appendChild(scoreElement);
  });

  // Agregar el nuevo puntaje
 // scores.push({ name: playerName, score: score });

// Guardar el array actualizado en el almacenamiento local
 // localStorage.setItem("scores", JSON.stringify(scores));

  
}

function updateLeaderboard() {
  // Update the leaderboard with the top players
  var scores = JSON.parse(localStorage.getItem("scores")) || [];
  var leaderboard = document.getElementById("leaderboard");
  leaderboard.innerHTML = "";

  
  // Sort scores in descending order
  scores.sort(function (a, b) {
    return b.score - a.score;
  });

  // Display top 3 players
  for (var i = 0; i < Math.min(scores.length, 3); i++) {
    var leaderboardItem = document.createElement("li");
    leaderboardItem.style.fontSize = i === 0 ? "20px" : "inherit";
    leaderboardItem.textContent = scores[i].name + ": " + scores[i].score;
    leaderboard.appendChild(leaderboardItem);
  }
  
}

// Initialize the game and update panels on page load
// Your game initialization code goes here

// Update score container and leaderboard
updateScoreContainer();
updateLeaderboard();

// Muestra todos los resultados guardados
function removePanelScore(){
     // Obtener el elemento div por su id
      var displayLeyendaTemporales = $("#scoreContainer").css('display')
      if (displayLeyendaTemporales  == 'none'){
        $("#scoreContainer").css({"display": "block"});
      }
      else{
        $("#scoreContainer").css({"display": "none"});
      }

}



function changeDirection(newDirection) {
  direction = newDirection;
}

function handleButtonClick(event) {
  const buttonId = event.target.id;

  switch (buttonId) {
      case 'buttonNorte':
          changeDirection('up');
          break;
      case 'buttonSur':
          changeDirection('left');
          break;
      case 'buttonOeste':
          changeDirection('down');
          break;
      case 'buttonEste':
          changeDirection('right');
          break;
  }
}


//-- Pantalla completa 
/*
var fullScreem = window[mapJson.nombre].on('fullscreenchange', function () {
  if (window[mapJson.nombre].isFullscreen()) {
    multimapaFullScreen=true;
    
  } else {
    multimapaFullScreen=false;
    window[mapJson.nombre].closePopup()
  }
       });
       
   optionsFullscreem = {
   position: 'topright', 
   }
   
   window[mapJson.nombre].addControl(new L.Control.Fullscreen(optionsFullscreem));
*/