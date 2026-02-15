const	express = require("express");
const	router = express.Router();

const	{ validate } = require("express-validation");

const	{ postCommentToArticle, getCommentsByArticle } = require("../controllers/comments.controller.js");
const	{ getAllArticles, getArticleById, patchArticleById } = require("../controllers/articles.controller.js");
const	{ postCommentSchema, patchArticleSchema } = require("../validation-schemas/");

const	invalidMethod = require("../middleware/invalid-method-middleware.js");

router.route("/")
	.get(getAllArticles)
	.all(invalidMethod);

router.route("/:article_id")
	.get(getArticleById)
	.patch(validate(patchArticleSchema), patchArticleById)
	.all(invalidMethod);

router.route("/:article_id/comments")
	.get(getCommentsByArticle)
	.post(validate(postCommentSchema), postCommentToArticle)
	.all(invalidMethod);

module.exports = router;
