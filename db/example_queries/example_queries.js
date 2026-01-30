const db = require("../connection.js");

async function	make_queries()
{
	// const	users = await db.query(`SELECT * FROM users`);
	// console.log(users.rows);
	//
	// const	codingTopics = await db.query(`SELECT * FROM articles WHERE topic = 'coding'`);
	// console.log(codingTopics.rows);
	//
	// const	sadComments = await db.query(`SELECT * FROM comments WHERE votes < 0`)
	// console.log(sadComments.rows);
	//
	// const	topics = await db.query(`SELECT * FROM topics`);
	// console.log(topics.rows);
	//
	// const	grumpyArticles = await db.query(`SELECT * FROM articles WHERE author = 'grumpy19'`);
	// console.log(grumpyArticles.rows);
	//
	const	happyComments = await db.query(`SELECT * FROM comments WHERE votes > 10`)
	console.log(happyComments.rows);
	db.end();
}

make_queries();
