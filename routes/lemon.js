const express = require("express");
const router = express.Router();

const lemonSqueezyController = require("../controllers/lemonController");

router.post("/", lemonController.handleWebhook);

module.exports = router;