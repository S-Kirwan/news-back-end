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

describe("/api/topics/", () =>
{
	test("GET /api/topics", async () =>
	{
		const { body } = await request(app)
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
});

describe("/api/articles/", () =>
{
	test("GET /api/articles", async () =>
	{
		const { body } = await request(app)
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

		for (let i = 0; i < articles.length - 1; i++)
		{
			const	articleDate = Date.parse(articles[i].created_at);
			const	nextArticleDate = Date.parse(articles[i + 1].created_at);

			expect(articleDate >= nextArticleDate).toBe(true);
		};
	});
});
