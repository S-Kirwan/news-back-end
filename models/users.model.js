const	db = require("../db/connection.js");

exports.fetchAllUsers = async () =>
{
	const	users = await db.query(`SELECT * FROM users`);

	return (users.rows);
};

exports.doesUsernameExist = async (username) =>
{
	const	user = await db.query(`
		SELECT * FROM users
		WHERE username = $1;`, [username]);

	if (user.rows[0] === undefined)
		return (false);
	else
		return (true);
};
