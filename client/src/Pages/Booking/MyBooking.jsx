import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
import axios from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import BookingList from "../../component/BookingList/BookingList";

const MyBooking = () => {
	const { user } = useContext(AuthContext);
	useTitle("My Booking");

	const { isPending, error, data, refetch } = useQuery({
		queryKey: ["booking"],
		queryFn: () => axios(`/booking/${user._id}`).then((res) => res.data.bookings),
	});

	if (isPending) return "Loading...";

	if (error) return "An error has occurred: " + error.message;

	return (
		<section>
			<h3 className="text-center text-uppercase mt-4">My booked tours</h3>
			<div>
				{data?.length ? (
					<BookingList bookings={data} refetch={refetch} />
				) : (
					<div className="text-center my-5">
						<p>There is no booking right available now or Admin deleted your booking</p>
						<Link to="/all-tours">
							<Button style={{ background: "pink" }}>Book now</Button>
						</Link>
					</div>
				)}
			</div>
		</section>
	);
};

export default MyBooking;
