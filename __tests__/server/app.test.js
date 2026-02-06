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

		for (let i = 0; i < articles.length - 1; i++)
		{
			const	articleDate = Date.parse(articles[i].created_at);
			const	nextArticleDate = Date.parse(articles[i + 1].created_at);

			expect(articleDate >= nextArticleDate).toBe(true);
		};
	});
});

describe("/api/users/", () =>
{
	test("GET", async () =>
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
