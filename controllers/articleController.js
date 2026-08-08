const Article = require("../models/Article");
const Favorite = require("../models/Favorite");

exports.index = (req,res)=>{

    Article.getAll((err,articles)=>{

        if(err) return res.send(err.message);

        res.render("articles/index",{

            articles

        });

    });

};

exports.admin=(req,res)=>{

    Article.getAll((err,articles)=>{

        res.render("admin/articles",{

            articles

        });

    });

};

exports.new=(req,res)=>{

    res.render("admin/newArticle");

};

exports.create=(req,res)=>{

    const article = {

    title:req.body.title,
    category:req.body.category,
    description:req.body.description,

    preview:req.body.preview,

    content:req.body.content,

    image:req.file ? req.file.filename : null,

    isPremium:req.body.isPremium ? 1 : 0

};
    console.log(article);
    Article.create(article,(err)=>{
    console.log(article);
        if(err){
            console.log(err);
            return res.send(err.message);

        }

        res.redirect("/admin/articles");

    });

};
exports.show = (req, res) => {

    const id = req.params.id;

    Article.getById(id, (err, article) => {

        if (err) {
            return res.send(err.message);
        }

        if (!article) {
            return res.send("Article not found");
        }

        Favorite.exists(

    req.session.user ? req.session.user.id : 0,

    "article",

    article.id,

    (err, favorite) => {

        res.render("articles/show",{

            article,

            isFavorite: !!favorite

        });

    }

);

    });
    

};
exports.edit = (req,res)=>{

    Article.getById(

        req.params.id,

        (err,article)=>{

            if(err) return res.send(err.message);

            res.render("admin/editArticle",{

                article

            });

        }

    );

};
exports.update = (req, res) => {

    Article.getById(req.params.id, (err, oldArticle) => {

        if (err) {
            return res.send(err.message);
        }

        if (!oldArticle) {
            return res.send("Article not found");
        }

        const article = {

            title: req.body.title,

            category: req.body.category,

            description: req.body.description,

            preview: req.body.preview,

            content: req.body.content,

            // Keep old image if no new image was uploaded
            image: req.file
                ? req.file.filename
                : oldArticle.image,

            isPremium: req.body.isPremium ? 1 : 0

        };

        Article.update(
            req.params.id,
            article,
            err => {

                if (err) {
                    return res.send(err.message);
                }

                res.redirect("/admin/articles");

            }
        );

    });

};
exports.delete=(req,res)=>{

    Article.delete(

        req.params.id,

        err=>{

            if(err){

                return res.send(err.message);

            }

            res.redirect("/admin/articles");

        }

    );

};
