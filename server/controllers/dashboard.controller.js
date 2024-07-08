const asyncHandler = require("express-async-handler");
// const Place = require("../models/Place.model");
const User = require("../models/User.model");

exports.getAllSellersController = asyncHandler(async (req, res) => {
	const role = req.query.role || "user";

	const users = await User.find({ role }).lean();

	res.status(200).json({
		message: "All seller information",
		users,
	});
});

exports.getAllBuyersController = asyncHandler(async (req, res) => {
	const role = req.query.role || "admin";

	const users = await User.find({ role }).lean();

	res.status(200).json({
		message: "All buyers information",
		users,
	});
});
