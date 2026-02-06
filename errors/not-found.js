const	{ CustomError } = require("./custom-error.js");

class	NotFoundError extends CustomError
{
	constructor(msg = "Not Found")
	{
		super(msg, 404);
	};
};

exports.NotFoundError = NotFoundError;
