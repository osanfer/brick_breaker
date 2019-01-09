/**
 * Inicializa el control de teclas.
 */
function initKeyHandler() {
    $(document).keydown(function (event) {
        if (event.key == "ArrowLeft") { player.direction = LEFT; }
        if (event.key == "ArrowRight") { player.direction = RIGHT; }
        if (event.key == " ") {
            for (var i = balls.length - 1; i >= 0; i--) {
                balls[i].isMoving = true;
            }
        }
    });

    $(document).keyup(function (event) {
        if (event.key == "ArrowLeft") {
            if (player.direction == LEFT) {
                player.direction = NONE;
            }
        }
        if (event.key == "ArrowRight") {
            if (player.direction == RIGHT) {
                player.direction = NONE;
            }
        }
    });
}

/**
 * Inicializa los manejadores que controlan los clicks sobre los elementos del menú.
 */
function initMenu() {
    $("#menu").css("left", SCREEN_WIDTH + 50);
    $("#play").click(function () {
        resetGlobals();
        initGame();
    });
    $("#instructions").click(function () {
        $("#instructions").find("p").toggle(500);
    });
    $("#score").click(function () {
        resetGlobals();
        FOREGROUND_CTX.font = 'bold 70px Audiowide';
        FOREGROUND_CTX.fillStyle = 'white';
        FOREGROUND_CTX.textBaseline = 'top';
        FOREGROUND_CTX.textAlign = "center";
        FOREGROUND_CTX.fillText('HIGHSCORES', SCREEN_WIDTH / 2, 40);
        FOREGROUND_CTX.font = 'bold 30px Audiowide';
        for (var i = 0; i < HIGHSCORES.length; i++) {
            FOREGROUND_CTX.textAlign = "start";
            FOREGROUND_CTX.fillText('' + HIGHSCORES[i].player, 50, 150 + i * 45);
            FOREGROUND_CTX.textAlign = "start";
            FOREGROUND_CTX.fillText('LEVEL ' + HIGHSCORES[i].level, SCREEN_WIDTH / 3, 150 + i * 45);
            FOREGROUND_CTX.textAlign = "end";
            FOREGROUND_CTX.fillText('' + HIGHSCORES[i].score, SCREEN_WIDTH - 50, 150 + i * 45);
        }
    });
    $("#credits").click(function () {
        $("#credits").find("p").toggle(500);
    });
}

/**
 * Inicializa el canvas del fondo, que no se ha de actualizar.
 */
function initBackground() {
    $("#backgroundCanvas").attr("width", SCREEN_WIDTH);
    $("#backgroundCanvas").attr("height", SCREEN_HEIGHT);
    BACKGROUND_CTX = document.getElementById("backgroundCanvas").getContext("2d");
    var backgroundImg = new Image();
    backgroundImg.onload = function () {
        var pattern = BACKGROUND_CTX.createPattern(backgroundImg, 'repeat');
        BACKGROUND_CTX.rect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        BACKGROUND_CTX.fillStyle = pattern;
        BACKGROUND_CTX.fill();
    };
    backgroundImg.src = "img/background.png"
};

/**
 * Inicializa el canvas del front.
 */
function initForeground() {
    $("#foregroundCanvas").attr("width", SCREEN_WIDTH);
    $("#foregroundCanvas").attr("height", SCREEN_HEIGHT);
    FOREGROUND_CTX = document.getElementById("foregroundCanvas").getContext("2d");
};

/**
 * Inicializa el canvas del HUD.
 */
function initHUD() {
    $("#HUDCanvas").attr("width", SCREEN_WIDTH);
    $("#HUDCanvas").attr("height", SCREEN_HEIGHT);
    HUD_CTX = document.getElementById("HUDCanvas").getContext("2d");
};

/**
 * Actualiza las posiciones de las bollas que hay en juego.
 */
function updateBalls() {
    for (var i = balls.length - 1; i >= 0; i--) {
        var ball = balls[i];
        ball.update();
        if (ball.y > SCREEN_HEIGHT) {
            balls.splice(i, 1);
        }
        if (balls.length <= 0) {
            player.lifes--;
            if (player.lifes > 0) {
                balls.push(new Ball());
            }
        }
    }
}

/**
 * Calcula las colisiones de la pelota dependiendo de los sensores.
 */
function calculateCollisions() {
    for (var i = balls.length - 1; i >= 0; i--) {
        var ball = balls[i];
        for (var s = 0; s < ball.sensors.length; s++) {
            var sensor = ball.sensors[s];
            //Colisiones con los bordes.
            switch (sensor.angle) {
                case 0:
                    if (sensor.x > SCREEN_WIDTH) {
                        ball.angle = 180 + (-1 * ball.angle);
                        ball.accelerate();
                    }
                    break;
                case 180:
                    if (sensor.x < 0) {
                        ball.angle = 180 + (-1 * ball.angle);
                        ball.accelerate();
                    }
                    break;
                case 270:
                    if (sensor.y < 0) {
                        ball.angle *= -1;
                        ball.accelerate();
                    }
                    break;
                default:
                    break;
            }

            // Colision con el jugador
            var isLeftCollision = squareCollision(sensor.x - sensor.radio, sensor.y - sensor.radio, sensor.radio * 2, sensor.radio * 2,
                player.x, player.y, player.collideLimit, player.height / 2);
            var isCenterCollision = squareCollision(sensor.x - sensor.radio, sensor.y - sensor.radio, sensor.radio * 2, sensor.radio * 2,
                player.x + player.collideLimit, player.y, player.width - (player.collideLimit * 2), player.height);
            var isRigthtCollision = squareCollision(sensor.x - sensor.radio, sensor.y - sensor.radio, sensor.radio * 2, sensor.radio * 2,
                player.x + player.width - player.collideLimit, player.y, player.collideLimit, player.height / 2);
            if (isLeftCollision) {
                if (sensor.angle == 0 || sensor.angle == 180 || sensor.angle == 90) {
                    ball.y = player.y - ball.height - 3;
                    ball.angle = (-1 * ball.angle) - 15;
                    ball.accelerate();
                }
            } else if (isRigthtCollision) {
                if (sensor.angle == 0 || sensor.angle == 180 || sensor.angle == 90) {
                    ball.y = player.y - ball.height - 3;
                    ball.angle = (-1 * ball.angle) + 15;
                    ball.accelerate();
                }
            } else if (isCenterCollision) {
                if (sensor.angle == 0 || sensor.angle == 180 || sensor.angle == 90) {
                    ball.y = player.y - ball.height - 3;
                    ball.angle = (-1 * ball.angle);
                    ball.accelerate();
                }
            }

            // Colisión con los bloques
            for (var b = currentGrid.length - 1; b >= 0; b--) {
                var brick = currentGrid[b];
                var isBrickCollision = squareCollision(sensor.x - sensor.radio, sensor.y - sensor.radio, sensor.radio * 2, sensor.radio * 2,
                    brick.x + X_OFFSET, brick.y + Y_OFFSET, brick.width, brick.height);
                if (isBrickCollision) {
                    switch (sensor.angle) {
                        case 0:
                            ball.angle = 180 + (-1 * ball.angle);
                            ball.accelerate();
                            brick.hit();
                            break;
                        case 90:
                            ball.angle *= -1;
                            ball.accelerate();
                            brick.hit();
                            break;
                        case 180:
                            ball.angle = 180 + (-1 * ball.angle);
                            ball.accelerate();
                            brick.hit();
                            break;
                        case 270:
                            ball.angle *= -1;
                            ball.accelerate();
                            brick.hit();
                            break;
                        default:
                            break;
                    }
                }
                if (brick.lifes <= 0) {
                    if (getRandom(0, 100) < 10) {
                        powerUps.push(new PowerUp(brick.x + 7, brick.y + 4));
                    }
                    currentGrid.splice(b, 1);
                }
            }
        }
    }
}

/**
 * Dibuja los bloques del mapa
 */
function drawBricks() {
    for (var i = 0; i < currentGrid.length; i++) {
        currentGrid[i].draw();
    }
}

/**
 * Función que resetea los valores inciales.
 */
function resetGlobals() {
    clearTimeout(gameCoolDown);
    gameCoolDown = undefined;
    FOREGROUND_CTX.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    HUD_CTX.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    score = 0;
    player = undefined;
    balls = new Array();
    powerUps = new Array();
    currentLevel = 0;
    currentGrid = new Array();
    DB.getScores();
}

/**
 * Actualiza el HUD
 */
function updateHUD() {
    HUD_CTX.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    HUD_CTX.font = 'bold 20px Audiowide';
    HUD_CTX.fillStyle = 'white';
    HUD_CTX.textBaseline = 'top';
    HUD_CTX.fillText('SCORE: ' + score, 25, 25);
    HUD_CTX.fillText('HIGHSCORE: ' + highscore, 325, 25);
    for (var i = 0; i < player.lifes; i++) {
        HUD_CTX.drawImage(life_img, i * 40 + 10, SCREEN_HEIGHT - 20, 32, 12);
    }
}

function updatePowerUps() {
    for (var i = powerUps.length - 1; i >= 0; i--) {
        var powerUp = powerUps[i];
        if (powerUp.y > SCREEN_HEIGHT) {
            powerUps.splice(i, 1);
        } else if (squareCollision(powerUp.x, powerUp.y, powerUp.width, powerUp.height,
            player.x, player.y, player.width, player.height)) {
            if (powerUp.type == 1) {
                player.lifes++;
            } else if (powerUp.type == 2) {
                var b1 = new Ball();
                b1.x = balls[0].x;
                b1.y = balls[0].y;
                b1.isMoving = true;
                b1.angle = balls[0].angle + 25;
                balls.push(b1);
                var b2 = new Ball();
                b2.x = balls[0].x;
                b2.y = balls[0].y;
                b2.isMoving = true;
                b2.angle = balls[0].angle - 25;
                balls.push(b2);
            }
            powerUps.splice(i, 1);
        } else {
            powerUp.update();
        }
    }
}
/**
 * Inicializa la base de datos.
 */
function initDB() {
    DB = new DataBase();
    DB.createDataBase();
}


/**
 * Recoge las iniciales del jugador.
 */
function getPlayerInitials() {
    var loops = window.prompt("Introduce your initials", " (Max. 3)");
    if (loops != null) {
        return loops;
    }
}

/**
 * Pinta el título del juego.
 */
function paintTitle() {
    FOREGROUND_CTX.font = 'bold 150px Audiowide';
    FOREGROUND_CTX.fillStyle = 'white';
    FOREGROUND_CTX.textBaseline = 'bottom';
    FOREGROUND_CTX.textAlign = "center";
    FOREGROUND_CTX.fillText('Brick', SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
    FOREGROUND_CTX.fillText('Breaker', SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 + 150);
}