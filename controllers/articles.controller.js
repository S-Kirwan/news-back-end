const	{ retrieveAllArticles, retrieveAllArticlesFormatted, retrieveArticleById } = require("../services/articles.service.js");
const	{ NotFoundError, BadRequestError } = require("../errors/");
const	{ catchAsyncErrors } = require("../middleware/catch-async-errors.js");

exports.getAllArticles = catchAsyncErrors(async (request, response, next) =>
{
	const	articles = await retrieveAllArticlesFormatted();

	return (response.status(200).send( { articles } ));
});

exports.getArticleById = catchAsyncErrors(async (request, response, next) =>
{
	const	requestedId = request.params.article_id;
	
	if (isNaN(Number(requestedId)))
		return (next(new BadRequestError("Bad Request - Invalid article_id")));

	const	article = await retrieveArticleById(requestedId);

	if (article === undefined)
		return (next(new NotFoundError("article_id not found")));
	else
		return (response.status(200).send( { article } ));
});
