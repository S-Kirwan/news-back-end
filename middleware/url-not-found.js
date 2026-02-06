const	{ NotFoundError } = require("../errors/");

const	urlNotFound = (request, _response, next) =>
{
	const	badUrlError = new NotFoundError(`${request.url} Not Found`);

	return (next(badUrlError));
}

module.exports = urlNotFound;
