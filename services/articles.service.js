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

exports.retrieveAllArticlesFormatted = async (query) =>
{
	// The comment count column does not exist as a column on the articles
	// table, only a column on the query table returned from the model.
	// For other columns sorted, explicitly 'articles.' is added to confirm
	// that the ORDER by is referring to the articles table. With comment_count
	// this is unneccessary because it can only refer to the comment_count column
	// created on the temporary query table.
	if (query.sort_by !== "comment_count")
	{
		query.sort_by = "articles." + query.sort_by;
	};

	const	formattedArticles = await fetchAllArticlesFormatted(query);

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
