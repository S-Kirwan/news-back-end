const	{ retrieveAllTopics } = require("../services/topics.service.js");

exports.getAllTopics = async (request, response) =>
{
	const	topics = await retrieveAllTopics();

	return (response.status(200).send( { topics } ));
};
