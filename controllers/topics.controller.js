const	catchAsyncErrors = require("../middleware/catch-async-errors.js");
const	{ retrieveAllTopics } = require("../services/topics.service.js");

const	getAllTopics = catchAsyncErrors(async (request, response) =>
{
	const	topics = await retrieveAllTopics();

	return (response.status(200).send( { topics } ));
});

module.exports = getAllTopics;
