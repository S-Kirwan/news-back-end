const	express = require("express");
const	router  = express.Router();

const	{ deleteComment } = require("../controllers/comments.controller.js");

const	invalidMethod = require("../middleware/invalid-method-middleware.js");

router.route("/:comment_id")
	.delete(deleteComment)
	.all(invalidMethod);

module.exports = router;
