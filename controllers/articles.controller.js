const	{ retrieveAllArticles, retrieveAllArticlesFormatted, retrieveArticleById } = require("../services/articles.service.js");

exports.getAllArticles = async (request, response) =>
{
	const	articles = await retrieveAllArticlesFormatted();

	return (response.status(200).send( { articles } ));
};

exports.getArticleById = async (request, response) =>
{
	const	requestedId = request.params.article_id;

	const	article = await retrieveArticleById(requestedId);

	if (article === null)
		return (response.status(404).send( { error : "Article_id not found" } ));
	else
		return (response.status(200).send( { article } ));
}
