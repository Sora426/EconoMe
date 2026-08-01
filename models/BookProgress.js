const db = require("../config/database");

class BookProgress {

    static save(userId, bookId, progress, callback){

        db.run(

            `
            INSERT INTO book_progress
            (userId,bookId,progress)

            VALUES(?,?,?)

            ON CONFLICT(userId,bookId)

            DO UPDATE SET

            progress=excluded.progress,

            updatedAt=CURRENT_TIMESTAMP
            `,

            [userId,bookId,progress],

            callback

        );

    }

    static get(userId,bookId,callback){

        db.get(

            `
            SELECT *

            FROM book_progress

            WHERE userId=? AND bookId=?
            `,

            [userId,bookId],

            callback

        );

    }

}

module.exports = BookProgress;