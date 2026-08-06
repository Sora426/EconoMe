const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const controller = require("../controllers/bookProgressController");

router.post("/save", auth, controller.save);
 

module.exports = router;
