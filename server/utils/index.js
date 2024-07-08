const { init } = require("@paralleldrive/cuid2");

const formatDateTime = (dateTime) => {
	const options = {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: true, // Use 12-hour format
	};

	const formattedDate = dateTime.toLocaleString("en-US", options);

	return formattedDate;
	// Output: 06/02/2024, 10:00:00 AM
};

const generateCUID = () => {
	// The init function returns a custom createId function with the specified
	// configuration. All configuration properties are optional.
	const createId = init({
		// A custom random function with the same API as Math.random.
		// You can use this to pass a cryptographically secure random function.
		random: Math.random,
		// the length of the id
		length: 8,
		// A custom fingerprint for the host environment. This is used to help
		// prevent collisions when generating ids in a distributed system.
		fingerprint: "a-custom-host-fingerprint",
	});

	return createId(); // wjfazn7q
};

module.exports = { formatDateTime, generateCUID };
