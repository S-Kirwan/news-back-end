const	fetchCommentsByArticle = require("../models/comments.model.js");

const	retrieveCommentsByArticle = async (articleId) =>
{
	const	comments = await fetchCommentsByArticle(articleId);

	return (comments);
}

module.exports = retrieveCommentsByArticle;
