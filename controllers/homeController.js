const Article = require("../models/Article");
const Book = require("../models/Book");
const Material = require("../models/Material");
const Quiz = require("../models/Quiz");

exports.index = (req, res) => {

    Article.getLatest(3, (err, articles) => {

    Book.getLatest(4, (err, books) => {

        Material.getLatest(3, (err, materials) => {

            Quiz.getLatest(3, (err, quizzes) => {

                Article.count((err, articleCount) => {

                    Book.count((err, bookCount) => {

                        Material.count((err, materialCount) => {

                            Quiz.count((err, quizCount) => {

                                res.render("index", {
                                    articles,
                                    books,
                                    materials,
                                    quizzes,
                                    articleCount: articleCount.total,
                                    bookCount: bookCount.total,
                                    materialCount: materialCount.total,
                                    quizCount: quizCount.total
                                });

                            });

                        });

                    });

                });

            });

        });

    });

});
};