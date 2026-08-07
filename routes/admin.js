const express=require("express");
const router=express.Router();
const quizController = require("../controllers/quizController");
const admin=require("../middleware/admin");
const Question = require("../models/Question");
const articleController=require("../controllers/articleController");
const adminDashboardController = require("../controllers/adminDashboardController");
const imageUpload = require("../config/imageUpload");
const bookUpload = require("../config/bookUpload");
const bookController = require("../controllers/bookController");
const materialController = require("../controllers/materialController");
const materialUpload = require("../config/materialUpload");
const feedbackController = require("../controllers/feedbackController");
const userController=require("../controllers/userController");

router.get(
    "/users",
    admin,
    userController.admin
);
router.get(
    "/feedback",
    admin,
    feedbackController.admin
);

router.post(
    "/feedback/delete/:id",
    admin,
    feedbackController.delete
);
router.get("/", admin, adminDashboardController.dashboard);

router.get(

"/articles",

admin,

articleController.admin

);

router.get(

"/articles/new",

admin,

articleController.new

);
router.get(
    "/materials",
    admin,
    materialController.admin
);

router.get(
    "/materials/new",
    admin,
    materialController.new
);

router.post(
    "/materials",
    admin,
    materialUpload.single("file"),
    materialController.create
);
router.get(
    "/materials/edit/:id",
    admin,
    materialController.edit
);

router.post(
    "/materials/update/:id",
    admin,
    materialUpload.single("file"),
    materialController.update
);

router.get(
    "/materials/delete/:id",
    admin,
    materialController.delete
);
router.post(

"/articles",
admin,
imageUpload.single("image"),
articleController.create

);
router.get(
"/articles/edit/:id",
admin,
articleController.edit
);

router.post(
"/articles/update/:id",
admin,
imageUpload.single("image"),
articleController.update
);

router.get(
"/articles/delete/:id",
admin,
articleController.delete
);
router.get(
    "/books",
    admin,
    bookController.admin
);

router.get(
    "/books/new",
    admin,
    bookController.new
);

router.post(
    "/books",
    admin,
    bookUpload.fields([
        {
            name: "cover",
            maxCount: 1
        },
        {
            name: "pdf",
            maxCount: 1
        }
    ]),
    bookController.create
);
router.get(
    "/books/edit/:id",
    admin,
    bookController.edit
);

router.post(
    "/books/update/:id",
    admin,
    bookUpload.fields([
        {
            name: "cover",
            maxCount: 1
        },
        {
            name: "pdf",
            maxCount: 1
        }
    ]),
    bookController.update
);

router.get(
    "/books/delete/:id",
    admin,
    bookController.delete
);
router.get(
    "/quizzes",
    admin,
    quizController.admin
);

router.get(
    "/quizzes/new",
    admin,
    quizController.new
);

router.post(
    "/quizzes",
    admin,
    quizController.create
);
router.get(
    "/quizzes/delete/:id",
    admin,
    quizController.delete
);
// for questions 

router.get(
    "/quizzes/:id/questions/new",
    admin,
    quizController.newQuestion
);


router.post(
    "/admin/quizzes/:id/questions",
    admin,
    upload.single("image"),
    quizController.createQuestion
);
router.get(
"/quizzes/:id/questions",
admin,
quizController.manageQuestions
);
router.get(
"/questions/edit/:id",
admin,
quizController.editQuestion
);

router.post(
"/questions/update/:id",
admin,
quizController.updateQuestion
);

router.get(
"/questions/delete/:id",
admin,
quizController.deleteQuestion
);
router.get(
    "/users/delete/:id",
    admin,
    userController.delete
);

router.get(
    "/users/make-premium/:id",
    admin,
    userController.makePremium
);

router.get(
    "/users/remove-premium/:id",
    admin,
    userController.removePremium
);
router.get("/users/make-admin/:id", userController.makeAdmin);

router.get("/users/make-user/:id", userController.makeUser);
module.exports=router;