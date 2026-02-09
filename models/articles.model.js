const	db = require("../db/connection.js");

exports.fetchAllArticles = async () =>
{
	const	articles = await db.query(`SELECT * FROM articles`);

	return (articles.rows);
};

exports.fetchAllArticlesFormatted = async () =>
{
	const	formattedArticles = await db.query(
		`
			SELECT
				articles.article_id,
				articles.author,
				articles.title,
				articles.topic,
				articles.created_at,
				articles.votes,
				articles.article_img_url,
				COUNT(comments.comment_id) AS comment_count
			FROM articles
			LEFT JOIN comments ON articles.article_id = comments.article_id
			GROUP BY articles.article_id
			ORDER BY articles.created_at;
		`
	);
	return (formattedArticles.rows);
};

exports.fetchArticleById = async (requestedId) =>
{
	const	article = await db.query(
		`
			SELECT * FROM articles
			WHERE article_id = $1;
		`, [requestedId]
	);

	return (article.rows[0]);
}

exports.doesArticleExist = async (articleId) =>
{
	const	article = await db.query(
		`
			SELECT * FROM articles
			WHERE article_id = $1;
		`, [articleId]
	);

	if (article.rows[0] === undefined)
		return (false);
	else
		return (true);
}
