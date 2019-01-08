function Brick(row, column, lvl) {
    this.width = 64;
    this.height = 32;
    this.x = column * this.width;
    this.y = row * this.height;
    this.brickRow = getRandom(0, 2);
    this.brickColumn = getRandom(0, 2);
    this.lvl1Img = new Image();
    this.lvl2Img = new Image();
    this.lvl3Img = new Image();
    this.lvl1Img.src = "img/lvl1_bricks.png";
    this.lvl2Img.src = "img/lvl2_bricks.png";
    this.lvl3Img.src = "img/lvl3_bricks.png";
    this.lifes = lvl;

    /**
     * Añade puntos al marcador y resta una vida al bloque.
     */
    this.hit = function () {
        this.lifes--;
        score += 10;
        if (score > highscore) {
            highscore = score;
        }
    }

    /**
     * Dibuja el bloque en su sitio.
     */
    this.draw = function () {
        if (this.lifes == 1) {
            FOREGROUND_CTX.drawImage(this.lvl1Img, this.brickColumn * 64, this.brickRow * 32, this.width, this.height, this.x + X_OFFSET, this.y + Y_OFFSET, this.width, this.height);
        } else if (this.lifes == 2) {
            FOREGROUND_CTX.drawImage(this.lvl2Img, this.brickColumn * 64, this.brickRow * 32, this.width, this.height, this.x + X_OFFSET, this.y + Y_OFFSET, this.width, this.height);
        } else if (this.lifes == 3) {
            FOREGROUND_CTX.drawImage(this.lvl3Img, this.brickColumn * 64, this.brickRow * 32, this.width, this.height, this.x + X_OFFSET, this.y + Y_OFFSET, this.width, this.height);
        }
    }
}