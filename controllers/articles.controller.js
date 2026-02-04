const	{ retrieveAllArticles, retrieveAllArticlesFormatted } = require("../services/articles.service.js");

exports.getAllArticles = async (request, response) =>
{
	const	articles = await retrieveAllArticlesFormatted();

	return (response.status(200).send( { articles } ));
};
