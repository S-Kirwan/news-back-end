const	CustomError = require("./custom-error.js");

class	UnprocessableContentError extends CustomError
{
	constructor(msg = "Server cannot process provided instructions")
	{
		super(msg, 422);
	};
};

module.exports = UnprocessableContentError;
