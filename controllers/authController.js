const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.loginPage = (req, res) => {

    res.render("auth/login");

};

exports.registerPage = (req, res) => {

    res.render("auth/register");

};

exports.register = async (req, res) => {

    const { name, email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    User.create({

        name,
        email,
        password: hash

    }, (err) => {

        if (err) {

            return res.send("Email already exists.");

        }

        res.redirect("/login");

    });

};

exports.login = (req, res) => {

    const { email, password } = req.body;

    User.findByEmail(email, async (err, user) => {

        if (!user) {

            return res.send("Invalid email.");

        }

        const match = await bcrypt.compare(
            password,
            user.password
        );

        if (!match) {

            return res.send("Wrong password.");

        }

        req.session.user = user;

if (user.role === "admin") {
    return res.redirect("/admin");
}

res.redirect("/");

    });

};

exports.logout = (req, res) => {

    req.session.destroy(() => {

        res.redirect("/");

    });

};