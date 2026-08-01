const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(
    path.join(__dirname, "../econome.db"),
    (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log("Connected to SQLite");
        }
    }
);

module.exports = db;