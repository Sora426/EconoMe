const Favorite = require("../models/Favorite");
const Article = require("../models/Article");
const Book = require("../models/Book");
exports.add = (req, res) => {

    Favorite.exists(
        req.session.user.id,
        req.body.type,
        req.body.itemId,
        (err, favorite) => {

            if (err) return res.send(err.message);

            if (favorite) {
                return res.redirect(req.get("Referrer") || "/");
            }

            Favorite.add(
                req.session.user.id,
                req.body.type,
                req.body.itemId,
                err => {

                    if (err) return res.send(err.message);

                    res.redirect(req.get("Referrer") || "/");

                }
            );

        }
    );

};

exports.remove=(req,res)=>{

    Favorite.remove(

        req.session.user.id,

        req.body.type,

        req.body.itemId,

        err=>{

            if(err) return res.send(err.message);

            res.redirect(req.get("Referrer") || "/");

        }

    );

};


exports.index = (req, res) => {

    Favorite.getAll(req.session.user.id, (err, favorites) => {

        if (err) return res.send(err.message);

        const articles = [];
        const books = [];

        let remaining = favorites.length;

        if (remaining === 0) {

            return res.render("favorites/index", {
                articles,
                books
            });

        }

        favorites.forEach(favorite => {

            if (favorite.type === "article") {

                Article.getById(favorite.itemId, (err, article) => {

                    if (article) articles.push(article);

                    remaining--;

                    if (remaining === 0) {

                        res.render("favorites/index", {
                            articles,
                            books
                        });

                    }

                });

            } else if (favorite.type === "book") {

                Book.getById(favorite.itemId, (err, book) => {

                    if (book) books.push(book);

                    remaining--;

                    if (remaining === 0) {

                        res.render("favorites/index", {
                            articles,
                            books
                        });

                    }

                });

            }

        });

    });

};