const	{ retrieveAllTopics } = require("../services/topics.service.js");

const	getAllTopics = async (request, response) =>
{
	const	topics = await retrieveAllTopics();

	response.status(200).send( { topics } );
	return ;
};

module.exports = getAllTopics;
