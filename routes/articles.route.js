const	express = require("express");
const	router = express.Router();

const	{ getAllArticles, getArticleById } = require("../controllers/articles.controller.js");
const	invalidMethod = require("../middleware/invalid-method-middleware.js");


router.get("/", getAllArticles).all("/", invalidMethod);

router.get("/:article_id", getArticleById).all("/", invalidMethod);

module.exports = router;
