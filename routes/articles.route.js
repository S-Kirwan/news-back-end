const	express = require("express");
const	router = express.Router();

const	{ getAllArticles, getArticleById } = require("../controllers/articles.controller.js");
const	getCommentsByArticle = require("../controllers/comments.controller.js");
const	invalidMethod = require("../middleware/invalid-method-middleware.js");


router.get("/", getAllArticles).all("/", invalidMethod);

router.get("/:article_id", getArticleById).all("/:article_id", invalidMethod);

router.get("/:article_id/comments", getCommentsByArticle).all("/:article_id/comments", invalidMethod);

module.exports = router;
