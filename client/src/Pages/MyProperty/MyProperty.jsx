import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FaBath, FaBed, FaSquare } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
import { AuthContext } from "../../contexts/AuthProvider";
import useTitle from "../../hooks/useTitle";
import Loading from "../../Shared/Loading/Loading";
import axios from "../../lib/axios";
import { baseUrl } from "../../constants";

const MyProperty = () => {
	const { user } = useContext(AuthContext);
	useTitle("My Property");

	const {
		data: products = [],
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			try {
				const res = await fetch(`${baseUrl}/places/?email=${user?.email}`);
				const data = await res.json();
				return data?.places;
			} catch (error) {}
		},
	});

	const handleDelete = (id) => {
		const agree = window.confirm(`Are you sure you want to delete :${id} `);
		if (agree) {
			axios.delete(`/places/${id}`).then((res) => {
				if (res.status === 0) {
					refetch();
				}
			});
		}
	};

	if (isLoading) {
		return <Loading />;
	}

	return (
		<section className="card-content">
			{products.map((post) => (
				<div className="card">
					<div className="card-image text-center">
						<img src={post.image} className="card-img-top" alt="..." />
					</div>
					<div className="card-info">
						<p className="fw-bold">{post.title}</p>

						<span>
							<ImLocation2 className="property-des-style" />
							{post.area}, {post.city}
						</span>
						<p> Property Type: {post.category}</p>
						<div className="d-flex justify-content-start gap-4">
							<span>
								<FaBed className="property-des-style" /> {post.room}
							</span>
							<span>
								<FaBath className="property-des-style" /> {post.bath}
							</span>
							<span>
								<FaSquare className="property-des-style" /> {post.propertySize}{" "}
								sqft.
							</span>
						</div>
						<div className="mt-2">
							<span>
								Available From: <b className="property-des-style">{post.month}</b>
							</span>
						</div>
						<div className="mt-2">
							<span>
								Rent: <span className="property-des-style">{post.rent}</span> TK
							</span>
						</div>
						<div className="text-center mt-2">
							<button
								className="dashboard-btn"
								onClick={() => handleDelete(post._id)}
							>
								Delete
							</button>
							{/* <h2>id:{post._id}</h2> */}
						</div>
					</div>
				</div>
			))}
		</section>
	);
};

export default MyProperty;
