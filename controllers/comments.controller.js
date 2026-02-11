const	{ NotFoundError, BadRequestError, UnprocessableContentError } = require("../errors/");
const	{ retrieveCommentsByArticle, newCommentToArticle } = require("../services/comments.service.js");

exports.getCommentsByArticle = async (request, response, next) =>
{
	const	articleId = request.params.article_id;

	if (isNaN(Number(articleId)))
	{
		next(new BadRequestError("Bad Request - Invalid article_id"));
		return ;
	}

	const	comments = await retrieveCommentsByArticle(articleId);

	if (comments === null)
	{
		next(new NotFoundError("No comments found"));
		return ;
	}
	else
	{
		response.status(200).send({ comments });
		return ;
	}
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
	}

	const	insertedComment = await newCommentToArticle(comment, articleId);

	if (insertedComment === null)
	{
		next(new NotFoundError());
		return ;
	}
	else
	{
		response.status(201).send( { comment : insertedComment } );
		return ;
	}
};
