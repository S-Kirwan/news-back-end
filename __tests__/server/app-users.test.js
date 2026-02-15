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
