require("dotenv").config();
const express = require("express");
const { errorHandler } = require("./utils/errorHandler");
const { connectDB } = require("./db");

const port = process.env.PORT || 5000;

const app = express();

// middleware and routes
require("./middlewares")(app);
require("./routes")(app);

app.get("/", async (req, res) => {
	res.send("Home Rent server is running");
});

app.use(errorHandler);

connectDB()
	.then(() => {
		app.listen(port, () => {
			console.info(`Server running at port:${port}`);
		});
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
