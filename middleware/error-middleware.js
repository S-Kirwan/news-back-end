const	errorHandler = (err, _request, response, _next) =>
{
	let	errorMessage;

	if (err.statusCode)
		errorMessage = err.message;
	else
		errorMessage = "Internal Server Error";

	response.status(err.statusCode || 500).send( { error : errorMessage } );
}

module.exports = errorHandler;
