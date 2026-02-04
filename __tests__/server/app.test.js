const	request = require("supertest");
const	seed = require("../../db/seeds/seed.js");
const	data = require("../../db/data/test-data/");
const	app = require("../../app.js");
const	db = require("../../db/connection.js");

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
