import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import Loading from "../../Shared/Loading/Loading";

const LoggedInRoute = ({ children }) => {
	const { user, loading } = useContext(AuthContext);
	const location = useLocation();

	if (loading) {
		return <Loading />;
	}

	if (user && Object.keys(user)?.length) {
		return <Navigate to="/" state={{ from: location }} replace />;
	}

	return children;
};

export default LoggedInRoute;
