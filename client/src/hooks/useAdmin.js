import { useEffect, useState } from "react";
import axios from "../lib/axios";

const useAdmin = (email) => {
	const [isAdmin, setIsAdmin] = useState(false);
	const [isAdminLoading, setIsAdminLoading] = useState(true);

	useEffect(() => {
		if (email) {
			axios.get(`/users/admin/${email}`).then((res) => {
				setIsAdmin(res.data?.isAdmin);
				setIsAdminLoading(false);
			});
		}
	}, [email]);
	return [isAdmin, isAdminLoading];
};

export default useAdmin;
