const	express = require("express");

const	{ getAllArticles } = require("../controllers/articles.controller.js");

const	router = express.Router();

router.get("/", getAllArticles);

module.exports = router;
