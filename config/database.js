const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

const diskDb = "/var/data/econome.db";
const localDb = path.join(__dirname, "../econome.db");

// First deployment after adding the disk:
// copy the existing database to the disk if it isn't there yet.
if (!fs.existsSync(diskDb) && fs.existsSync(localDb)) {
    fs.copyFileSync(localDb, diskDb);
    console.log("Database copied to persistent disk.");
}

const db = new sqlite3.Database(diskDb, (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Connected to SQLite (Persistent Disk)");
    }
});

module.exports = db;