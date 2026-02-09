const	{ retrieveAllUsers } = require("../services/users.service.js");

const	getAllUsers = async (request, response) =>
{
	const	users = await retrieveAllUsers();

	response.status(200).send( { users } );
	return ;
};

module.exports = getAllUsers;
