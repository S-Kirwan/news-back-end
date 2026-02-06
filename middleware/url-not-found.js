const	{ NotFoundError } = require("../errors/");

exports.urlNotFound = (request, _, next) =>
{
	const	badUrlError = new NotFoundError(`${request.url} is not a valid path`);

	next(badUrlError);
}
