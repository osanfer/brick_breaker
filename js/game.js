$(document).ready(function () {
    initDB();
    initMenu();
    initKeyHandler();
    initBackground();
    initForeground();
    initHUD();
    resetGlobals();
    paintTitle();
});

function initGame() {
    player = new Paddle();
    balls.push(new Ball());
    FOREGROUND_CTX.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    // TODO pintar rotulo de nivel.
    nextLevel();
    LVL_WORKER.onmessage = function (e) {
        for (var i = 0; i < e.data.grid.length; i++) {
            currentGrid.push(new Brick(e.data.grid[i].row, e.data.grid[i].column, e.data.grid[i].lvl));
        }
        setTimeout("startLevel()", 2000);
    }
}

function gameLoop() {
    FOREGROUND_CTX.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    drawBricks();
    player.update();
    calculateCollisions();
    updatePowerUps();
    updateBalls();
    clearTimeout(gameCoolDown);
    updateHUD();
    if (currentGrid.length <= 0) {
        nextLevel();
    } else if (player.lifes > 0) {
        gameCoolDown = setTimeout("gameLoop()", 1000 / 66);
    } else {
        gameOver();
    }
}

function startLevel() {
    gameCoolDown = setTimeout("gameLoop()", 10);
}

function nextLevel() {
    FOREGROUND_CTX.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    currentLevel++;
    balls = new Array();
    player.reset();
    balls.push(new Ball());
    FOREGROUND_CTX.font = 'bold 50px Audiowide';
    FOREGROUND_CTX.fillStyle = 'white';
    FOREGROUND_CTX.textBaseline = 'top';
    FOREGROUND_CTX.textAlign = "center";
    FOREGROUND_CTX.fillText('LEVEL ' + currentLevel, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
    LVL_WORKER.postMessage({ "rows": ROWS, "columns": COLUMNS, "lvl": currentLevel });
}

function gameOver() {
    FOREGROUND_CTX.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    FOREGROUND_CTX.font = 'bold 50px Audiowide';
    FOREGROUND_CTX.fillStyle = '#730000';
    FOREGROUND_CTX.textBaseline = 'top';
    FOREGROUND_CTX.textAlign = "center";
    FOREGROUND_CTX.fillText('GAME OVER', SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
    for (var i = 0; i < HIGHSCORES.length; i++) {
        if (score > HIGHSCORES[i].score) {
            var initials = "";
            do {
                initials = getPlayerInitials();
            } while (initials.length == 0 || initials.length > 3);
            DB.insertScore(initials.toUpperCase(), currentLevel, score);
            break;
        }
    }
}