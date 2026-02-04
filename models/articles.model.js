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
