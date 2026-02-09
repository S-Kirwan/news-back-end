const	{ InvalidMethodError } = require("../errors/");

const	invalidMethod = (request, _response, next) =>
{
	const	invalidMethodErr = new InvalidMethodError(`${request.method} invalid method on ${request.originalUrl}`);

	next(invalidMethodErr);
	return ;
};

module.exports = invalidMethod;
