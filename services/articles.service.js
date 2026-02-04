const	{ fetchAllArticles, fetchAllArticlesFormatted, fetchArticleById } = require("../models/articles.model.js");

exports.retrieveAllArticles = async () =>
{
	const	articles = await fetchAllArticles();

	return (articles);
};

exports.retrieveAllArticlesFormatted = async () =>
{
	const	formattedArticles = await fetchAllArticlesFormatted();

	for (let article of formattedArticles)
	{
		article.comment_count = Number(article.comment_count)
	}
	return (formattedArticles);
};

exports.retrieveArticleById = async (requestedId) =>
{
	const	article = await fetchArticleById(requestedId);

	if (article === undefined)
		return (null);
	else
		return (article);
}
