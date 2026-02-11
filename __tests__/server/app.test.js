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
