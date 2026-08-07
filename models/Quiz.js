const db = require("../config/database");

class Quiz {

    static getAll(callback){

        db.all(
            "SELECT * FROM quizzes ORDER BY id DESC",
            callback
        );

    }

    static getById(id, callback){

        db.get(
            "SELECT * FROM quizzes WHERE id=?",
            [id],
            callback
        );

    }

    static create(quiz, callback){

    db.run(
        `
        INSERT INTO quizzes(title, category, isPremium)
        VALUES(?,?,?)
        `,
        [
            quiz.title,
            quiz.category,
            quiz.isPremium ? 1 : 0
        ],
        function(err){

            callback(err, this.lastID);

        }
    );

}

    static update(id, quiz, callback){

    db.run(
        `
        UPDATE quizzes
        SET
            title=?,
            category=?,
            isPremium=?

        WHERE id=?
        `,
        [
            quiz.title,
            quiz.category,
            quiz.isPremium ? 1 : 0,
            id
        ],
        callback
    );

}

    static delete(id, callback){

        db.run(
            "DELETE FROM quizzes WHERE id=?",
            [id],
            callback
        );

    }
static getLatest(limit, callback){

    db.all(

        `SELECT * FROM quizzes
         ORDER BY id DESC
         LIMIT ?`,

        [limit],

        callback

    );

}
static count(callback){

    db.get(

        "SELECT COUNT(*) AS total FROM quizzes",

        callback

    );

}
static search(keyword, callback) {

    db.all(

        `
        SELECT *
        FROM quizzes
        WHERE
            title LIKE ?
            OR category LIKE ?
        ORDER BY title DESC
        `,

        [
            `%${keyword}%`,
            `%${keyword}%`
        ],

        callback

    );

}
}

module.exports = Quiz;