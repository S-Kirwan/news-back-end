const	{ NotFoundError, BadRequestError, UnprocessableContentError } = require("../errors/");
const	{ retrieveCommentsByArticle, newCommentToArticle, removeComment } = require("../services/comments.service.js");

exports.getCommentsByArticle = async (request, response, next) =>
{
	const	articleId = request.params.article_id;

	if (isNaN(Number(articleId)))
	{
		next(new BadRequestError("Bad Request - Invalid article_id"));
		return ;
	};

	const	comments = await retrieveCommentsByArticle(articleId);

	if (comments === null)
	{
		next(new NotFoundError("No comments found"));
		return ;
	};
	response.status(200).send({ comments });
	return ;
};

exports.postCommentToArticle = async (request, response, next) =>
{
	const	articleId = request.params.article_id;
	const	{ body : comment } = request;
	const	{ username, body } = comment;
	
	if(isNaN(Number(articleId)))
	{
		next(new BadRequestError("Bad Request - Invalid article_id"))
		return ;
	};

	const	insertedComment = await newCommentToArticle(comment, articleId);

	if (insertedComment === null)
	{
		next(new NotFoundError());
		return ;
	}
	response.status(201).send( { comment : insertedComment } );
	return ;
};

exports.deleteComment = async (request, response, next) =>
{
	const	commentId = request.params.comment_id;

	if (isNaN(Number(commentId)))
	{
		next(new BadRequestError("Bad Request - Invalid comment_id"))
		return ;
	};

	const	deleteResult = await removeComment(commentId);

	if (deleteResult === null)
	{
		next(new NotFoundError());
		return ;
	}
	response.status(204).send();
	return ;
};
