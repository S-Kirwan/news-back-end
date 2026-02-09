const	{ retrieveAllArticles, retrieveAllArticlesFormatted, retrieveArticleById } = require("../services/articles.service.js");
const	{ NotFoundError, BadRequestError } = require("../errors/");

exports.getAllArticles = async (request, response, next) =>
{
	const	articles = await retrieveAllArticlesFormatted();

	response.status(200).send( { articles } );
	return ;
};

exports.getArticleById = async (request, response, next) =>
{
	const	requestedId = request.params.article_id;
	
	if (isNaN(Number(requestedId)))
	{
		next(new BadRequestError("Bad Request - Invalid article_id"));
		return ;
	}

	const	article = await retrieveArticleById(requestedId);

	if (article === undefined)
	{
		next(new NotFoundError("article_id not found"));
		return ;
	}
	else
	{
		response.status(200).send( { article } );
		return ;
	}
};
