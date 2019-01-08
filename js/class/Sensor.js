function Sensor(owner, angle) {
    this.x;
    this.y;
    this.distance = (owner.width / 2) + 2;
    this.owner = owner;
    this.angle = angle;
    this.radio = 1;
    this.color = "red";

    this.update = function () {
        this.x = this.owner.x + (this.owner.width / 2) + (Math.cos(convertDegToRad(this.angle)) * this.distance);
        this.y = this.owner.y + (this.owner.width / 2) + (Math.sin(convertDegToRad(this.angle)) * this.distance);
    }

    this.draw = function () {
        COLLIDE_CTX.fillStyle = this.color;
        COLLIDE_CTX.beginPath();
        COLLIDE_CTX.arc(this.x, this.y, this.radio, 0, Math.PI * 2, false);
        COLLIDE_CTX.fill();
        COLLIDE_CTX.closePath();
    }
}