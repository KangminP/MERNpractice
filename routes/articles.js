const express = require("express");
const router = express.Router();
const multer = require("multer");

const Articles = require("../models/articles");

// how to store image with multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./front/public/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

// get all articles
router.get("/", (req, res) => {
    Articles.find()
        .then((article) => res.json(article))
        .catch((err) => res.status(400).json(`Error: ${err}`));
});

// create new article
router.post("/create", upload.single("articleimg"), (req, res) => {
    const newArticle = new Articles({
        title: req.body.title,
        content: req.body.content,
        articleimg: req.file.originalname,
    });

    newArticle
        .save()
        .then(() => res.json("New Article Posted."))
        .catch((err) => res.status(400).json(`Error: ${err}`));
});

// get an article by id
router.get("/:id", (req, res) => {
    Articles.findById(req.params.id)
        .then((article) => res.json(article))
        .catch((err) => res.status(400).json(`Error: ${err}`));
});

// get and article by id and update
router.put("/update/:id", upload.single("articleimg"), (req, res) => {
    Articles.findById(req.params.id).then((article) => {
        article.title = req.body.title;
        article.content = req.body.content;
        article.articleimg = req.file.originalname;

        article
            .save()
            .then(() => res.json("Article Updated."))
            .catch((err) => res.status(400).json(`Error: ${err}`));
    });
});

// delete an article
router.delete("/:id", (req, res) => {
    Articles.findByIdAndDelete(req.params.id)
        .then(() => res.json("Article Deleted."))
        .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
