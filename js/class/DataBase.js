function DataBase() {
    var dbName = "BrickBreakerDB";
    var dbVersion = "1.0";
    var dbDescription = "Almacena tabla de puntuaciones de Brick Breaker.";
    var dbSize = 2 * 1024 * 1024;
    this.dataBase = openDatabase(dbName, dbVersion, dbDescription, dbSize);

    /**
     * Crea la base de datos si no existe y la incializa a los valores por defecto.
     */
    this.createDataBase = function () {
        this.dataBase.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS SCORES (id INTEGER PRIMARY KEY, player TEXT, level INTEGER, score INTEGER)');
            tx.executeSql('INSERT INTO SCORES (id, player, level, score) values(?, ?, ?, ?)', [1, "AAA", 1, 0], function () { }, function () { console.log("error") });
            tx.executeSql('INSERT INTO SCORES (id, player, level, score) values(?, ?, ?, ?)', [2, "BBB", 2, 0], function () { }, function () { console.log("error") });
            tx.executeSql('INSERT INTO SCORES (id, player, level, score) values(?, ?, ?, ?)', [3, "CCC", 3, 0], function () { }, function () { console.log("error") });
            tx.executeSql('INSERT INTO SCORES (id, player, level, score) values(?, ?, ?, ?)', [4, "DDD", 4, 0], function () { }, function () { console.log("error") });
            tx.executeSql('INSERT INTO SCORES (id, player, level, score) values(?, ?, ?, ?)', [5, "EEE", 5, 0], function () { }, function () { console.log("error") });
            tx.executeSql('INSERT INTO SCORES (id, player, level, score) values(?, ?, ?, ?)', [6, "FFF", 6, 0], function () { }, function () { console.log("error") });
            tx.executeSql('INSERT INTO SCORES (id, player, level, score) values(?, ?, ?, ?)', [7, "GGG", 7, 0], function () { }, function () { console.log("error") });
            tx.executeSql('INSERT INTO SCORES (id, player, level, score) values(?, ?, ?, ?)', [8, "HHH", 8, 0], function () { }, function () { console.log("error") });
            tx.executeSql('INSERT INTO SCORES (id, player, level, score) values(?, ?, ?, ?)', [9, "III", 9, 0], function () { }, function () { console.log("error") });
        });
    }

    /**
     * Inserta una puntuación en la tabla.
     */
    this.insertScore = function (player, level, score) {
        this.dataBase.transaction(function (tx) {
            tx.executeSql('INSERT INTO SCORES (player, level, score) values(?, ?, ?)', [player, level, score], function () { DB.getScores(); }, function () { console.log("error") });
        });
    }

    /**
     * Recupera las 9 puntuaciones más altas de la tabla para mostrarlas.
     */
    this.getScores = function () {
        this.dataBase.transaction(function (tx) {
            tx.executeSql('SELECT * FROM SCORES ORDER BY score DESC LIMIT 9', [], function (tx, results) {
                //console.log("Conseguimos los INTERACTIVE")
                scores = results;
                HIGHSCORES = new Array();
                for (var i = 0; i < scores.rows.length; i++) {
                    HIGHSCORES.push(scores.rows[i]);
                }
                highscore = HIGHSCORES[0].score;
            }, function () { console.log("error") });
        });
    }
}
