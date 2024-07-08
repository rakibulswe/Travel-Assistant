const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
	try {
		mongoose.set("strictQuery", false);

		const url = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/dinepalDB";

		const con = await mongoose.connect(url);

		console.info(`MongoDB connected: ${con.connection.host}`.yellow.underline);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

module.exports = { connectDB };
