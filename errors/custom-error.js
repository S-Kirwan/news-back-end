class CustomError extends Error
{
	constructor (msg, statusCode)
	{
		super(msg);
		this.statusCode = statusCode;
	}
}

exports.CustomError = CustomError;
