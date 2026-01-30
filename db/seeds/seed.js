const	db = require("../connection");
const	format = require("pg-format");
const	createLookupObj = require("./seed-utils.js");

async function	seed ({ topicData, userData, articleData, commentData })
{
	await db.query(`DROP TABLE IF EXISTS comments`);
	await db.query(`DROP TABLE IF EXISTS articles`);
	await db.query(`DROP TABLE IF EXISTS users`);
	await db.query(`DROP TABLE IF EXISTS topics`);

	await db.query(
		`CREATE TABLE topics
		(
			slug VARCHAR PRIMARY KEY,
			description VARCHAR,
			img_url VARCHAR(1000)
		);`
	)
	await db.query(
		`CREATE TABLE users
		(
			username VARCHAR PRIMARY KEY,
			name VARCHAR,
			avatar_url VARCHAR(1000)
		);`
	)
	await db.query(
		`CREATE TABLE articles
		(
			article_id SERIAL PRIMARY KEY,
			title VARCHAR,
			topic VARCHAR REFERENCES topics(slug),
			author VARCHAR REFERENCES users(username),
			body text,
			created_at timestamp DEFAULT CURRENT_TIMESTAMP,
			votes INT DEFAULT 0,
			article_img_url VARCHAR(1000)
		);`
	)
	await db.query(
		`CREATE TABLE comments
		(
			comment_id SERIAL PRIMARY KEY,
			article_id INT REFERENCES articles(article_id) NOT NULL,
			body text,
			votes INT DEFAULT 0,
			author VARCHAR REFERENCES users(username),
			created_at timestamp DEFAULT CURRENT_TIMESTAMP
		);`
	)

	const	topicsValues = topicData.map((topic) =>
	{
		return ([topic.slug, topic.description, topic.img_url]);
	});
	const	insertTopics = format(`INSERT INTO topics (slug, description, img_url) VALUES %L`, topicsValues);
	await db.query(insertTopics);

	const	usersValues = userData.map((user) =>
	{
		return ([user.username, user.name, user.avatar_url])
	});
	const	insertUsers = format(`INSERT INTO users (username, name, avatar_url) VALUES %L`, usersValues);
	await db.query(insertUsers);

	const	articlesValues = articleData.map((article) =>
	{
		return ([article.title, article.topic, article.author, article.body, article.votes, article.article_img_url])
	});
	const	insertArticles = format(`INSERT INTO articles (title, topic, author, body, votes, article_img_url) VALUES %L RETURNING *`, articlesValues);
	const	articleResult = await db.query(insertArticles);
	const	articlesLookupObj = createLookupObj(articleResult.rows, "title", "article_id");

	const	commentsValues = commentData.map((comment) =>
	{
		return ([articlesLookupObj[comment.article_title], comment.body, comment.votes, comment.author, comment.created_at])
	})
	const	insertComments = format(`INSERT INTO comments (article_id, body, votes, author, created_at) VALUES %L`, commentsValues);
	await db.query(insertComments);
};

module.exports = seed;
