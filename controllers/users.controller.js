const	{ retrieveAllUsers } = require("../services/users.service.js");

exports.getAllUsers = async (request, response) =>
{
	const	users = await retrieveAllUsers();

	return (response.status(200).send( { users } ));
}
