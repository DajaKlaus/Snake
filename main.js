var score = 0;
var bestScore = 0;

let canvas = document.getElementById("game");
let context = canvas.getContext('2d');

let grid = 16;
let count = 0;

let snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    minCells: 1
}

let apple = {
    x: 320,
    y: 320
}

const gulpSound = new Audio('gulp.mp3');

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
    requestAnimationFrame(loop); //ripete all'infinito

    if (++count < 6) { //velocità
        return; 
    }

    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    snake.x += snake.dx;
    snake.y += snake.dy;

    // Gestione comparsa serpente dopo essere usiscito dalla griglia
    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    } else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    } else if (snake.y >= canvas.height) {
        snake.y = 0;
    }
    // ^^
    snake.cells.unshift({x: snake.x, y: snake.y});

    if (snake.cells.length > snake.minCells) {
        snake.cells.pop();
    }
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
    
    context.fillStyle = 'yellow';
    snake.cells.forEach(function(cell, index) { //creazione blocco successivo
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

        if (cell.x === apple.x && cell.y === apple.y) {
            snake.minCells++;
            apple.x = getRandomInt(0, 25) * grid;
            apple.y = getRandomInt(0, 25) * grid;
            gulpSound.play();
            score ++;
            if (score > bestScore) {
                bestScore = score; 
             }
            document.getElementById("punti").innerHTML = score;
            document.getElementById("Bpunti").innerHTML = bestScore;
        }

        for (let i = index + 1; i < snake.cells.length; i++) {
            if(cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                snake.x = 160;
                snake.y = 160;
                snake.cells = [];
                snake.minCells = 1;
                snake.dx = grid;
                snake.y = 0;


                apple.x = getRandomInt(0, 25) * grid;
                apple.y = getRandomInt(0, 25) * grid;

                score = 0;
                document.getElementById("punti").innerHTML = score;
            }
        }
    })
}

document.addEventListener('keydown', function (e) {
    if (e.keyCode === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    } else if (e.keyCode === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    } else if (e.keyCode === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    } else if (e.keyCode === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
})

requestAnimationFrame(loop);