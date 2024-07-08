import "./Home.css";
import { useEffect, useState } from "react";
import Banner from "../../component/Banner/Banner";
import Hero from "../../component/Hero/Hero";
import Category from "../../component/Category/Category";
import axios from "../../lib/axios";
import TopListingProperty from "../../component/TopListingProperty/TopListingProperty";
import useTitle from "../../hooks/useTitle";
import { categories } from "../../constants";

const Home = () => {
	useTitle("Home");

	const [add, setAdd] = useState([]);

	useEffect(() => {
		axios.get(`/places/allProducts`).then((res) => {
			setAdd(res.data?.places);
		});
	}, []);

	return (
		<section>
			<Banner />
			<Hero />
			<section className="category-section h-auto w-auto py-5">
				<div className="container mt-5 mt-lg-0 mt-md-0">
					<div className="category-title mt-sm-5 mt-lg-0 mt-md-0">
						<p>Top Categories</p>
						<span>
							{categories?.length || 0} categories, {add?.length || 0}{" "}
							{add?.length > 1 ? "tours" : "tour"}
						</span>
					</div>
					<div className="category">
						{categories?.map((categ) => (
							<Category key={categ.name} categ={categ} />
						))}
					</div>
				</div>
			</section>
			<TopListingProperty />
		</section>
	);
};

export default Home;
