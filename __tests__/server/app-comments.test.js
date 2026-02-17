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

			expect(error).toBe("Validation Failed");
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

				expect(error).toBe("Validation Failed");
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

				expect(error).toBe("Validation Failed");
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

				expect(error).toBe("Validation Failed");
			});
		});
	});
});

describe("/api/comments/:comment_id", () =>
{
	describe("DELETE", () =>
	{
		test("valid comment_id", async () =>
		{
			const	commentIdToDelete = 5;
			const	response = await request(app)
				.delete(`/api/comments/${commentIdToDelete}`)
				.expect(204);

			// Because there is no endpoint for GET on a specific commentId
			// we must use the GET request on the entire article's comments,
			// then check if the comment has been deleted
			// commentId 5 is in article ID 1 in the test database
			const	{ body }= await request(app)
				.get("/api/articles/1/comments")
				.expect(200);

			const	{ comments } = body;
			let 	commentDeleted = true;

			for (let comment of comments)
			{
				if (comment.comment_id === commentIdToDelete)
					commentDeleted = false;
			};
			expect(commentDeleted).toBe(true);
		});
		test("comment_id does not exist", async () =>
		{
			const	{ body } = await request(app)
				.delete("/api/comments/21474")
				.expect(404);

			const	{ error } = body;

			expect(error).toBe("Not Found");
		});
		test("invalid comment_id", async () =>
		{
			const	{ body } = await request(app)
				.delete("/api/comments/razorblade")
				.expect(400);

			const	{ error } = body;

			expect(error).toBe("Bad Request - Invalid comment_id");
		});
	});
});
