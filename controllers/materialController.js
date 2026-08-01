const Material = require("../models/Material");

exports.index = (req, res) => {

    Material.getAll((err, materials) => {

        if (err) return res.send(err.message);

        res.render("materials/index", {
            materials
        });

    });

};

exports.admin = (req, res) => {

    Material.getAll((err, materials) => {

        res.render("admin/materials", {
            materials
        });

    });

};

exports.new = (req, res) => {

    res.render("admin/newMaterial");

};

exports.create = (req, res) => {

    const material = {

        title: req.body.title,

        description: req.body.description,

        examType: req.body.examType,

        file: req.file ? req.file.filename : null,

        isPremium: req.body.isPremium ? 1 : 0

    };

    Material.create(material, err => {

        if (err) {

            console.log(err);

            return res.send(err.message);

        }

        res.redirect("/admin/materials");

    });

};

exports.show = (req, res) => {

    Material.getById(req.params.id, (err, material) => {

        if (err) return res.send(err.message);

        if (!material) {

            return res.send("Material not found");

        }

        res.render("materials/show", {

            material

        });

    });

};
exports.edit = (req, res) => {

    Material.getById(req.params.id, (err, material) => {

        if (err) return res.send(err.message);

        res.render("admin/editMaterial", {

            material

        });

    });

};
exports.update = (req, res) => {

    Material.getById(req.params.id, (err, oldMaterial) => {

        if (err) return res.send(err.message);

        const material = {

            title: req.body.title,

            description: req.body.description,

            examType: req.body.examType,

            file: req.file
                ? req.file.filename
                : oldMaterial.file,

            isPremium: req.body.isPremium ? 1 : 0

        };

        Material.update(req.params.id, material, err => {

            if (err) return res.send(err.message);

            res.redirect("/admin/materials");

        });

    });

};
exports.delete = (req, res) => {

    Material.delete(req.params.id, err => {

        if (err) return res.send(err.message);

        res.redirect("/admin/materials");

    });

};