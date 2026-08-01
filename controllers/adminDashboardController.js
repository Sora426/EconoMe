const User = require("../models/User");
const Article = require("../models/Article");
const Book = require("../models/Book");
const Material = require("../models/Material");
const Quiz = require("../models/Quiz");
const Feedback = require("../models/Feedback");

exports.dashboard = (req, res) => {

    if (!req.session.user || req.session.user.role !== "admin") {
        return res.redirect("/login");
    }

    User.count((err, users) => {

        if (err) return res.send(err.message);

        Article.count((err, articles) => {

            if (err) return res.send(err.message);

            Book.count((err, books) => {

                if (err) return res.send(err.message);

                Material.count((err, materials) => {

                    if (err) return res.send(err.message);

                    Quiz.count((err, quizzes) => {

                        if (err) return res.send(err.message);

                        Feedback.average((err, feedback) => {

                            if (err) return res.send(err.message);

                            const stats = {

                                users: users.total,
                                articles: articles.total,
                                books: books.total,
                                materials: materials.total,
                                quizzes: quizzes.total,
                                reviews: feedback.total || 0,
                                averageRating: Number(feedback.average || 0).toFixed(1)

                            };

                            res.render("admin/dashboard", {

                                stats

                            });

                        });

                    });

                });

            });

        });

    });

};