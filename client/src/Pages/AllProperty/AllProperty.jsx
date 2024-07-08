import { useState, useEffect } from "react";
import axios from "../../lib/axios";
import PropertyBanner from "../../component/PropertyBanner/PropertyBanner";
import PropertySorting from "../../component/PropertySorting/PropertySorting";
import Posts from "../../component/Posts/Posts";
import Pagination from "../../component/Pagination/Pagination";
import { useLocation } from "react-router-dom";
import { convertDate } from "../../lib/date";
import useTitle from "../../hooks/useTitle";

const AllProperty = () => {
	useTitle("All places");
	const [data, setData] = useState({ city: "", area: "", category: "" });

	const [posts, setPosts] = useState([]);

	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(9);

	const location = useLocation();
	const homeSearch = location?.state?.data;

	// Get current posts
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost);

	//change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	//handle form
	const handleForm = (event) => {
		event.preventDefault();

		// price
		const price = event.target.price.value;

		// city
		const city = event.target.city.value;

		const openingTime = event.target.openingTime.value;
		const closingTime = event.target.closingTime.value;

		const transportationType = event.target.transportType;
		const transportation = Object.values(transportationType)
			.filter((rent) => rent.checked)
			.map((rent) => rent.value);

		const month = event.target.month.value;

		axios
			.get(
				`/places/productCollection?price=${price}&city=${city}&transportation=${JSON.stringify(
					transportation
				)}&openingTime=${openingTime}&closingTime=${closingTime}&month=${month}`
			)
			.then((res) => setPosts(res.data?.places));
	};

	const handleSearch = (event) => {
		event.preventDefault();

		axios
			.get(
				`/places/sortProducts?city=${data.city}&area=${
					data.area
				}&category=${encodeURIComponent(data.category)}`
			)
			.then((res) => setPosts(res.data?.places));
	};

	const handleChange = (e) => {
		setData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	useEffect(() => {
		if (homeSearch?.city) {
			axios
				.get(
					`/places/sortProducts?city=${homeSearch?.city}&area=${homeSearch?.area}&category=${homeSearch?.category}`
				)
				.then((res) => setPosts(res.data?.places));
		} else {
			const fetchPosts = async () => {
				setLoading(true);
				const res = await axios.get("/places/productCollection");
				setPosts(res.data?.places);
				setLoading(false);
			};

			fetchPosts();
		}
	}, [homeSearch?.city, homeSearch?.area, homeSearch?.category]);

	return (
		<div>
			<div className="banner-section">
				<PropertyBanner
					data={data}
					handleChange={handleChange}
					handleSearch={handleSearch}
				/>
			</div>
			<div className="container">
				<h3 className="mt-5 fw-bolder">Search results:-</h3>
				<div className="row">
					<div className="col-md-3 col-lg-3 col-sm-12">
						<PropertySorting handleForm={handleForm} />
					</div>
					<div className="col-md-9 col-lg-9 col-sm-12">
						<div className="ms-4">
							<h3 className="fw-bolder">All Filtered Tours for You</h3>
							<span>
								{posts?.length || 0} results. {convertDate()}
							</span>
						</div>
						<div className="all-property-card">
							<Posts posts={currentPosts} loading={loading} />

							<Pagination
								postsPerPage={postsPerPage}
								totalPosts={posts?.length || 0}
								paginate={paginate}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AllProperty;
