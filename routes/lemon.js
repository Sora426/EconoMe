const express = require("express");

const router = express.Router();

const lemonController = require("../controllers/lemonController");

router.post("/", lemonController.handleWebhook);

module.exports = router;