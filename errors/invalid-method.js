const	CustomError = require("./custom-error.js");

class InvalidMethodError extends CustomError
{
	constructor(msg = "Invalid Method")
	{
		super(msg, 405);
	};
};

module.exports = InvalidMethodError;
