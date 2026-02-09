const	{ NotFoundError, BadRequestError } = require("../errors/");
const	retrieveCommentsByArticle = require("../services/comments.service.js");
const	catchAsyncErrors = require("../middleware/catch-async-errors.js");

const	getCommentsByArticle = catchAsyncErrors(async (request, response, next) =>
{
	const	articleId = request.params.article_id;

	if (isNaN(Number(articleId)))
		return (next(new BadRequestError("Bad Request - Invalid article_id")));

	const	comments = await retrieveCommentsByArticle(articleId);

	if (comments[0] === undefined)
		return (next(new NotFoundError("No comments found")));
	else
		return (response.status(200).send({ comments }));
});

module.exports = getCommentsByArticle;
