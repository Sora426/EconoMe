const Feedback = require("../models/Feedback");

// Show feedback form
exports.form = (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    res.render("feedback");

};

// Submit feedback
exports.submit = (req, res) => {

    const feedback = {

        userId: req.session.user.id,
        rating: req.body.rating,
        message: req.body.message

    };

    Feedback.create(feedback, (err) => {

        if (err) {
            return res.send(err.message);
        }

        res.redirect("/");

    });

};

// Admin - View all feedback
exports.admin = (req, res) => {

    

    Feedback.getAll((err, feedbacks) => {

        if (err) {
            return res.send(err.message);
        }

        Feedback.average((err, average) => {

            if (err) {
                return res.send(err.message);
            }

            Feedback.ratingStats((err, stats) => {

                if (err) {
                    return res.send(err.message);
                }

                res.render("admin/feedback", {

                    feedbacks,
                    average,
                    stats

                });

            });

        });

    });

};

// Delete feedback
exports.delete = (req, res) => {

    if (!req.session.user || req.session.user.role !== "admin") {
        return res.redirect("/login");
    }

    Feedback.delete(req.params.id, (err) => {

        if (err) {
            return res.send(err.message);
        }

        res.redirect("/feedback/admin/feedback");

    });

};