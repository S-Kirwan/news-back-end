const	{
	fetchAllArticles,
	fetchAllArticlesFormatted,
	fetchArticleById,
	updateArticleById,
	doesArticleExist
} = require("../models/articles.model.js");

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
	if (await doesArticleExist(requestedId) === false)
		return (null);

	const	article = await fetchArticleById(requestedId);

	return (article);
}

exports.amendArticleById = async (requestedId, incomingVotes) =>
{
	if (await doesArticleExist(requestedId) === false)
		return (null);

	const	updatedArticle = await updateArticleById(requestedId, incomingVotes);

	return (updatedArticle);
}
