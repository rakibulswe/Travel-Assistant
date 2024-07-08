import "./Category.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../lib/axios";
import Loading from "../../Shared/Loading/Loading";

const Category = ({ categ }) => {
	const { name, image } = categ;
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [add, setAdd] = useState();

	const navigate = useNavigate();

	const handleCategory = () => {
		return navigate("/sort-tours", { state: { data: { name } } });
	};

	useEffect(() => {
		function fetchData() {
			try {
				setLoading(true);
				axios
					.get(`/places/categoryWiseData?title=${encodeURIComponent(name)}`)
					.then((res) => {
						setAdd(res.data?.places?.length);
					});
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		}

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [name]);

	if (loading) return <Loading />;

	if (error) return <p>Error occurred: {error.message}</p>;

	return (
		<div className="category-item" onClick={handleCategory}>
			<button className="bg-white">
				<img className="category-img" src={image} alt="" />
				<p>{name}</p>
				<span>
					{add} {add?.length > 1 ? "tours" : "tour"}
				</span>
			</button>
		</div>
	);
};
export default Category;
