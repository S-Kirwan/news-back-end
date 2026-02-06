const	{ NotFoundError } = require("../errors/");

const	urlNotFound = (request, _, next) =>
{
	const	badUrlError = new NotFoundError(`${request.url} Not Found`);

	next(badUrlError);
}

module.exports = urlNotFound;
