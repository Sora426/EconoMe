const Favorite = require("../models/Favorite");
const Book = require("../models/Book");
const Article = require("../models/Article");
const Material = require("../models/Material");
const QuizResult = require("../models/QuizResult");

exports.index = (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    Favorite.countByUser(req.session.user.id, (err, favoriteCount) => {

        if (err) return res.send(err.message);

        Book.count((err, books) => {

            if (err) return res.send(err.message);

            Article.count((err, articles) => {

                if (err) return res.send(err.message);

                Material.count((err, materials) => {

                    if (err) return res.send(err.message);
                     QuizResult.averageScore(req.session.user.id, (err, averageScore) => {
                        if (err) return res.send(err.message);
                       QuizResult.completedQuizzes(req.session.user.id, (err, completedQuizzes) => {
                          if (err) return res.send(err.message);
                          res.render("dashboard", {

                            favoriteCount,
                            books,
                            articles,
                            materials,
                            averageScore,
                            completedQuizzes
                       });

                      });
                    });

                });

            });

        });

    });

};