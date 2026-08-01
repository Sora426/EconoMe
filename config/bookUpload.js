const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        if(file.fieldname === "cover"){

            cb(null, "uploads/covers");

        }
        else if(file.fieldname === "pdf"){

            cb(null, "uploads/books");

        }

    },

    filename: (req, file, cb) => {

        cb(
            null,
            Date.now() + path.extname(file.originalname)
        );

    }

});

module.exports = multer({

    storage

});