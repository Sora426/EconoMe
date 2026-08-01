const express = require("express");

const router = express.Router();

const materialController = require("../controllers/materialController");

router.get("/", materialController.index);

router.get("/:id", materialController.show);

module.exports = router;