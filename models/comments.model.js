const	db = require("../db/connection.js");

exports.fetchCommentsByArticle = async (articleId) =>
{
	const	comments = await db.query(`
		SELECT * FROM comments
		WHERE article_id = $1
		ORDER BY created_at;`, [articleId]);

	return (comments.rows);
};

exports.insertCommentToArticle = async (author, body, articleId) =>
{
	const	insertedComment = await db.query(`
		INSERT INTO comments
		(
			article_id,
			author,
			body
		)
		VALUES
		($1, $2, $3)
		RETURNING *`, [articleId, author, body]);

	return (insertedComment.rows[0]);
};
