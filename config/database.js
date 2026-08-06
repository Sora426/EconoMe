const sqlite3 = require("sqlite3").verbose();
const path = require("path");

let dbPath;

if (process.env.RENDER) {

    dbPath = "/var/data/econome.db";

} else {

    dbPath = path.join(__dirname, "../econome.db");

}

const db = new sqlite3.Database(dbPath, (err) => {

    if (err) {

        console.log(err);

    } else {

        console.log("Connected to SQLite");

    }

});

module.exports = db;