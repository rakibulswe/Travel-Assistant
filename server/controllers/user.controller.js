const asyncHandler = require("express-async-handler");
const User = require("../models/User.model");

exports.getUsersController = asyncHandler(async (req, res) => {
	const result = await User.find().lean();

	if (result.length) {
		return res.status(200).json({
			message: "Users fetched successfully",
			users: result,
		});
	}

	res.status(404).json({
		message: "Users fetching failed",
	});
});

exports.addUserController = asyncHandler(async (req, res) => {
	const user = req.body;

	const result = await User.create(user);

	if (result) {
		return res.status(201).json({
			message: "User created successfully",
			user: result,
		});
	}

	res.status(500).json({
		message: "User insertion failed",
	});
});

exports.getCurrentUserController = asyncHandler(async (req, res) => {
	const email = req.params.email;
	const query = { email };

	const user = await User.findOne(query);

	res.status(200).json({
		message: "User information",
		user,
	});
});

exports.updateCurrentUserController = asyncHandler(async (req, res) => {
	const { userId } = req.params;
	const { photoURL, displayName } = req.body;

	const user = await User.findByIdAndUpdate(userId, { photoURL, displayName }, { new: true });

	res.status(200).json({
		message: "User information updated",
		user,
	});
});

exports.getAdminController = asyncHandler(async (req, res) => {
	const email = req.params.email;
	const query = { email };

	const user = await User.findOne(query);

	res.status(200).json({
		message: "Admin verification",
		isAdmin: user?.role === "admin",
	});
});

exports.getSellerController = asyncHandler(async (req, res) => {
	const email = req.params.email;
	const query = { email };

	const user = await User.findOne(query);

	res.status(200).json({
		message: "Admin verification",
		isSeller: user?.role === "seller",
	});
});

exports.deleteUserController = asyncHandler(async (req, res) => {
	const id = req.params.id;

	const result = await User.findByIdAndDelete(id);

	res.status(200).json({
		message: "User deleted successfully",
		user: result,
	});
});
