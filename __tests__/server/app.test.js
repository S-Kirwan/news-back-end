const	request = require("supertest");
const	seed = require("../../db/seeds/seed.js");
const	data = require("../../db/data/test-data/");
const	app = require("../../app.js");
const	db = require("../../db/connection.js");

beforeEach(() =>
{
	return (seed(data));
});

afterAll(() =>
{
	return (db.end());
});

describe("Generic bad url - unhandled endpoint", () =>
{
	test("Returns 404 - not found on endpoint not routed", async () =>
	{
		const	badPath = "/abc/pharmaceutical";

		const	{ body } = await request(app)
			.get(badPath)
			.expect(404);

		const	{ error } = body;
		expect(error).toBe(`${badPath} Not Found`);
	});
});

describe("/api/topics/", () =>
{
	test("GET", async () =>
	{
		const	{ body } = await request(app)
			.get("/api/topics")
			.expect(200);

		const	{ topics } = body;

		expect(Array.isArray(topics)).toBe(true);
		for (let topic of topics)
		{
			expect(typeof topic.slug).toBe("string");
			expect(typeof topic.description).toBe("string");
			expect(typeof topic.img_url).toBe("string");
		}
	});
	test("DELETE - rejects invalid method (405)", async () =>
	{
		const	{ body } = await request(app)
			.delete("/api/topics")
			.expect(405);

		const	{ error } = body;

		expect(error).toBe("DELETE invalid method on /api/topics");
	});
});

describe("/api/users/", () =>
{
	test("GET returns valid user body", async () =>
	{
		const	{ body } = await request(app)
			.get("/api/users")
			.expect(200);

		const	{ users } = body;

		for (let user of users)
		{
			expect(typeof user.username).toBe("string");
			expect(typeof user.name).toBe("string");
			expect(typeof user.avatar_url).toBe("string");
		}
	});
	test("DELETE - rejects invalid method", async () =>
	{
		const	{ body } = await request(app)
			.delete("/api/users")
			.expect(405);

		const	{ error } = body;

		expect(error).toBe("DELETE invalid method on /api/users");
	});
});

describe("/api/articles/", () =>
{
	test("GET", async () =>
	{
		const	{ body } = await request(app)
			.get("/api/articles")
			.expect(200);

		const	{ articles } = body;

		expect(Array.isArray(articles)).toBe(true);
		for (let article of articles)
		{
			expect(typeof article.article_img_url).toBe("string");
			expect(typeof article.comment_count).toBe("number");
			expect(typeof article.article_id).toBe("number");
			expect(typeof article.created_at).toBe("string");
			expect(typeof article.author).toBe("string");
			expect(typeof article.title).toBe("string");
			expect(typeof article.topic).toBe("string");
			expect(typeof article.votes).toBe("number");
		};

		// Because the articles are all created at the same time as the db is re-seeded
		// before every test this is always true.
		// This assertion is just here for fun.
		for (let i = 0; i < articles.length - 1; i++)
		{
			const	articleDate = Date.parse(articles[i].created_at);
			const	nextArticleDate = Date.parse(articles[i + 1].created_at);

			expect(articleDate >= nextArticleDate).toBe(true);
		};
	});
	test("DELETE - rejects invalid method", async () =>
	{
		const	{ body } = await request(app)
			.delete("/api/articles")
			.expect(405);

		const	{ error } = body;

		expect(error).toBe("DELETE invalid method on /api/articles");
	});
});

describe("/api/articles/:article_id", () =>
{
	test("GET, requested article_id exists", async () =>
	{
		const	{ body } = await request(app)
			.get("/api/articles/3")
			.expect(200);

		const	{ article } = body;

		expect(typeof article).toBe("object");
		expect(Array.isArray(article)).toBe(false);

		expect(typeof article.article_img_url).toBe("string");
		expect(typeof article.article_id).toBe("number");
		expect(typeof article.created_at).toBe("string");
		expect(typeof article.author).toBe("string");
		expect(typeof article.title).toBe("string");
		expect(typeof article.topic).toBe("string");
		expect(typeof article.votes).toBe("number");
		expect(typeof article.body).toBe("string");
	});
	test("GET, requested article_id does not exist", async () =>
	{
		const	{ body } = await request(app)
			.get("/api/articles/5000")
			.expect(404);

		const { error } = body;

		expect(error).toBe("article_id not found");
	});
	test("GET, invalid article_id", async () =>
	{
		const	{ body } = await request(app)
			.get("/api/articles/pineapple")
			.expect(400);

		const	{ error } = body;

		expect(error).toBe("Bad Request - Invalid article_id");
	});
});

describe("/api/articles/:article_id/comments", () =>
{
	describe("GET", () =>
	{
		test("requested article_id exists", async () =>
		{
			const	{ body } = await request(app)
				.get("/api/articles/5/comments")
				.expect(200);
	
			const	{ comments } = body;
	
			for (let comment of comments)
			{
				expect(comment.article_id).toBe(5);
				expect(typeof comment.created_at).toBe("string");
				expect(typeof comment.comment_id).toBe("number");
				expect(typeof comment.author).toBe("string");
				expect(typeof comment.votes).toBe("number");
				expect(typeof comment.body).toBe("string");
			};
		});
		test("requested article_id has no comments", async () =>
		{
			const	{ body } = await request(app)
				.get("/api/articles/123123/comments")
				.expect(404);
	
			const	{ error } = body;
	
			expect(error).toBe("No comments found")
		});
		test("invalid article_id", async () =>
		{
			const	{ body } = await request(app)
				.get("/api/articles/pineapple/comments")
				.expect(400);
	
			const	{ error } = body;
	
			expect(error).toBe("Bad Request - Invalid article_id")
		});
	});
	describe("POST", () =>
	{
		test("Valid syntax, properties, article_id", async () =>
		{
			const	postComment =
			{
				"username":"butter_bridge",
				"body":"Incense is burning"
			};

			const	{ body } = await request(app)
				.post("/api/articles/5/comments")
				.send(postComment)
				.expect(201);

			const	{ comment } = body;

			expect(comment.article_id).toBe(5);
			expect(comment.author).toBe("butter_bridge");
			expect(comment.votes).toBe(0);
			expect(comment.body).toBe("Incense is burning");
			expect(typeof comment.comment_id).toBe("number");
			expect(typeof comment.created_at).toBe("string");
		});
		test("article_id does not exist", async () =>
		{
			const	postComment =
			{
				"username":"butter_bridge",
				"body":"Incense is burning"
			};
			
			const	{ body } = await request(app)
				.post("/api/articles/123123/comments")
				.send(postComment)
				.expect(404);
			
			const	{ error } = body;

			expect(error).toBe("Not Found");
		});
		test("username does not exist", async () =>
		{
			const	postComment =
			{
				"username":"sean",
				"body":"Incense is burning"
			};
			
			const	{ body } = await request(app)
				.post("/api/articles/5/comments")
				.send(postComment)
				.expect(404);
			
			const	{ error } = body;

			expect(error).toBe("Not Found");
		})
		test("Empty body", async () =>
		{
			const	postComment =
			{
				"username":"butter_bridge",
				"body":""
			};

			const	{ body } = await request(app)
				.post("/api/articles/5/comments")
				.send(postComment)
				.expect(422);
			
			const	{ error } = body;

			expect(error).toBe("Username & body must contain data");
		});
		describe("Valid syntax, incorrect properties", () =>
		{
			test("Missing username", async () =>
			{
				const	commentMissingUsername =
				{
					"body":"Aerosol"
				};


				const	{ body } = await request(app)
					.post("/api/articles/5/comments")
					.send(commentMissingUsername)
					.expect(422);

				const	{ error } = body;

				expect(error).toBe("Comments require username & body");
			});
			test("Missing body", async () =>
			{
				const	commentMissingBody =
				{
					"username":"butter_bridge"
				};

				const	{ body } = await request(app)
					.post("/api/articles/5/comments")
					.send(commentMissingBody)
					.expect(422);

				const	{ error } = body;

				expect(error).toBe("Comments require username & body");
			});
			test("Missing both", async () =>
			{
				const	commentMissingBoth =
				{
					"box":"razor"
				};

				const	{ body } = await request(app)
					.post("/api/articles/5/comments")
					.send(commentMissingBoth)
					.expect(422);

				const	{ error } = body;

				expect(error).toBe("Comments require username & body");
			});
		});
	});
});
