self.onmessage = function (e) {
    // Cojo la información que se me esta enviando
    message = e.data;
    var rows = e.data.rows;
    var columns = e.data.columns;
    var lvl = e.data.lvl;
    //Calculo los puntos que gastaré en el nivel.
    var lvlPoints = rows * columns + lvl * 5;
    var grid = new Array();
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < columns; c++) {
            grid.push({ "row": r, "column": c, "lvl": 1 });
        }
    }
    self.postMessage({ "grid": grid });
}