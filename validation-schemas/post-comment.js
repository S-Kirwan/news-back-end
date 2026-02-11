const	{ Joi } = require("express-validation");

const	postCommentSchema =
{
	body: Joi.object(
		{
			username: Joi.string().required(),
			body: Joi.string().required()
		})
}

module.exports = postCommentSchema;
