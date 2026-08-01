const Book = require("../models/Book");
const Favorite = require("../models/Favorite");

exports.index = (req, res) => {

    Book.getAll((err, books) => {

        if(err) return res.send(err.message);

        if(!req.session.user){

            return res.render("books/index",{

                books,
                favoriteIds: []

            });

        }

        Favorite.getBookIds(req.session.user.id,(err,favorites)=>{

            if(err) return res.send(err.message);

            const favoriteIds = favorites.map(f=>f.itemId);

            res.render("books/index",{

                books,
                favoriteIds

            });

        });

    });

};
exports.show = (req, res) => {

    Book.getById(req.params.id, (err, book) => {

        if (err) return res.send(err.message);

        if (!book) {
            return res.send("Book not found");
        }

        Favorite.exists(

    req.session.user ? req.session.user.id : 0,

    "book",

    book.id,

    (err,favorite)=>{

        res.render("books/read",{

            book,

            isFavorite: !!favorite

        });

    }

);

    });

};

exports.admin=(req,res)=>{

    Book.getAll((err,books)=>{

        res.render("admin/books",{
            books
        });

    });

};

exports.new=(req,res)=>{

    res.render("admin/newBook");

};

exports.create = (req, res) => {
    console.log(req.body);
    console.log(req.files);
    const book = {

        title: req.body.title,

        author: req.body.author,

        description: req.body.description,

        category: req.body.category,

        cover: req.files.cover
            ? req.files.cover[0].filename
            : null,

        pdf: req.files.pdf
            ? req.files.pdf[0].filename
            : null,

        isPremium: req.body.isPremium ? 1 : 0

    };
    console.log(book);

    Book.create(book, (err) => {

        if (err) {

            console.log(err);

            return res.send(err.message);

        }

        res.redirect("/admin/books");

    });

};
exports.edit = (req, res) => {

    Book.getById(req.params.id, (err, book) => {

        if (err) return res.send(err.message);

        res.render("admin/editBook", {

            book

        });

    });

};
exports.update = (req, res) => {

    Book.getById(req.params.id, (err, oldBook) => {

        if (err) return res.send(err.message);

        const book = {

            title: req.body.title,

            author: req.body.author,

            description: req.body.description,

            category: req.body.category,

            cover: req.files.cover
                ? req.files.cover[0].filename
                : oldBook.cover,

            pdf: req.files.pdf
                ? req.files.pdf[0].filename
                : oldBook.pdf,

            isPremium: req.body.isPremium ? 1 : 0

        };

        Book.update(req.params.id, book, (err) => {

            if (err) return res.send(err.message);

            res.redirect("/admin/books");

        });

    });

};
exports.delete = (req, res) => {

    Book.delete(req.params.id, (err) => {

        if (err) return res.send(err.message);

        res.redirect("/admin/books");

    });

};
exports.read = (req, res) => {

    Book.getById(req.params.id, (err, book) => {

        if (err) return res.send(err.message);

        const pdf = encodeURIComponent(`/uploads/books/${book.pdf}`);

        res.redirect(`/pdfjs/web/viewer.html?file=${pdf}`);

    });

};