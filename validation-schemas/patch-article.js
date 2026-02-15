const	{ Joi } = require("express-validation");

const	patchArticleSchema =
{
	body: Joi.object(
		{
			inc_votes: Joi.number().required()
		})
};

module.exports = patchArticleSchema;
