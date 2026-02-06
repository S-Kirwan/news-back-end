const	express = require("express");
const	router = express.Router();

const	invalidMethod = require("../middleware/invalid-method-middleware.js");
const	getAllTopics = require("../controllers/topics.controller.js");

router.get("/", getAllTopics).all("/", invalidMethod);

module.exports = router;
