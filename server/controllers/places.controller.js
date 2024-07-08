const asyncHandler = require("express-async-handler");
const Place = require("../models/Place.model");

exports.getRestaurantByEmail = asyncHandler(async (req, res) => {
	const email = req.query.email;
	const query = { email: email };

	const place = await Place.find(query);

	res.status(200).json({
		message: "Place information",
		place,
	});
});

exports.deletePlaceController = asyncHandler(async (req, res) => {
	const id = req.params.id;

	const result = await Place.findByIdAndDelete(id);

	res.status(200).json({ message: "Place deleted", place: result, success: true });
});

exports.getPlaceDetailsController = asyncHandler(async (req, res) => {
	const id = req.params.id;

	const place = await Place.findById(id).populate("addedBy").lean();

	res.status(200).json({
		message: "Tourist Place information",
		place,
	});
});

exports.addPlaceController = asyncHandler(async (req, res) => {
	const data = req.body;

	const result = await Place.create(data);

	res.status(201).json({
		message: "Tourist place added",
		place: result,
	});
});

exports.getRestaurantCollectionController = asyncHandler(async (req, res) => {
	const query = req.query;

	const transportation = JSON.parse(query?.transportation || "[]");

	if (Object.keys(query).length) {
		let fee = query.price;

		if (fee === "Low to High") {
			fee = 1;
		} else {
			fee = -1;
		}

		const filterOptions = {};
		if (query.city) {
			filterOptions.city = query.city;
		}

		if (query.month) {
			filterOptions.bestMonthToVisit = query.month;
		}

		if (transportation?.length) {
			filterOptions.transportOptions = { $all: transportation };
		}

		if (query.openingTime) {
			filterOptions.openingTime = query.openingTime;
		}

		if (query.closingTime) {
			filterOptions.closingTime = query.closingTime;
		}

		const findRestaurants = await Place.find(filterOptions).sort({ fee }).lean();

		res.status(200).json({
			message: "Place found",
			places: findRestaurants,
		});
	} else {
		const sortRestaurant = await Place.find(query).sort({ createdAt: -1 });

		res.status(200).json({
			message: "Place found",
			places: sortRestaurant,
		});
	}
});

exports.getAllRestaurants = asyncHandler(async (req, res) => {
	const query = {};

	const places = await Place.find(query).populate("addedBy").lean();

	res.status(200).json({ message: "Place information", places });
});

exports.sortRestaurantController = asyncHandler(async (req, res) => {
	const city = req.query.city;
	const area = req.query.area;
	const category = req.query.category;

	const sortRestaurants = await Place.find({
		city,
		area,
		category,
	}).lean();

	res.status(200).json({ message: "Sorted place", places: sortRestaurants });
});

exports.categoryWiseDataController = asyncHandler(async (req, res) => {
	const { title } = req.query;

	const places = await Place.find({ category: title }).lean();

	res.status(200).json({
		message: "Category wise data found",
		places,
	});
});
