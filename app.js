const	express = require("express");
const	app = express();

const	errorHandler = require("./middleware/error-middleware.js");
const	urlNotFound = require("./middleware/url-not-found.js");
const	{
	commentsRouter,
	articlesRouter,
	topicsRouter,
	usersRouter
} = require("./routes");

app.use(express.json());

app.use("/api/articles", articlesRouter);
// app.use("/api/comments", commentsRouter);
app.use("/api/topics", topicsRouter);
app.use("/api/users", usersRouter);

app.all('/*splat', urlNotFound);

app.use(errorHandler);

module.exports = app;
