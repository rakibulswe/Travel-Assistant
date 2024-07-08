const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 2000, // Limit each IP to 2000 requests per `window` (here, per 1 minute)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	message: "Too many request, Try again after sometimes.",
});

const middlewares = [
	cors({ origin: ["http://localhost:3000", "https://travel-assistant-v1.netlify.app"] }),
	express.static("public"),
	express.json(),
	express.urlencoded({ extended: true }),
	morgan("dev"),
	limiter,
	xssClean(),
	cookieParser(),
];

module.exports = (app) => {
	app.use(middlewares);
};
