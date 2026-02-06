const	catchAsyncErrors = (asyncFunction) =>
{
	return ((request, response, next) =>
		{
			asyncFunction(request, response, next)
			.catch((error) => next(error));
		});
};

exports.catchAsyncErrors = catchAsyncErrors;
