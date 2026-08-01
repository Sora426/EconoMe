const User = require("../models/User");

exports.admin = (req, res) => {

    User.getAll((err, users) => {

        if(err) return res.send(err.message);

        res.render("admin/users", {

            users

        });

    });

};
exports.delete = (req, res) => {

    User.delete(req.params.id, err => {

        if(err) return res.send(err.message);

        res.redirect("/admin/users");

    });

};

exports.makePremium = (req, res) => {

    User.makePremium(req.params.id, err => {

        if(err) return res.send(err.message);

        res.redirect("/admin/users");

    });

};
exports.removePremium = (req, res) => {

    User.removePremium(req.params.id, err => {

        if(err) return res.send(err.message);

        res.redirect("/admin/users");

    });

};

exports.makeAdmin = (req, res) => {
    User.updateRole(req.params.id, "admin", (err) => {
        if (err) return res.send(err.message);

        res.redirect("/admin/users");
    });
};

exports.makeUser = (req, res) => {
    User.updateRole(req.params.id, "user", (err) => {
        if (err) return res.send(err.message);

        res.redirect("/admin/users");
    });
};

