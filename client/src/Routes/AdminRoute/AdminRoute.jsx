import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import Loading from "../../Shared/Loading/Loading";

const AdminRoute = ({ children }) => {
	const { user, loading } = useContext(AuthContext);
	const location = useLocation();

	if (loading) {
		return <Loading />;
	}

	if (user && user.role === "admin") {
		return children;
	}

	return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
