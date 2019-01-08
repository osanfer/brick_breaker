/************************************************************************
 * Este es un fichero de utilidades, creado para incorparar funciones
 * comunes a varios proyectos de videojuegos en 2 dimensiones. 
 ************************************************************************/

/*
 * Metodo que comprueba colisiones entre sprites rectangulares
 * Recibe las medidas de los 2 rectangulos.
 * Devuelve un booleano indicando si existe colisión.
 */
function squareCollision(r1X, r1Y, r1Width, r1Height, r2X, r2Y, r2Width, r2Height) {
	var isCollide = r1X + r1Width >= r2X &&  	// Calcula las condiciones de solapamiento de dos rectangulos en un plano.
		r1X <= r2X + r2Width &&
		r1Y + r1Height >= r2Y &&
		r1Y <= r2Y + r2Height;
	return isCollide;
}

/*
 * Metodo que devuelve un número entero aleatorio para un rango dado.
 */
function getRandom(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

/*
 * Metodo que devuelve un valor booleano aleatorio.
 */
function getRandomBoolean() {
	return Math.random() >= 0.5;
}

/*
 * Metodo que devuelve un color aleatorio en exadecimal
 */
function getRandomColor() {
	var color = "#";
	for (var i = 0; i < 6; i++) {
		color += Math.floor(Math.random() * 16).toString(16);
	}
	return color;
}

/*
 * Metodo que recibe un conjunto de coordenadas y te indica si son contiguas.
 */
function areCoordsBeside(x1, y1, x2, y2) {
	return (x1 == x2 && (Math.abs(y1 - y2) == 1)) ||
		(y1 == y2 && (Math.abs(x1 - x2) == 1));
}

/*
 * Metodo que pinta una imagen rotada.
 */
function drawImageRot(ctx, img, imgX, imgY, imgWidth, imgHeight, x, y, width, height, rad) {
	ctx.translate(x + width / 2, y + height / 2);
	ctx.rotate(rad);
	ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight, width / 2 * (-1), height / 2 * (-1), width, height);
	ctx.rotate((rad) * (-1));
	ctx.translate((x + width / 2) * (-1), (y + height / 2) * (-1));
}

/*
 * Metodo que convierte grados sexagesimales a radianes
 */
function convertDegToRad(deg) {
	return deg * Math.PI / 180;
}

/*
 * Metodo que convierte radianes a grados sexagesimales
 */
function convertRadToDeg(rad) {
	return rad * 180 / Math.PI;
}

/*
 * Calcula distancia entre 2 puntos
 */
function distanceBetweenTwoPoints(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}