const db = require("../config/database");

class User {

    static create(user, callback) {

        db.run(
            `
            INSERT INTO users(name,email,password)
            VALUES(?,?,?)
            `,
            [
                user.name,
                user.email,
                user.password
            ],
            callback
        );

    }

    static findByEmail(email, callback) {

        db.get(
            `
            SELECT * FROM users
            WHERE email=?
            `,
            [email],
            callback
        );

    }

    static findById(id, callback){

        db.get(
            `
            SELECT * FROM users
            WHERE id=?
            `,
            [id],
            callback
        );

    }
   static count(callback) {

    db.get(
        "SELECT COUNT(*) AS total FROM users",
        callback
    );

}
static getAll(callback){

    db.all(

        `SELECT
            id,
            name,
            email,
            role,
            isPremium,
            premiumUntil,
            createdAt
        FROM users
        ORDER BY createdAt DESC`,

        callback

    );

}
static delete(id, callback){

    db.run(

        "DELETE FROM users WHERE id=?",

        [id],

        callback

    );

}
static makePremium(id, callback){

    db.run(

        `
        UPDATE users
        SET
            isPremium = 1,
            premiumUntil = datetime('now', '+1 month')
        WHERE id=?
        `,

        [id],

        callback

    );

}

static removePremium(id, callback){

    db.run(

        `
        UPDATE users
        SET
            isPremium = 0,
            premiumUntil = NULL
        WHERE id=?
        `,

        [id],

        callback

    );

}

static updateRole(id, role, callback) {

    db.run(

        `
        UPDATE users
        SET role = ?
        WHERE id = ?
        `,

        [role, id],

        callback

    );

}
}

module.exports = User;