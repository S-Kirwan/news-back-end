const	db = require("../db/connection.js");

exports.fetchCommentsByArticle = async (articleId) =>
{
	const	comments = await db.query(
		`
			SELECT * FROM comments
			WHERE article_id = $1
			ORDER BY created_at;
		`, [articleId]);

	return (comments.rows);
};

exports.insertCommentToArticle = async (author, body, articleId) =>
{
	const	insertedComment = await db.query(
		`
			INSERT INTO comments
			(
				article_id,
				author,
				body
			)
			VALUES
			($1, $2, $3)
			RETURNING *
		`, [articleId, author, body]);

	return (insertedComment.rows[0]);
};

exports.doesCommentExist = async (commentId) =>
{
	const	comment = await db.query(
		`
			SELECT * FROM comments
			WHERE comment_id = $1
		`, [commentId]);

	if (comment.rows[0] === undefined)
		return (false);
	else
		return (true);
};

exports.deleteCommentFromDatabase = async (commentId) =>
{
	await db.query(
		`
			DELETE FROM comments
			WHERE comment_id = $1
		`, [commentId]);
};
