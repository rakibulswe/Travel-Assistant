// baseUrl for data fetching from backend api
export const baseUrl = process.env.REACT_APP_BASE_URL || "https://dinepal.onrender.com/api/v1";

export const cities = {
	Dhaka: {
		name: "Dhaka",
		areas: [
			"Lalbagh Fort",
			"Ahsan Manzil",
			"Dhakeshwari Temple",
			"National Museum",
			"Liberation War Museum",
		],
	},
	Chattogram: {
		name: "Chattogram",
		areas: [
			"Cox's Bazar",
			"Saint Martin",
			"Patenga Beach",
			"Foy's Lake",
			"Ethnological Museum",
			"Kaptai Lake",
			"The War Cemetery",
		],
	},
	Sylhet: {
		name: "Sylhet",
		areas: [
			"Ratargul Swamp Forest",
			"Jaflong",
			"Madhabkunda Waterfall",
			"Lawachara National Park",
			"Shahjalal University of Science and Technology",
		],
	},
	Rangamati: {
		name: "Rangamati",
		areas: ["Khagrachuri"],
	},
};

export const categories = [
	{
		name: "Historical & Cultural",
		image: "/categories/history.png",
	},
	{
		name: "Nature & Wildlife",
		image: "/categories/wild-animals.png",
	},
	{
		name: "Beach & Marine",
		image: "/categories/island.png",
	},
	{
		name: "Adventure",
		image: "/categories/adventurer.png",
	},
	{
		name: "Spiritual & Religious",
		image: "/categories/religions.png",
	},
	{
		name: "Ecotourism",
		image: "/categories/nature.png",
	},
	{
		name: "Rural & Community",
		image: "/categories/village.png",
	},
	{
		name: "Culinary Tourism",
		image: "/categories/food.png",
	},
];

export const transportation = {
	foot: { name: "Foot", price: 0 },
	train: { name: "Train", price: 350 },
	car: { name: "Car", price: 800 },
	bus: { name: "Bus", price: 500 },
	bike: { name: "Bike", price: 1000 },
};

export const packages = {
	gold: {
		name: "Gold",
		image: "/packages/gold.png",
		rate: 1.5, // Price in your chosen currency
		duration: 7, // Duration of the package
		roomPrice: 7000, // 7 days room
		services: [
			"7 days tour",
			"24/7 guide includes",
			"All meals included",
			"Private transportation",
			"Luxury accommodation",
			"Free entrance to all attractions",
			"Travel insurance",
			"Personal photographer",
		],
		description:
			"The Gold package offers a premium experience with top-tier services and amenities, perfect for those seeking luxury and comfort during their travels.",
	},
	silver: {
		name: "Silver",
		image: "/packages/silver.png",
		rate: 1.2, // Price in your chosen currency
		duration: 5, // Duration of the package
		roomPrice: 5000,
		services: [
			"5 days tour",
			"12/7 guide includes",
			"Shared transportation",
			"Breakfast and dinner included",
			"Discounted entrance to attractions",
			"Group activities",
			"Travel insurance",
		],
		description:
			"The Silver package provides a balanced experience with a mix of guided tours and free time, ideal for those looking for a well-rounded travel experience.",
	},
	bronze: {
		name: "Bronze",
		image: "/packages/bronze.png",
		rate: 1, // Price in your chosen currency
		duration: 3, // Duration of the package
		roomPrice: 3000,
		services: [
			"3 days tour",
			"On-call guide support",
			"Public transportation",
			"Breakfast included",
			"Basic travel insurance",
		],
		description:
			"The Bronze package is a budget-friendly option that still offers essential services and a guided experience for travelers looking to explore on a budget.",
	},
};

export const shoppingMallData = [
	{
		_id: crypto.randomUUID(),
		name: "Bashundhara City",
		address: "123 Main Street, Cityville",
		description:
			"Fashion Square is a premier shopping destination featuring a wide range of luxury and high-end fashion brands.",
		image: "/malls/bashundhara-city-shopping.jpg",
	},
	{
		_id: crypto.randomUUID(),
		name: "City Center Mall",
		address: "456 Elm Avenue, Metro City",
		description: "City Center Mall is the heart of shopping and entertainment in Metro City",
		image: "/malls/city-center.jpg",
	},
	{
		_id: crypto.randomUUID(),
		name: "Lakeside Plaza",
		address: "789 Lakeview Drive, Riverside",
		description:
			"Lakeside Plaza offers a tranquil shopping experience with its scenic lakeside location.",
		image: "/malls/lake-side-plaza.jpg",
	},
];

export const eventData = [
	{
		_id: crypto.randomUUID(),
		name: "Summer Music Festival",
		date: new Date("2024-07-15"),
		description:
			"Join us for the annual Summer Music Festival featuring live performances from top artists across various genres. Enjoy a day filled with music, food, and fun.",
		location: "Central Park",
		image: "/events/summer.webp",
	},
	{
		_id: crypto.randomUUID(),
		name: "Food Truck Rally",
		date: new Date("2024-08-05"),
		description:
			"Satisfy your cravings at the Food Truck Rally, where you can indulge in a wide array of delicious street food offerings from local food trucks.",
		location: "Downtown Plaza",
		image: "/events/food.jpg",
	},
	{
		_id: crypto.randomUUID(),
		name: "Artisan Market",
		date: new Date("2024-09-20"),
		description:
			"Discover unique handcrafted goods and artisanal products at the Artisan Market. From handmade jewelry to organic skincare products.",
		location: "City Hall Square",
		image: "/events/art.jpg",
	},
	{
		_id: crypto.randomUUID(),
		name: "Family Fun Day",
		date: new Date("2024-10-10"),
		description:
			"Gather the family and join us for a day of fun-filled activities at Family Fun Day. From carnival games to face painting",
		location: "Community Park",
		image: "/events/family.jpeg",
	},
	{
		_id: crypto.randomUUID(),
		name: "Holiday Parade",
		date: new Date("2024-12-01"),
		description:
			"Get into the festive spirit at the Holiday Parade, featuring dazzling floats, marching bands, and appearances by Santa Claus himself.",
		location: "Main Street",
		image: "/events/holiday.jpg",
	},
];
