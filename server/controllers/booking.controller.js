const Booking = require("../models/Booking.model");
const Review = require("../models/Review.model");
const asyncHandler = require("express-async-handler");
const { generateCUID } = require("../utils");

exports.getAllUserBookingController = asyncHandler(async (req, res) => {
	const { buyer } = req.params;
	const userBookings = await Booking.find({ buyer }).populate("buyer place").lean();

	res.status(200).json({
		message: "User booking information",
		bookings: userBookings,
	});
});

exports.getAllBookingController = asyncHandler(async (req, res) => {
	const userBookings = await Booking.find().populate("buyer place").lean();

	res.status(200).json({
		message: "Booking information",
		bookings: userBookings,
	});
});

exports.addBookingController = asyncHandler(async (req, res) => {
	const { city = "XX" } = req.body;
	const cityID = city.slice(0, 2).toUpperCase(); // chattogram to CH
	const orderId = `${cityID}-${generateCUID()}`;

	const addBooking = await Booking.create({ ...req.body, orderId });

	if (addBooking) {
		return res.status(201).json({
			message: "User booking added",
			booking: addBooking,
		});
	}

	res.status(500).json({
		message: "User booking not added",
	});
});

exports.cancelBookingController = asyncHandler(async (req, res) => {
	const { bookingId } = req.params;

	const booking = await Booking.findByIdAndUpdate(
		bookingId,
		{ status: "declined" },
		{ new: true }
	);

	if (booking.status === "declined") {
		return res.status(200).json({
			message: "Booking declined",
			success: true,
		});
	}

	res.status(500).json({
		message: "Booking not declined",
		success: true,
	});
});

exports.approveBookingController = asyncHandler(async (req, res) => {
	const { bookingId } = req.params;

	const booking = await Booking.findByIdAndUpdate(
		bookingId,
		{ status: "approved" },
		{ new: true }
	);

	if (booking.status === "approved") {
		return res.status(200).json({
			message: "Booking approved",
			success: true,
		});
	}

	res.status(500).json({
		message: "Booking not approved",
		success: true,
	});
});

exports.deleteBookingController = asyncHandler(async (req, res) => {
	const { bookingId } = req.params;

	const booking = await Booking.findByIdAndDelete(bookingId);

	if (booking) {
		return res.status(200).json({
			message: "Booking deleted",
			success: true,
		});
	}

	res.status(500).json({
		message: "Booking not deleted",
		success: true,
	});
});

exports.reviewBookingController = asyncHandler(async (req, res) => {
	const newReview = await Review.create(req.body);

	if (newReview) {
		return res.status(201).json({
			message: "Review created successfully",
			success: true,
			review: newReview,
		});
	}

	res.status(500).json({
		message: "Review posted failed",
		success: false,
	});
});

exports.getAllPlaceReviewsController = asyncHandler(async (req, res) => {
	const { placeId } = req.params;

	const ratings = await Review.find({ place: placeId }).populate("reviewedBy").lean();

	if (ratings.length) {
		return res.status(200).json({
			message: "Review information",
			ratings,
		});
	}

	res.status(200).json({
		message: "Review information not found",
		ratings: [],
	});
});

exports.checkUserAlreadyReviewed = asyncHandler(async (req, res) => {
	const { placeId, userId } = req.query;

	const review = await Review.findOne({ place: placeId, reviewedBy: userId });

	if (review) {
		return res.status(200).json({
			message: "Already reviewed",
			review,
		});
	}

	res.status(200).json({
		message: "Not reviewed",
		review,
	});
});
