const db = require("../config/database");

class Article {

    static getAll(callback) {

        db.all(
            "SELECT * FROM articles ORDER BY createdAt DESC",
            callback
        );

    }

    static getById(id, callback){

        db.get(
            "SELECT * FROM articles WHERE id=?",
            [id],
            callback
        );

    }

    static create(article, callback){

    db.run(
        `
        INSERT INTO articles
        (title,category,description,preview,content,image,isPremium)

        VALUES(?,?,?,?,?,?,?)
        `,
        [
            article.title,
            article.category,
            article.description,
            article.preview,
            article.content,
            article.image,
            article.isPremium
        ],

        callback

    );

}

    static delete(id,callback){

        db.run(

            "DELETE FROM articles WHERE id=?",

            [id],

            callback

        );

    }
    static update(id, article, callback){

    db.run(
        `
        UPDATE articles
        SET
        title=?,
        category=?,
        description=?,
        preview=?,
        content=?,
        image=?,
        isPremium=?
        WHERE id=?
        `,
        [
            article.title,
            article.category,
            article.description,
            article.preview,
            article.content,
            article.image,
            article.isPremium,
            id
        ],
        callback
    );

}
static search(keyword, callback){

    db.all(
        `
        SELECT *

        FROM articles

        WHERE

        title LIKE ?

        OR category LIKE ?

        OR description LIKE ?

        ORDER BY createdAt DESC
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

        `SELECT * FROM articles
         ORDER BY createdAt DESC
         LIMIT ?`,

        [limit],

        callback

    );

}
static count(callback){

    db.get(

        "SELECT COUNT(*) AS total FROM articles",

        callback

    );

}

}

module.exports = Article;