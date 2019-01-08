function Ball() {
    var MAX_SPEED = 8;
    var ACCELERATION = 0.15;
    this.width = 14;
    this.height = 14;
    this.x = player.x + (player.width / 2) - (this.width / 2);
    this.y = player.y - this.height - 10;
    this.img = new Image();
    this.img.src = "img/ball.png";
    this.angle = -45;               // Por comodidad el angulo siempre esta eng rados y la conversión se hace en otro sitio.
    this.speed = 3;
    this.isMoving = false;
    //Sensores de choque
    this.sensors = new Array();
    this.sensors.push(new Sensor(this, 0));
    this.sensors.push(new Sensor(this, 90));
    this.sensors.push(new Sensor(this, 180));
    this.sensors.push(new Sensor(this, 270));

    /**
	 * Función que actualiza la posición y los atributos del jugador.
	 */
    this.update = function () {
        if (this.isMoving) {
            this.x += (Math.cos(convertDegToRad(this.angle)) * this.speed);
            this.y += (Math.sin(convertDegToRad(this.angle)) * this.speed);
        } else {
            this.x = player.x + (player.width / 2) - (this.width / 2);
        }
        this.draw();
        this.drawSensors();
    }

    /**
	 * Dibuja el frame adecuado del jugador dependiendo de su estado y posición.
	 */
    this.draw = function () {
        FOREGROUND_CTX.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Acelera la bola en cada rebote
     */
    this.accelerate = function () {
        if (this.speed < MAX_SPEED) {
            this.speed += ACCELERATION;
        } else {
            this.speed = MAX_SPEED;
        }
    }

    this.drawSensors = function () {
        HUD_CTX.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        for (var i = this.sensors.length - 1; i >= 0; i--) {
            this.sensors[i].update();
            // this.sensors[i].draw();
        }
    }
}