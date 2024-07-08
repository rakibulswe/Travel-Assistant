export function convertDate() {
	const today = new Date();

	const options = {
		year: "numeric",
		month: "short",
		day: "2-digit",
	};

	const formatter = new Intl.DateTimeFormat("en-US", options);
	const formattedDate = formatter.format(today);

	return formattedDate; // Output: Jul 12, 2022
}

export const formatDateTime = (dateTime) => {
	const date = new Date(dateTime);

	const options = {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		hour12: true, // Use 12-hour format
	};

	const formattedDate = date.toLocaleString("en-US", options);

	return formattedDate;
	// Output: 06/02/2024, 10:00:00 AM
};
