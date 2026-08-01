const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const favoriteController = require("../controllers/favoriteController");
router.get("/", favoriteController.index);
router.get("/", auth, favoriteController.index);

router.post("/add", auth, favoriteController.add);

router.post("/remove", auth, favoriteController.remove);
router.post("/add",favoriteController.add);

router.post("/remove",favoriteController.remove);

module.exports=router;