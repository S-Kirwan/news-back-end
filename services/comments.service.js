const	{ fetchCommentsByArticle, insertCommentToArticle, doesCommentExist, deleteCommentFromDatabase } = require("../models/comments.model.js");
const	{ doesArticleExist } = require("../models/articles.model.js");
const	{ doesUsernameExist } = require("../models/users.model.js");
const	{ UnprocessableContentError, NotFoundError } = require("../errors/");

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

exports.removeComment = async (commentId) =>
{
	if (await doesCommentExist(commentId) === false)
		return (null);

	await deleteCommentFromDatabase(commentId);
	
	return (true);
};
