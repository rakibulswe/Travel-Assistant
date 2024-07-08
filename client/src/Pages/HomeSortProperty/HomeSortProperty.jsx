import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "../../lib/axios";
import "./HomeSortProperty.css";
import Loading from "../../Shared/Loading/Loading";
import TourCard from "../../component/TourCard/TourCard";

const HomeSortProperty = () => {
	const { state } = useLocation();
	const [loading, setLoading] = useState(false);
	const [add, setAdd] = useState([]);

	useEffect(() => {
		function fetchData() {
			setLoading(true);
			try {
				axios
					.get(`/places/categoryWiseData?title=${encodeURIComponent(state?.data.name)}`)
					.then((res) => {
						setAdd(res?.data?.places);
					});
			} catch (error) {
				console.error(error.message);
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, [state?.data?.name]);

	return (
		<section>
			<div className="sort-property-bg">
				<div className="sort-banner-title py-5">
					<p>Find Your Perfect Place</p>
					<span>Discover and Reserve Your Favorite Tourist Spots</span>
				</div>
			</div>
			<div className="container">
				<h4 className=" mt-5 ">All tours for "{state?.data.name}"</h4>
				<p className="ms-2 fs-4 text-danger"> {add?.length || 0} results</p>
				<div className="card-content">
					{loading && <Loading />}
					{add?.map((tourInfo) => (
						<TourCard key={tourInfo._id} tourInfo={tourInfo} />
					))}
				</div>
				<div className="text-center my-4">
					<Link to="/all-tours" className="details">
						View All Tours
					</Link>
				</div>
			</div>
		</section>
	);
};

export default HomeSortProperty;
