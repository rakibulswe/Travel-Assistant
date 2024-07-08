import { createBrowserRouter } from "react-router-dom";

import Main from "../Layout/Main";
import AboutUs from "../Pages/AboutUs/AboutUs";
import AddProperty from "../Pages/AddProperty/AddProperty";
import AllOwners from "../Pages/AllOwners/AllOwners";
import AllProperty from "../Pages/AllProperty/AllProperty";
import AllRenters from "../Pages/AllRenters/AllRenters";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Home from "../Pages/Home/Home";
import HomeSortProperty from "../Pages/HomeSortProperty/HomeSortProperty";
import Login from "../Pages/Login/Login";
import PropertyDetails from "../Pages/PropertyDetails/PropertyDetails";
import Signup from "../Pages/Signup/Signup";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import AdminRoute from "./AdminRoute/AdminRoute";
import LoggedInRoute from "./LoggedInRoute/LoggedInRoute";
import NotFound from "../Pages/NotFound/NotFound";
import MyBooking from "../Pages/Booking/MyBooking";
import { baseUrl } from "../constants";
import ErrorPage from "../Pages/Error/ErrorPage";
import AllBookings from "../Pages/Dashboard/AllBookings";
import AllTours from "../Pages/Dashboard/AllTours";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Main />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/all-tours",
				element: <AllProperty />,
			},
			{
				path: "/add-tour",
				element: (
					<AdminRoute>
						<AddProperty />
					</AdminRoute>
				),
			},
			{
				path: "/mybooking",
				element: (
					<PrivateRoute>
						<MyBooking />
					</PrivateRoute>
				),
			},
			{
				path: "/aboutUs",
				element: <AboutUs />,
			},
			{
				path: "/logIn",
				element: (
					<LoggedInRoute>
						<Login />
					</LoggedInRoute>
				),
			},
			{
				path: "/signUp",
				element: (
					<LoggedInRoute>
						<Signup />
					</LoggedInRoute>
				),
			},
			{
				path: "/sort-tours",
				element: <HomeSortProperty />,
			},
			{
				path: "/details/:id",
				element: (
					<PrivateRoute>
						<PropertyDetails />
					</PrivateRoute>
				),
				loader: ({ params }) => fetch(`${baseUrl}/places/details/${params.id}`),
			},
		],
	},
	{
		path: "/dashboard",
		element: (
			<AdminRoute>
				<Dashboard />
			</AdminRoute>
		),
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				path: "allUsers",
				element: <AllRenters />,
			},
			{
				path: "allOwners",
				element: <AllOwners />,
			},
			{
				path: "all-bookings",
				element: <AllBookings />,
			},
			{
				path: "all-tours",
				element: <AllTours />,
			},
		],
	},
	{
		path: "*",
		element: <NotFound />,
	},
]);

export default router;
