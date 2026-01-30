function	createLookupObj(objects, keyToPair, valueToPair)
{
	const	lookupObj = {};

	for (let object of objects)
	{
		lookupObj[object[keyToPair]] = object[valueToPair];
	}

	return (lookupObj);
}

module.exports = createLookupObj;
