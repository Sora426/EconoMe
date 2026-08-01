const express = require("express");

const router = express.Router();

const premiumController =
require("../controllers/premiumController");

router.get("/", premiumController.index);

module.exports = router;