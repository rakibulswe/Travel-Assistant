import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Button from "react-bootstrap/Button";
import Loading from "./../../Shared/Loading/Loading";
import axios from "../../lib/axios";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../../constants";

export default function Reviews({ placeId, refetch, user }) {
	const [value, setValue] = useState(3);
	const [reviewText, setReviewText] = useState("");

	const {
		data: review,
		isLoading,
		refetch: checkAgain,
	} = useQuery({
		queryKey: ["rating"],
		queryFn: async () => {
			try {
				const res = await fetch(
					`${baseUrl}/booking/rating/user/checked?placeId=${placeId}&userId=${user._id}`
				);
				const data = await res.json();
				return data.review;
			} catch (error) {
				console.error(error);
				throw new Error(error);
			}
		},
	});

	const ratingChanged = (newRating) => {
		setValue(newRating);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const reviewData = {
			reviewedBy: user._id,
			rating: value,
			text: reviewText,
			place: placeId,
		};

		axios
			.post("/booking/rating", reviewData)
			.then((res) => {
				if (res.data?.success) {
					toast.success("Review added successfully");
					refetch();
					checkAgain();
					setValue(3);
					setReviewText("");
				} else {
					toast.error("Something wen't wrong");
				}
			})
			.catch((err) => {
				toast.error("Error ocurred! try again");
				throw new Error(err);
			});
	};

	if (isLoading) return <Loading />;

	return (
		<div>
			<p className="fs-4 pb-2 heading">Your Review</p>
			<div style={{ marginTop: "-10px" }}>
				<ReactStars
					key={Date.now()} // re-render the static starts components
					count={5}
					value={review ? review?.rating : value}
					onChange={ratingChanged}
					edit={review ? false : true}
					size={35}
					activeColor="#ffd700"
				/>
			</div>

			{review ? (
				<p className="p-4">{review.text}</p>
			) : (
				<Form onSubmit={handleSubmit}>
					<FloatingLabel
						className="mt-2 mb-3"
						controlId="floatingTextarea2"
						label="Review Here..."
					>
						<Form.Control
							as="textarea"
							required
							onChange={(e) => setReviewText(e.target.value)}
							placeholder="Leave a review here"
							style={{ height: "100px" }}
						/>
					</FloatingLabel>
					<Button type="submit" variant="info" className="text-light">
						Submit
					</Button>
				</Form>
			)}
		</div>
	);
}
