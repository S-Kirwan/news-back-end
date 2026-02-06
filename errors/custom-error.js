class CustomError extends Error
{
	constructor (msg, statusCode)
	{
		console.log("msg in customError => ", msg);
		super(msg);
		this.statusCode = statusCode;
	}
}

exports.CustomError = CustomError;
