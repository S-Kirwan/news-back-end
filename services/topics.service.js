const	{ fetchAllTopics } = require("../models/topics.model.js");

exports.retrieveAllTopics = async () =>
{
	const	topics = await fetchAllTopics();

	return (topics);
}
