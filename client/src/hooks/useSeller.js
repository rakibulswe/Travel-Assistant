import { useEffect, useState } from "react";
import axios from "../lib/axios";

const useSeller = (email) => {
	const [isSeller, setIsSeller] = useState(false);
	const [isSellerLoading, setIsSellerLoading] = useState(true);

	useEffect(() => {
		if (email) {
			axios.get(`/users/seller/${email}`).then((res) => {
				setIsSeller(res.data?.isSeller);
				setIsSellerLoading(false);
			});
		}
	}, [email]);
	return [isSeller, isSellerLoading];
};

export default useSeller;
