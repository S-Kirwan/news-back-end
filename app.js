const	express = require("express");
const	app = express();

const	commentsRouter = require("./routes/comments.route.js");
const	articlesRouter = require("./routes/articles.route.js");
const	topicsRouter = require("./routes/topics.route.js");
const	usersRouter = require("./routes/users.route.js");

app.use(express.json());

app.use("/api/articles", articlesRouter);
// app.use("/api/comments", commentsRouter);
app.use("/api/topics", topicsRouter);
app.use("/api/users", usersRouter);

module.exports = app;
