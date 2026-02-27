const	{
	retrieveAllArticles,
	retrieveAllArticlesFormatted,
	retrieveArticleById,
	amendArticleById
} = require("../services/articles.service.js");
const	{ NotFoundError, BadRequestError, UnprocessableContentError } = require("../errors/");

function	validateGetArticlesSortingQuery(query)
{
	switch (query.sort_by)
	{
		case "article_id":
			return (true);
		case "title":
			return (true);
		case "topic":
			return (true);
		case "author":
			return (true);
		case "body":
			return (true);
		case "created_at":
			return (true);
		case "votes":
			return (true);
		case "article_img_url":
			return (true);
		case "comment_count":
			return (true);
		default:
			return (false);
	}
};

exports.getAllArticles = async (request, response, next) =>
{
	const	{ query } = request;

	if (query.sort_by !== undefined)
	{
		if (validateGetArticlesSortingQuery === false)
		{
			next (new UnprocessableContentError("Invalid sort query"));
			return ;
		}
	}
	else {
		query.sort_by = "created_at";
	}

	if (query.order !== undefined)
	{
		query.order = query.order.toUpperCase();
		if (query.order !== "ASC" && query.order !== "DESC")
		{
			next (new UnprocessableContentError("Invalid order query"));
			return ;
		}
	}
	else {
		query.order = "DESC";
	}

	const	articles = await retrieveAllArticlesFormatted(query);

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
	console.log(request.body);
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
