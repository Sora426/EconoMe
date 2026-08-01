const db = require("../config/database");

class Question {

    static getByQuiz(quizId, callback){

        db.all(
            `
            SELECT * FROM questions WHERE quizId=?` , 
            [quizId],
            callback
        );

    }
    static getAllByQuiz(quizId, callback){

    db.all(
        `
        SELECT *
        FROM questions

        WHERE quizId=?

        ORDER BY id ASC
        `,
        [quizId],
        callback
    );

}

    static create(question, callback){

        db.run(
            `
            INSERT INTO questions
            (
                quizId,
                question,
                optionA,
                optionB,
                optionC,
                optionD,
                correctAnswer
            )

            VALUES(?,?,?,?,?,?,?)
            `,
            [
                question.quizId,
                question.question,
                question.optionA,
                question.optionB,
                question.optionC,
                question.optionD,
                question.correctAnswer
            ],
            callback
        );

    }

    static delete(id, callback){

        db.run(
            "DELETE FROM questions WHERE id=?",
            [id],
            callback
        );

    }
    static getById(id, callback){

    db.get(
        "SELECT * FROM questions WHERE id=?",
        [id],
        callback
    );

}

static update(id, question, callback){

    db.run(
        `
        UPDATE questions
        SET
        question=?,
        optionA=?,
        optionB=?,
        optionC=?,
        optionD=?,
        correctAnswer=?

        WHERE id=?
        `,
        [
            question.question,
            question.optionA,
            question.optionB,
            question.optionC,
            question.optionD,
            question.correctAnswer,
            id
        ],
        callback
    );

}
static deleteByQuiz(quizId, callback){

    db.run(

        "DELETE FROM questions WHERE quizId=?",

        [quizId],

        callback

    );

}



}

module.exports = Question;