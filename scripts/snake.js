//written by Zoheb
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const playBtn = document.querySelector(".play-game-el");
const scoreEl = document.querySelector("#score-el");
let blockSize, rows, columns;
let score = 0;
let isPlaying = false;

function canvasDimensions() {
    if (canvas.width != 300 && innerWidth <= 550) {
        blockSize = 20;
        rows = 15;
        columns = 15;
        canvas.width = columns * blockSize;
        canvas.height = rows * blockSize;
        if (isPlaying) {
            gameOver();
        };
    } else if (canvas.width != 500 && innerWidth >= 550) {
        blockSize = 25;
        rows = 20;
        columns = 20;
        canvas.width = columns * blockSize;
        canvas.height = rows * blockSize;
        if (isPlaying) {
            gameOver();
        };
    }
}
canvasDimensions();

window.addEventListener('resize', () => {
    canvasDimensions();
});

//board
function drawBoard() {
    for (let i = 0; i < rows; i++) { //each row
        for (let j = 0; j < columns; j++) { //each col
            ctx.fillStyle = ((i + j) % 2 == 0) ? "#48A7F5" : "#52aefa"; //if i+j mod 2 = 0 #48A7F5 else #52aefa. This gives alternating board pattern
            ctx.fillRect(j * blockSize, i * blockSize, blockSize, blockSize);
        };
    };
};

//create snake
class Snake {
    constructor() {
        this.reset()
    }

    reset() {
        this.score = 0;
        this.x = 5 * blockSize;
        this.y = 2 * blockSize;
        this.dx = 0; //x direction
        this.dy = 0; //y direction
        this.size = blockSize;
        this.body = [];
        this.updated = false;
    }

    draw() {
        //draw head
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.size, this.size);
        //draw body
        for (let i = 0; i < this.body.length; i++) {
            ctx.fillRect(this.body[i][0], this.body[i][1], this.size, this.size);
        };
    };
    update() {
        //update body
        //move i body piece to i+1 body piece, start from the back
        //basically move each body segment to the pos of the body segment ahead
        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i] = this.body[i - 1];
        };
        if (this.body.length) {
            this.body[0] = [this.x, this.y];
        };
        //movement
        this.x += this.dx * this.size;
        this.y += this.dy * this.size;
        this.updated = true;
        this.draw();
        //border collision
        if (this.x <= -this.size || this.x >= canvas.width ||
            this.y <= -this.size || this.y >= canvas.height) {
            gameOver();
            //move apple offscreen - Has to be done because apple is drawn after snake. Even if Interval is cleared, it must finish running current code
            apple.x = -1 * blockSize
            return //no need to check below, games over
        };
        //apple collision
        if (this.x == apple.x && this.y == apple.y) {
            this.body.push([this.x - this.dx, this.y - this.dy])//create new body piece
            score++;
            scoreEl.innerText = score;
            apple.respawn();
        };
        //self collision
        for (let i = 0; i < this.body.length; i++) {
            if (this.x == this.body[i][0] && this.y == this.body[i][1]) {
                gameOver();
                break; //break loop, no need to check other collisions
            };
        };
    };
};

//apple
class Apple {
    constructor() {
        this.reset();
    };

    reset() {
        this.size = blockSize;
        this.x = Math.floor(Math.random() * columns) * this.size; //random col
        this.y = Math.floor(Math.random() * rows) * this.size; //random row
    }

    draw() {
        ctx.fillStyle = "rgba(255, 0, 0)";
        ctx.fillRect(this.x, this.y, this.size, this.size);
    };

    respawn() {
        this.x = Math.floor(Math.random() * columns) * this.size;
        this.y = Math.floor(Math.random() * rows) * this.size;
    };
};

const apple = new Apple;
const snake = new Snake;

//game over
function gameOver() {
    const text = document.querySelector("#game-over-text");
    text.innerText = "Game Over"
    clearInterval(animator);//end animator
    apple.x = -100; //move apple off screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);//clear board
    text.style.display = "block"
    isPlaying = false;
    const body = document.querySelector("body")
    body.style.overflowY = "auto";
};

//start game
playBtn.addEventListener("click", ()=>{
    startGame();
})
let animator;
function startGame() {
    setPageStyle();
    snake.reset();
    apple.reset();
    drawBoard();
    //save board
    //this prevents the need to redraw the board every 100ms using a for loop
    //decided to do this for optimisation
    let boardImg = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //snake direction
    window.addEventListener("keydown", (e) => {
        if(!snake.updated) return //make sure snake dy, dx has been set before setting new one 
        if ((e.key.toLowerCase() === "w" || e.key == "ArrowUp") && snake.dy == 0) { //move in 3 directions, don't move back
            snake.dy = -1;
            snake.dx = 0;
            snake.updated = false;
        } else if ((e.key.toLowerCase() === "s" || e.key == "ArrowDown") && snake.dy == 0) {
            snake.dy = 1;
            snake.dx = 0;
            snake.updated = false;
        } else if ((e.key.toLowerCase() === "a" || e.key == "ArrowLeft") && snake.dx == 0) {
            snake.dy = 0;
            snake.dx = -1;
            snake.updated = false;
        } else if ((e.key.toLowerCase() === "d" || e.key == "ArrowRight") && snake.dx == 0) {
            snake.dy = 0;
            snake.dx = 1;
            snake.updated = false;
        };
    });

    //animation handler
    animator = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(boardImg, 0, 0); //add board save img
        snake.update();
        apple.draw();
    }, 150);

    isPlaying = true;
}

function setPageStyle() {
    canvasX = canvas.getBoundingClientRect().height
    window.scrollTo(0, canvasX+(canvasX / 2))
    const body = document.querySelector("body")
    body.style.overflowY = "hidden";
    const text = document.querySelector("#game-over-text");
    text.style.display = "none"
    score = 0;
    scoreEl.innerText = score;
}
