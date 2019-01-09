function PowerUp(x, y) {
    this.width = 50;
    this.height = 23;
    this.x = x;
    this.y = y;
    this.type = getRandom(1, 2);
    this.img = new Image();
    this.img.src = this.type == 1 ? "img/1up.png" : "img/split.png";

    /**
	 * Función que actualiza la posición y los atributos del powerUp.
	 */
    this.update = function () {
        this.y = this.y + 2;
        this.draw();
    }

    /**
	 * Dibuja el powerUp.
	 */
    this.draw = function () {
        FOREGROUND_CTX.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}