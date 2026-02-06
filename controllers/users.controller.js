const	{ catchAsyncErrors } = require("../middleware/catch-async-errors.js");
const	{ retrieveAllUsers } = require("../services/users.service.js");

exports.getAllUsers = catchAsyncErrors(async (request, response) =>
{
	const	users = await retrieveAllUsers();

	return (response.status(200).send( { users } ));
});
