const	{ fetchCommentsByArticle, insertCommentToArticle } = require("../models/comments.model.js");
const	{ doesArticleExist } = require("../models/articles.model.js");
const	{ UnprocessableContentError, NotFoundError } = require("../errors/");
const	{ doesUsernameExist } = require("../models/users.model.js");

exports.retrieveCommentsByArticle = async (articleId) =>
{
	const	comments = await fetchCommentsByArticle(articleId);
	
	if (comments[0] === undefined)
		return (null);
	return (comments);
}

exports.newCommentToArticle = async (comment, articleId) =>
{
	const	{ username, body } = comment;

	if (await doesUsernameExist(username) === false)
		return (null);
	if (await doesArticleExist(articleId) === false)
		return (null);

	const	insertedComment = await insertCommentToArticle(username, body, articleId);

	return (insertedComment);
};
