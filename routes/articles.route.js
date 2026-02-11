const	express = require("express");
const	router = express.Router();

const	{ validate } = require("express-validation");

const	{ postCommentToArticle, getCommentsByArticle }= require("../controllers/comments.controller.js");
const	{ getAllArticles, getArticleById } = require("../controllers/articles.controller.js");
const	{ postCommentSchema } = require("../validation-schemas/");
const	invalidMethod = require("../middleware/invalid-method-middleware.js");


router.route("/")
	.get(getAllArticles)
	.all(invalidMethod);

router.route("/:article_id")
	.get(getArticleById)
	.all(invalidMethod);

router.route("/:article_id/comments")
	.get(getCommentsByArticle)
	.post(validate(postCommentSchema), postCommentToArticle)
	.all(invalidMethod);

module.exports = router;
