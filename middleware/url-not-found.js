const	{ NotFoundError } = require("../errors/");

exports.urlNotFound = (request, _, next) =>
{
	const	badUrlError = new NotFoundError(`${request.url} Not Found`);

	next(badUrlError);
}
