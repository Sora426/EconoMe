const express = require("express");
const router = express.Router();
const controller = require("../controllers/feedbackController");

router.get("/", controller.form);
router.post("/", controller.submit);

router.get("/admin", controller.admin);
router.post("/delete/:id", controller.delete);

module.exports = router;