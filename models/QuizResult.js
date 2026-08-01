const db = require("../config/database");

class QuizResult{

    static create(result, callback){

        db.run(

            `INSERT INTO quiz_results
            (userId,quizId,score,total)
            VALUES(?,?,?,?)`,

            [

                result.userId,
                result.quizId,
                result.score,
                result.total

            ],

            callback

        );

    }

    static getByUser(userId, callback){

        db.all(

            `SELECT
                quiz_results.*,
                quizzes.title

            FROM quiz_results

            JOIN quizzes
            ON quizzes.id = quiz_results.quizId

            WHERE userId=?

            ORDER BY createdAt DESC`,

            [userId],

            callback

        );

    }

    static getAll(callback){

        db.all(

            `SELECT
                quiz_results.*,
                users.name,
                quizzes.title

            FROM quiz_results

            JOIN users
            ON users.id = quiz_results.userId

            JOIN quizzes
            ON quizzes.id = quiz_results.quizId

            ORDER BY createdAt DESC`,

            callback

        );

    }
    static averageScore(userId, callback){

    db.get(

        `SELECT
            ROUND(AVG(score * 100.0 / total), 1) AS average
         FROM quiz_results
         WHERE userId=?`,

        [userId],

        callback

    );

}
static completedQuizzes(userId, callback){

    db.get(

        `SELECT COUNT(*) AS total
         FROM quiz_results
         WHERE userId=?`,

        [userId],

        callback

    );

}

}

module.exports = QuizResult;