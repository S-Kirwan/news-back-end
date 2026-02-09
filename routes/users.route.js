const	express = require("express");
const	router = express.Router();

const	invalidMethod = require("../middleware/invalid-method-middleware.js");
const	getAllUsers = require("../controllers/users.controller.js");

router.route("/")
	.get(getAllUsers)
	.all(invalidMethod);

module.exports = router;
