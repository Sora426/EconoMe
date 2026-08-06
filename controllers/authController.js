const bcrypt = require("bcrypt");
const User = require("../models/User");
const crypto = require("crypto");
const transporter = require("../services/mailService");

exports.loginPage = (req, res) => {

    res.render("auth/login");

};

exports.registerPage = (req, res) => {

    res.render("auth/register");

};

exports.register = async (req, res) => {

    const { name, email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);
    const token = crypto.randomBytes(32).toString("hex");

    User.create({
        name,
        email,
        password: hash,
        verificationToken: token
    }, async (err) => {

        if (err) {
            return res.send("Email already exists.");
        }

        const verifyLink = `${req.protocol}://${req.get("host")}/verify/${token}`;

        try {

            const info = await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: email,
                subject: "Verify your EconoMe account",
                html: `
                    <h2>Welcome to EconoMe!</h2>

                    <p>Thank you for registering.</p>

                    <p>Please click the button below to verify your email.</p>

                    <a href="${verifyLink}" style="
                        display:inline-block;
                        padding:12px 24px;
                        background:#0d6efd;
                        color:white;
                        text-decoration:none;
                        border-radius:6px;
                    ">
                        Verify Email
                    </a>

                    <p>If you didn't create this account, simply ignore this email.</p>
                `
            });

            console.log("EMAIL SENT:", info.response);

            res.send("Registration successful! Please check your email to verify your account.");

        } catch (error) {

            console.error("EMAIL ERROR:", error);

            res.status(500).send("Failed to send verification email.");

        }

    });

};
exports.verifyEmail = (req, res) => {

    const token = req.params.token;

    User.findByVerificationToken(token, (err, user) => {

        if (err) {
            return res.send(err.message);
        }

        if (!user) {
            return res.send("Invalid or expired verification link.");
        }

        User.verifyUser(user.id, (err) => {

            if (err) {
                return res.send(err.message);
            }

            res.send(`
                <h1>Email Verified ✅</h1>
                <p>Your account has been successfully verified.</p>
                <a href="/login">Login Now</a>
            `);

        });

    });

};
exports.login = (req, res) => {

    const { email, password } = req.body;

    User.findByEmail(email, async (err, user) => {

        if (!user) {

    return res.send("Invalid email or password.");

}

if (!user.isVerified) {

    return res.send("Please verify your email before logging in.");

}

const match = await bcrypt.compare(password, user.password);

        

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