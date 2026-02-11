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
	describe("GET", () =>
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
});
