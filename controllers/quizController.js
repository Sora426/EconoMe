const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const QuizResult = require("../models/QuizResult");
exports.index = (req,res)=>{

    Quiz.getAll((err,quizzes)=>{

        if(err) return res.send(err.message);

        res.render("quizzes/index",{

            quizzes

        });

    });

};

exports.admin=(req,res)=>{

    Quiz.getAll((err,quizzes)=>{

        res.render("admin/quizzes",{

            quizzes

        });

    });

};

exports.new=(req,res)=>{

    res.render("admin/newQuiz");

};

exports.create = (req, res) => {

    const { title, category } = req.body;

    const isPremium = req.body.isPremium ? 1 : 0;

    Quiz.create(
        {
            title,
            category,
            isPremium
        },
        (err, id) => {

            if (err) {
                return res.send(err.message);
            }

            res.redirect("/admin/quizzes");
        }
    );

};
exports.delete = (req, res) => {

    Question.deleteByQuiz(req.params.id, err => {

        if(err) return res.send(err.message);

        Quiz.delete(req.params.id, err => {

            if(err) return res.send(err.message);

            res.redirect("/admin/quizzes");

        });

    });

};


exports.newQuestion = (req, res) => {

    Quiz.getById(req.params.id, (err, quiz) => {

        if (err) return res.send(err.message);

        if (!quiz) {
            return res.send("Quiz not found");
        }

        res.render("admin/newQuestion", {
            quiz: quiz
        });

    });

};
exports.createQuestion = (req, res) => {

    const type = req.body.type;

    let correctAnswer;

    if (type === "truefalse") {

        correctAnswer = req.body.trueFalseAnswer;

    } else {

        correctAnswer = req.body.correctAnswer;

    }

    const question = {

        quizId: req.params.id,

        question: req.body.question,

        optionA: type === "multiple"
            ? req.body.optionA
            : null,

        optionB: type === "multiple"
            ? req.body.optionB
            : null,

        optionC: type === "multiple"
            ? req.body.optionC
            : null,

        optionD: type === "multiple"
            ? req.body.optionD
            : null,

        correctAnswer,

        type,

        image: req.file
            ? req.file.filename
            : null

    };

    Question.create(question, err => {

        if (err) {

            return res.send(err.message);

        }

        res.redirect(
            `/admin/quizzes/${req.params.id}/questions`
        );

    });

};
exports.show = (req, res) => {

    Quiz.getById(req.params.id, (err, quiz) => {

        if (err) return res.send(err.message);

        if (!quiz) {
            return res.status(404).send("Quiz not found");
        }

        // Premium quiz
        if (quiz.isPremium) {

            // Not logged in
            if (!req.session.user) {
                return res.redirect("/login");
            }

            // Logged in but not premium/admin
            if (
                req.session.user.isPremium !== 1 &&
                req.session.user.role !== "admin"
            ) {
                return res.render("quizzes/premium", {
                    quiz
                });
            }
        }

        // Free quiz OR premium/admin user
        Question.getByQuiz(req.params.id, (err, questions) => {

            if (err) return res.send(err.message);

            res.render("quizzes/show", {
                quiz,
                questions
            });

        });

    });

};
exports.editQuestion = (req, res) => {

    Question.getById(req.params.id, (err, question) => {

        if (err) return res.send(err.message);

        res.render("admin/editQuestion", {

            question

        });

    });

};
exports.updateQuestion = (req, res) => {

    Question.getById(req.params.id, (err, oldQuestion) => {

        if (err) return res.send(err.message);

        let correctAnswer;

        // Multiple choice
        if (req.body.type === "multiple") {

            correctAnswer = req.body.correctAnswer;

        }

        // True / False
        if (req.body.type === "truefalse") {

            correctAnswer = req.body.trueFalseAnswer;

        }


        let image = oldQuestion.image;


        // Remove old image
        if (req.body.removeImage === "1") {

            image = null;

        }


        // New image uploaded
        if (req.file) {

            image = req.file.filename;

        }


        const question = {

            question: req.body.question,

            type: req.body.type,

            image: image,

            optionA:
                req.body.type === "multiple"
                    ? req.body.optionA
                    : null,

            optionB:
                req.body.type === "multiple"
                    ? req.body.optionB
                    : null,

            optionC:
                req.body.type === "multiple"
                    ? req.body.optionC
                    : null,

            optionD:
                req.body.type === "multiple"
                    ? req.body.optionD
                    : null,

            correctAnswer

        };


        Question.update(
            req.params.id,
            question,
            err => {

                if (err) return res.send(err.message);

                res.redirect(
                    `/admin/quizzes/${oldQuestion.quizId}/questions`
                );

            }
        );

    });

};
exports.deleteQuestion = (req, res) => {

    Question.getById(req.params.id, (err, question) => {

        if (err) return res.send(err.message);

        Question.delete(req.params.id, err => {

            if (err) return res.send(err.message);

            res.redirect(`/admin/quizzes/${question.quizId}/questions`);

        });

    });

};
exports.submit = (req, res) => {

    Question.getAllByQuiz(req.params.id, (err, questions) => {

        if (err) return res.send(err.message);

        let score = 0;

        const results = [];

        questions.forEach(q => {

            const userAnswer = req.body["question_" + q.id];

            const correct = userAnswer === q.correctAnswer;

            if (correct) score++;

            results.push({

    question: q.question,

    type: q.type,

    image: q.image,

    options: {

        A: q.optionA,
        B: q.optionB,
        C: q.optionC,
        D: q.optionD

    },

    userAnswer,

    correctAnswer: q.correctAnswer,

    correct

});

        });
        if(req.session.user){

    QuizResult.create({

        userId:req.session.user.id,

        quizId:req.params.id,

        score,

        total:questions.length

    },()=>{});

}
        res.render("quizzes/result",{

            score,

            total: questions.length,

            results

        });

    });

};
exports.manageQuestions = (req,res)=>{

    Quiz.getById(req.params.id,(err,quiz)=>{

        if(err) return res.send(err.message);

        Question.getAllByQuiz(req.params.id,(err,questions)=>{

            if(err) return res.send(err.message);

            res.render("admin/manageQuestions",{

                quiz,
                questions

            });

        });

    });

};
exports.show = (req, res) => {

    Quiz.getById(req.params.id, (err, quiz) => {

        if (err) return res.send(err.message);

        if (!quiz) {
            return res.send("Quiz not found");
        }

        // Premium quiz protection
        if (quiz.isPremium === 1) {

            if (!req.session.user) {

                return res.redirect("/login");

            }

            if (!req.session.user.isPremium) {

                return res.redirect("/premium");

            }

        }

        Question.getAllByQuiz(req.params.id, (err, questions) => {

            if (err) return res.send(err.message);
             console.log("QUESTIONS:", questions);
            res.render("quizzes/show", {

                quiz,
                questions

            });

        });

    });

};
exports.progress = (req,res)=>{

    if(!req.session.user){

        return res.redirect("/login");

    }

    QuizResult.getByUser(

        req.session.user.id,

        (err,results)=>{

            if(err){

                return res.send(err.message);

            }

            res.render("quizzes/progress",{

                results

            });

        }

    );

};

