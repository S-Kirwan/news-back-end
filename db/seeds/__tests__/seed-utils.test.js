const	createLookupObj = require("../seed-utils.js");

describe("createLookupObj", () =>
{
	test("Returns an object", () =>
	{
		const employees = [
			{ name : "Sean", job : "Dog Walker"},
			{ name : "Francisco", job : "Pharmacist"}
		];
		
		const output = createLookupObj(employees, "name", "job");

		expect(typeof output).toBe("object");
		expect(Array.isArray(output)).toBe(false);
	})
	test("Returns empty object with empty array input", () =>
	{
		const employees = [];
		const output = createLookupObj(employees, "name", "job");

		expect(output).toEqual({});
	})
	test("One element in array with only two values", () =>
	{
		const employees = [
			{ name : "Sean", job : "Dog Walker"}
		];
		const output = createLookupObj(employees, "name", "job");

		expect(output).toEqual( { Sean : "Dog Walker" } );
	})
	test("One element in array with multiple values", () =>
	{
		const employees =
		[
			{
				name : "Sean",
				job : "Dog Walker",
				favouriteSong : "Fire",
				wearsGlasses : true,
				onHoliday : false,
				age : 25
			}
		];
		const output = createLookupObj(employees, "name", "job");

		expect(output).toEqual( { Sean : "Dog Walker" } );
	})
	test("One element in array with multiple values, input non-string values", () =>
	{
		const employees =
		[
			{
				name : "Sean",
				job : "Dog Walker",
				favouriteSong : "Fire",
				wearsGlasses : true,
				onHoliday : false,
				age : 25
			}
		];
		const output = createLookupObj(employees, "favouriteSong", "age");

		expect(output).toEqual( { Fire : 25 } );

		const output2 = createLookupObj(employees, "onHoliday", "wearsGlasses");

		expect(output2).toEqual( { false : true } );
	})
	test("Multiple elements of array", () =>
	{
		const employees =
		[
			{
				name : "Sean",
				job : "Dog Walker",
				favouriteSong : "Fire",
				wearsGlasses : true,
				onHoliday : false,
				age : 25
			},
			{
				name : "Francisco",
				job : "Pharmacist",
				favouriteSong : "Glue",
				wearsGlasses : false,
				onHoliday : false,
				age : 39
			},
			{
				name : "Jonny",
				job : "DevOps",
				favouriteSong : "Runaway",
				wearsGlasses : true,
				onHoliday : true,
				age : 34
			},
			{
				name : "Rebecca",
				job : "CEO",
				favouriteSong : "Arabella",
				wearsGlasses : false,
				onHoliday : true,
				age : 45
			}
		];
		let output = createLookupObj(employees, "favouriteSong", "age");
		let expectedOutput =
		{
			Fire : 25,
			Glue : 39,
			Runaway : 34,
			Arabella : 45
		};

		expect(output).toEqual(expectedOutput);

		output = createLookupObj(employees, "name", "job");
		expectedOutput =
		{
			Sean : "Dog Walker",
			Francisco : "Pharmacist",
			Jonny : "DevOps",
			Rebecca : "CEO"
		};

		expect(output).toEqual(expectedOutput);
	})
	test("Multiple elements, new values", () =>
	{
		const employees =
		[
			{ name: "Rose", id: "dS8rJns", secretFear: "spiders" },
		    { name: "Simon", id: "Pk34ABs", secretFear: "mice" },
		    { name: "Jim", id: "lk1ff8s", secretFear: "bears" },
		    { name: "David", id: "og8r0nV", secretFear: "Rose" }
		]
		const output = createLookupObj(employees, "id", "secretFear");
		const expectedOutput =
		{
			dS8rJns : "spiders",
			Pk34ABs : "mice",
			lk1ff8s : "bears",
			og8r0nV : "Rose"
		}

		expect(output).toEqual(expectedOutput);
	})
})
