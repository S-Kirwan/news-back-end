const	CustomError = require("./custom-error.js");

class BadRequestError extends CustomError
{
	constructor(msg = "Bad Request")
	{
		super(msg, 400);
	};
};

module.exports = BadRequestError;
