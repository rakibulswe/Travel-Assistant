const { model, Schema } = require("mongoose");

const bookingSchema = new Schema(
	{
		orderId: { type: String, required: true },
		orderName: { type: String, required: true },
		buyer: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		place: {
			type: Schema.Types.ObjectId,
			ref: "Place",
			required: true,
		},
		country: { type: String, required: true },
		time: { type: String, required: true },
		dateFrom: { type: String, required: true },
		numberOfGuest: { type: Number, required: true, min: 1 },
		numberOfChildren: Number,
		actualAmount: { type: Number, required: true },
		paidAmount: { type: Number, required: true },
		duration: { type: Number, required: true },
		room: Number,
		transactionId: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ["pending", "approved", "declined"],
			default: "pending",
		},
	},
	{ timestamps: true }
);

const Booking = model("Booking", bookingSchema);

module.exports = Booking;
