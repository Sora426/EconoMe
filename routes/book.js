const express = require("express");
const router = express.Router();

const bookController = require("../controllers/bookController");

router.get("/", bookController.index);

router.get("/:id", bookController.show);

module.exports = router;