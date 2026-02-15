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
