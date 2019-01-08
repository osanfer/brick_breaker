function Paddle() {
    this.width = 96;
    this.height = 18;
    this.x = SCREEN_WIDTH / 2 - (this.width / 2);
    this.y = SCREEN_HEIGHT - 99;
    this.img = new Image();
    this.img.src = "img/paddle.png";
    this.lifes = 3;
    this.speed = 6;
    this.collideLimit = 20;
    this.direction = NONE;

    /**
	 * Función que actualiza la posición y los atributos del jugador.
	 */
    this.update = function () {
        switch (this.direction) {
            case LEFT:
                this.x = this.x < this.speed ? 0 : this.x - this.speed;
                break;
            case RIGHT:
                this.x = this.x + this.width > SCREEN_WIDTH - this.speed ? SCREEN_WIDTH - this.width : this.x + this.speed;
                break;
            default:
                break;
        }
        this.draw();
    }

    /**
	 * Dibuja el frame adecuado del jugador dependiendo de su estado y posición.
	 */
    this.draw = function () {
        FOREGROUND_CTX.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
	 * Resetea los atributos del jugador tras superar un nivel.
	 */
    this.reset = function () {
        this.width = 96;
        this.height = 18;
        this.x = SCREEN_WIDTH / 2 - (this.width / 2);
        this.y = SCREEN_HEIGHT - 99;
        this.speed = 6;
        this.direction = NONE;
    }
}