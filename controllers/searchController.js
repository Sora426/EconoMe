const Article = require("../models/Article");
const Book = require("../models/Book");
const Material = require("../models/Material");
const Quiz = require("../models/Quiz");
exports.search = (req, res) => {

    const keyword = req.query.q;

    Article.search(keyword, (err, articles) => {

        if(err) return res.send(err.message);

        Book.search(keyword, (err, books) => {

            if(err) return res.send(err.message);

            Material.search(keyword, (err, materials) => {

                if(err) return res.send(err.message);

                Quiz.search(keyword, (err, quizzes) => {

    if (err) return res.send(err.message);

    res.render("search", {
        user: req.session.user,
        keyword,
        articles,
        books,
        materials,
        quizzes
    });

});

            });

        });

    });

};