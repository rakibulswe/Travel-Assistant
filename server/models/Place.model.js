const { model, Schema } = require("mongoose");

const placeSchema = new Schema(
	{
		addedBy: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Added by id is required"],
		},
		title: {
			type: String,
			required: [true, "title is required"],
			trim: true,
		},
		address: {
			type: String,
			required: [true, "Address is required"],
			trim: true,
		},
		fee: {
			type: Number,
			required: [true, "Entry fee is required"],
			min: 300,
		},
		shoppingMall: [{ name: String, address: String, description: String, imageURL: String }],
		events: [
			{
				name: String,
				address: String,
				datetime: Date,
				description: String,
				imageURL: String,
			},
		],
		transportOptions: {
			type: [String],
			enum: ["bike", "train", "boat", "car", "bus", "foot"],
			default: "bus",
		},
		bestMonthToVisit: {
			type: String,
			required: [true, "Month is required"],
			trim: true,
		},
		area: {
			type: String,
			required: [true, "Area is required"],
			trim: true,
		},
		category: {
			type: String,
			required: [true, "Category is required"],
			trim: true,
		},
		city: {
			type: String,
			required: [true, "City is required"],
			trim: true,
		},
		zipCode: String,
		details: {
			type: String,
			required: [true, "Details is required"],
			trim: true,
		},
		imageURL: {
			type: String,
			required: [true, "Image is required"],
			trim: true,
		},
		openingTime: String,
		closingTime: String,
	},
	{ timestamps: true }
);

const Place = model("Place", placeSchema);

module.exports = Place;
