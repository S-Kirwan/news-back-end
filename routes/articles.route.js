const	express = require("express");

const	{ getAllArticles, getArticleById } = require("../controllers/articles.controller.js");

const	router = express.Router();

router.get("/", getAllArticles);

router.get("/:article_id", getArticleById);

module.exports = router;
