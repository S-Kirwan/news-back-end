const	{
	retrieveAllArticles,
	retrieveAllArticlesFormatted,
	retrieveArticleById,
	amendArticleById
} = require("../services/articles.service.js");
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

	if (article === null)
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

exports.patchArticleById = async (request, response, next) =>
{
	const	incomingVotes = request.body.inc_votes;
	const	requestedId = request.params.article_id;

	if (isNaN(Number(requestedId)))
	{
		next(new BadRequestError("Bad Request - Invalid article_id"));
		return ;
	}
	
	const	updatedArticle = await amendArticleById(requestedId, incomingVotes);

	if (updatedArticle === null)
	{
		next(new NotFoundError("article_id not found"));
		return ;
	}
	else
	{
		response.status(200).send( { article : updatedArticle })
		return ;
	}
};
