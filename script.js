const pacman = document.getElementById('pacman');
const gameArea = document.getElementById('gameArea');

let pacmanX = 180;
let pacmanY = 180;
const pacmanSpeed = 5;

function movePacman(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (pacmanY > 0) pacmanY -= pacmanSpeed;
            break;
        case 'ArrowDown':
            if (pacmanY < gameArea.offsetHeight - pacman.offsetHeight) pacmanY += pacmanSpeed;
            break;
        case 'ArrowLeft':
            if (pacmanX > 0) pacmanX -= pacmanSpeed;
            break;
        case 'ArrowRight':
            if (pacmanX < gameArea.offsetWidth - pacman.offsetWidth) pacmanX += pacmanSpeed;
            break;
    }

    pacman.style.top = pacmanY + 'px';
    pacman.style.left = pacmanX + 'px';
}

// Detecta teclas pressionadas
document.addEventListener('keydown', movePacman);
