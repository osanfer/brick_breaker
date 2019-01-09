self.onmessage = function (e) {
    // Cojo la información que se me esta enviando
    message = e.data;
    var rows = e.data.rows;
    var columns = e.data.columns;
    var lvl = e.data.lvl;
    //Calculo los puntos que gastaré en el nivel.
    var lvlPoints = rows * columns / 2 + lvl * 5;
    var grid = new Array();
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < columns; c++) {
            if (lvlPoints > 0) {
                var prob = Math.round(Math.random() * (100 - 0) + 0);
                if (prob < 4 + lvl) {
                    grid.push({ "row": r, "column": c, "lvl": 3 });
                    lvlPoints -= 3;
                } else if (prob < 19 + lvl) {
                    grid.push({ "row": r, "column": c, "lvl": 2 });
                    lvlPoints -= 2;
                } else if (prob < 90) {
                    lvlPoints -= 1;
                    grid.push({ "row": r, "column": c, "lvl": 1 });
                }
            }
        }
    }
    self.postMessage({ "grid": grid });
}