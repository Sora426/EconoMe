const db = require("../config/database");

class Book {

    static getAll(callback){

        db.all(
            "SELECT * FROM books ORDER BY id DESC",
            callback
        );

    }

    static getById(id, callback){

        db.get(
            "SELECT * FROM books WHERE id=?",
            [id],
            callback
        );

    }

    static create(book, callback){

    db.run(
        `
        INSERT INTO books
        (
            title,
            author,
            description,
            cover,
            pdf,
            category,
            isPremium
        )

        VALUES(?,?,?,?,?,?,?)
        `,
        [
            book.title,
            book.author,
            book.description,
            book.cover,
            book.pdf,
            book.category,
            book.isPremium
        ],
        callback
    );

}

    static update(id, book, callback){

    db.run(
        `
        UPDATE books
        SET
            title=?,
            author=?,
            description=?,
            cover=?,
            pdf=?,
            category=?,
            isPremium=?

        WHERE id=?
        `,
        [
            book.title,
            book.author,
            book.description,
            book.cover,
            book.pdf,
            book.category,
            book.isPremium,
            id
        ],
        callback
    );

}

    static delete(id, callback){

        db.run(
            "DELETE FROM books WHERE id=?",
            [id],
            callback
        );

    }
static search(keyword, callback){

    db.all(
        `
        SELECT *

        FROM books

        WHERE

        title LIKE ?

        OR author LIKE ?

        OR category LIKE ?

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

        `SELECT * FROM books
         ORDER BY createdAt DESC
         LIMIT ?`,

        [limit],

        callback

    );

}
static count(callback){

    db.get(

        "SELECT COUNT(*) AS total FROM books",

        callback

    );

}
}

module.exports = Book;