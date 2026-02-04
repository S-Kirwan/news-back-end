const	express = require("express");
const	app = require("../app.js");

const	{ getAllTopics } = require("../controllers/topics.controller.js");

const	router = express.Router();

router.get("/", getAllTopics);

module.exports = router;
