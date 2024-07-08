import "./Posts.css";
import Loading from "../../Shared/Loading/Loading";
import TourCard from "./../TourCard/TourCard";

const Posts = ({ posts, loading }) => {
	if (loading) {
		return <Loading />;
	}

	return (
		<div className="card-content mt-4">
			{posts?.map((data) => (
				<TourCard key={data._id} tourInfo={data} />
			))}
		</div>
	);
};

export default Posts;
