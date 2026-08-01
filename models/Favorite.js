const db = require("../config/database");

class Favorite {

    static add(userId, type, itemId, callback){

        db.run(
            `INSERT INTO favorites(userId,type,itemId)
             VALUES(?,?,?)`,
            [userId,type,itemId],
            callback
        );

    }

    static remove(userId,type,itemId,callback){

        db.run(
            `DELETE FROM favorites
             WHERE userId=? AND type=? AND itemId=?`,
            [userId,type,itemId],
            callback
        );

    }

    static exists(userId,type,itemId,callback){

        db.get(
            `SELECT * FROM favorites
             WHERE userId=? AND type=? AND itemId=?`,
            [userId,type,itemId],
            callback
        );

    }

    static getAll(userId, callback){

    db.all(
        `
        SELECT *
        FROM favorites
        WHERE userId=?
        ORDER BY createdAt DESC
        `,
        [userId],
        callback
    );

}
static countByUser(userId, callback){

    db.get(

        `SELECT COUNT(*) AS total
         FROM favorites
         WHERE userId=?`,

        [userId],

        callback

    );

}
static getBookIds(userId, callback){

    db.all(

        `
        SELECT itemId
        FROM favorites
        WHERE userId=? AND type='book'
        `,

        [userId],

        callback

    );

}

}

module.exports = Favorite;