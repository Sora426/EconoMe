const BookProgress = require("../models/BookProgress");

exports.save = (req, res) => {

    BookProgress.save(

        req.session.user.id,

        req.body.bookId,

        req.body.progress,

        err => {

            if(err) return res.status(500).send(err.message);

            res.sendStatus(200);

        }

    );

};