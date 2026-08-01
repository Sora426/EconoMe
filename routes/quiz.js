const express = require("express");

const router = express.Router();

const quizController = require("../controllers/quizController");

router.get("/", quizController.index);
router.get("/progress",quizController.progress);
router.get("/:id", quizController.show);
router.post("/:id/submit", quizController.submit);

module.exports = router;