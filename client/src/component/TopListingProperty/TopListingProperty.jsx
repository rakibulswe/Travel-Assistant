import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./TopListingProperty.css";
import Loading from "../../Shared/Loading/Loading";
import axios from "../../lib/axios";
import { useEffect, useState } from "react";
import TourCard from "./../TourCard/TourCard";

const TopListingProperty = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [property, setProperty] = useState([]);

	useEffect(() => {
		function fetchData() {
			try {
				setLoading(true);
				axios.get(`/places/productCollection`).then((res) => setProperty(res.data?.places));
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, []);

	if (loading) return <Loading />;

	if (error) return <p>Error occurred: {error.message}</p>;

	return (
		<div className="container mt-5">
			<div className="text-center category-title my-5">
				<p>Top Tourist Places</p>
			</div>
			<Swiper
				slidesPerView={4}
				spaceBetween={30}
				slidesPerGroup={1}
				loop={true}
				loopFillGroupWithBlank={true}
				pagination={{
					clickable: true,
				}}
				navigation={true}
				modules={[Pagination, Navigation]}
				breakpoints={{
					300: {
						width: 270,
						slidesPerView: 1,
					},
					520: {
						width: 520,
						slidesPerView: 2,
					},
					960: {
						width: 950,
						slidesPerView: 3,
					},
					1290: {
						width: 1290,
						slidesPerView: 4,
					},
				}}
				className="mySwiper"
			>
				{property?.map((tourInfo) => (
					<SwiperSlide key={tourInfo._id}>
						<TourCard tourInfo={tourInfo} />
					</SwiperSlide>
				))}
			</Swiper>
			<div className="text-center mt-5 mb-5">
				<Link to="/all-tours" className="details">
					View All Tours
				</Link>
			</div>
		</div>
	);
};

export default TopListingProperty;
