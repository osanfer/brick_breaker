// Variables globales de pantalla
var SCREEN_HEIGHT = window.innerHeight - 40;
var SCREEN_WIDTH = SCREEN_HEIGHT;

// Contextos de los diferentes canvas
var BACKGROUND_CTX;
var FOREGROUND_CTX;
var HUD_CTX;

// Base de datos.
var DB;

// Temporizador global del juego
var gameCoolDown;

// Constantes para determinar el movimiento del jugador
var NONE = 0;
var LEFT = 1;
var RIGHT = 2;

// El objeto del jugador
var player;
var life_img = new Image();
life_img.src = "img/paddle.png";

// Lista de bolas en juego
var balls = new Array();

// Constantes para el mapa
var COLUMNS = Math.floor(SCREEN_WIDTH / 64);
var ROWS = Math.floor((3 * COLUMNS) / 5);
var X_OFFSET = (SCREEN_WIDTH - (COLUMNS * 64)) / 2;
var Y_OFFSET = 75;
var currentLevel = 0;
var currentGrid = new Array();
var score = 0;
var HIGHSCORES;
var highscore;

// Worker generador de escenarios
var LVL_WORKER = new Worker("js/levelWorker.js");