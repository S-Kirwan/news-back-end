const	errorHandler = (err, _request, response, _next) =>
{
	const	errorMessage = err.message || "Internal Server Error";

	response.status(err.statusCode || 500).send( { error : errorMessage } );
}

exports.errorHandler = errorHandler;
