const	db = require("../db/connection.js");

const	fetchCommentsByArticle = async (articleId) =>
{
	const	comments = await db.query(`
		SELECT * FROM comments
		WHERE article_id = $1
		ORDER BY created_at;`, [articleId]);

	return (comments.rows);
}

module.exports = fetchCommentsByArticle;
