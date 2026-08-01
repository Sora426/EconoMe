const db = require("../config/database");

class Material {

    static getAll(callback){

        db.all(
            "SELECT * FROM materials ORDER BY id DESC",
            callback
        );

    }

    static getById(id, callback){

        db.get(
            "SELECT * FROM materials WHERE id=?",
            [id],
            callback
        );

    }

    static create(material, callback){

        db.run(
            `
            INSERT INTO materials
            (title,description,file,examType,isPremium)

            VALUES(?,?,?,?,?)
            `,
            [
                material.title,
                material.description,
                material.file,
                material.examType,
                material.isPremium
            ],
            callback
        );

    }

    static update(id, material, callback){

        db.run(
            `
            UPDATE materials
            SET
            title=?,
            description=?,
            file=?,
            examType=?,
            isPremium=?

            WHERE id=?
            `,
            [
                material.title,
                material.description,
                material.file,
                material.examType,
                material.isPremium,
                id
            ],
            callback
        );

    }

    static delete(id, callback){

        db.run(
            "DELETE FROM materials WHERE id=?",
            [id],
            callback
        );

    }
static search(keyword, callback){

    db.all(
        `
        SELECT *

        FROM materials

        WHERE

        title LIKE ?

        OR examType LIKE ?

        OR description LIKE ?

        `,
        [
            `%${keyword}%`,
            `%${keyword}%`,
            `%${keyword}%`
        ],
        callback
    );

}
static getLatest(limit, callback){

    db.all(

        `SELECT * FROM materials
         ORDER BY id DESC
         LIMIT ?`,

        [limit],

        callback

    );

}
static count(callback){

    db.get(

        "SELECT COUNT(*) AS total FROM materials",

        callback

    );

}
}

module.exports = Material;