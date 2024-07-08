const { model, Schema } = require("mongoose");

const reviewSchema = new Schema(
	{
		reviewedBy: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		place: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "Place",
		},
		rating: {
			type: Number,
			min: 1,
			max: 5,
			default: 3,
		},
		text: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Review = model("Review", reviewSchema);

module.exports = Review;
