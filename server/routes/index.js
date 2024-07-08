const usersHandler = require("./users.route");
const placesHandler = require("./places.route");
const dashboardHandler = require("./dashboard.route");
const bookingHandler = require("./booking.route");

const routes = [
	{
		path: "/users",
		handler: usersHandler,
	},
	{
		path: "/places",
		handler: placesHandler,
	},
	{
		path: "/dashboard",
		handler: dashboardHandler,
	},
	{
		path: "/booking",
		handler: bookingHandler,
	},
];

module.exports = (app) => {
	routes.forEach((route) => {
		app.use("/api/v1" + route.path, route.handler);
	});
};
