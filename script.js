const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Configurações do jogo
const gridSize = 20;
const pacManSize = gridSize;
const speed = 5;
let pacManX = 180, pacManY = 180;
let pacManDirection = { x: speed, y: 0 };  // Direção inicial (direita)
let food = { x: 100, y: 100 }; // Posição inicial da comida
let score = 0;

// Função para desenhar o Pac-Man
function drawPacMan() {
    ctx.beginPath();
    ctx.arc(pacManX + pacManSize / 2, pacManY + pacManSize / 2, pacManSize / 2, 0.2 * Math.PI, 1.8 * Math.PI);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.closePath();
}

// Função para desenhar a comida
function drawFood() {
    ctx.beginPath();
    ctx.arc(food.x + gridSize / 2, food.y + gridSize / 2, gridSize / 4, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}

// Função para desenhar o labirinto
function drawMaze() {
    ctx.fillStyle = "#333";
    ctx.fillRect(40, 40, 320, 320); // Um exemplo de parede central
    // Adicionar mais paredes conforme necessário
}

// Função para mover o Pac-Man
function movePacMan() {
    pacManX += pacManDirection.x;
    pacManY += pacManDirection.y;

    // Colisão com a parede
    if (pacManX < 0 || pacManX >= canvas.width || pacManY < 0 || pacManY >= canvas.height) {
        pacManX -= pacManDirection.x;
        pacManY -= pacManDirection.y;
    }

    // Colisão com a comida
    if (pacManX === food.x && pacManY === food.y) {
        score++;
        spawnFood();
    }
}

// Função para gerar comida em uma posição aleatória
function spawnFood() {
    food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
}

// Função para lidar com as teclas pressionadas
function changeDirection(event) {
    switch (event.key) {
        case "ArrowUp":
            if (pacManDirection.y === 0) pacManDirection = { x: 0, y: -speed };
            break;
        case "ArrowDown":
            if (pacManDirection.y === 0) pacManDirection = { x: 0, y: speed };
            break;
        case "ArrowLeft":
            if (pacManDirection.x === 0) pacManDirection = { x: -speed, y: 0 };
            break;
        case "ArrowRight":
            if (pacManDirection.x === 0) pacManDirection = { x: speed, y: 0 };
            break;
    }
}

// Função principal de atualização do jogo
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpar a tela
    drawMaze(); // Desenhar o labirinto
    movePacMan(); // Mover o Pac-Man
    drawPacMan(); // Desenhar o Pac-Man
    drawFood(); // Desenhar a comida
    document.getElementById("score").innerText = `Score: ${score}`;

    // Atualizar o jogo a cada 100ms
    setTimeout(gameLoop, 100);
}

document.addEventListener("keydown", changeDirection);

// Iniciar o jogo
spawnFood();
gameLoop();
