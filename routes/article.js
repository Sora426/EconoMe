const express=require("express");

const router=express.Router();
const upload = require("../config/multer");
const articleController=require("../controllers/articleController");

router.get("/",articleController.index);
router.get("/:id", articleController.show);
module.exports=router;