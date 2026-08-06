const User = require("../models/User");
const db = require("../config/database");

module.exports = (req, res, next) => {

    if (!req.session || !req.session.user) {

        res.locals.user = null;
        res.locals.isPremium = false;

        return next();

    }

    User.findById(req.session.user.id, (err, user) => {

        if (err || !user) {

            req.session.destroy(() => {});

            res.locals.user = null;
            res.locals.isPremium = false;

            return next();

        }

        if (
            user.isPremium &&
            user.premiumUntil &&
            new Date(user.premiumUntil) < new Date()
        ) {

            db.run(
                `UPDATE users
                 SET isPremium = 0,
                     premiumUntil = NULL
                 WHERE id = ?`,
                [user.id],
                () => {

                    user.isPremium = 0;
                    user.premiumUntil = null;

                    req.session.user = user;

                    res.locals.user = user;
                    res.locals.isPremium = false;

                    next();

                }
            );

        } else {

            req.session.user = user;

            res.locals.user = user;
            res.locals.isPremium = user.isPremium === 1;

            next();

        }

    });

};