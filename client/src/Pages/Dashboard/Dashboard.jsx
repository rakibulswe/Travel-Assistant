import { useContext } from "react";
import { NavLink, Outlet, ScrollRestoration } from "react-router-dom";
import "../Dashboard/Dashboard.css";
import NavSection from "../../Shared/Navbar/NavSection";
import { AuthContext } from "../../contexts/AuthProvider";
import useTitle from "../../hooks/useTitle";
import Loading from "./../../Shared/Loading/Loading";

const Dashboard = () => {
	const { user, loading } = useContext(AuthContext);

	useTitle("Dashboard");

	if (loading) return <Loading />;

	return (
		<div className="container">
			<NavSection />
			<h3 className="text-center mb-5 mt-5">Welcome to Dashboard</h3>
			<div className="row">
				<div className="col-md-3 col-lg-3 col-sm-12 mb-4">
					{user?.role === "admin" && (
						<>
							<div className="w-100 text-center">
								<NavLink
									className="dashboard-btn w-100 d-inline-block"
									to="/dashboard/allUsers"
								>
									All Users
								</NavLink>
							</div>
							<div className="mt-3 w-100 text-center">
								<NavLink
									className="dashboard-btn w-100 d-inline-block"
									to="/dashboard/allOwners"
								>
									All Admins
								</NavLink>
							</div>
							<div className="mt-3 w-100 text-center">
								<NavLink
									className="dashboard-btn w-100 d-inline-block"
									to="/dashboard/all-tours"
								>
									All Tours
								</NavLink>
							</div>
							<div className="mt-3 w-100 text-center">
								<NavLink
									className="dashboard-btn w-100 d-inline-block"
									to="/dashboard/all-bookings"
								>
									All Bookings
								</NavLink>
							</div>
						</>
					)}
				</div>
				<div className="col-md-9 col-lg-9  col-sm-12">
					<ScrollRestoration />
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
