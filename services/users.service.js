const	{ fetchAllUsers } = require("../models/users.model.js");

exports.retrieveAllUsers = async () =>
{
	const	users = await fetchAllUsers();

	return (users);
}

