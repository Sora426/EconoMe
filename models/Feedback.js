const db = require("../config/database");

class Feedback{

    static create(feedback, callback){

        db.run(

            `INSERT INTO feedback
            (userId,rating,message)
            VALUES(?,?,?)`,

            [

                feedback.userId,

                feedback.rating,

                feedback.message

            ],

            callback

        );

    }

    static getAll(callback){

        db.all(

            `SELECT feedback.*,
            users.name
            FROM feedback

            JOIN users
            ON users.id=feedback.userId

            ORDER BY createdAt DESC`,

            callback

        );

    }

    static average(callback){

        db.get(

            `SELECT
            AVG(rating) as average,
            COUNT(*) as total
            FROM feedback`,

            callback

        );

    }
    static delete(id, callback){

    db.run(

        "DELETE FROM feedback WHERE id=?",

        [id],

        callback

    );

}

static ratingStats(callback){

    db.all(

        `SELECT
            rating,
            COUNT(*) as total
         FROM feedback
         GROUP BY rating
         ORDER BY rating DESC`,

        callback

    );

}

}

module.exports = Feedback;