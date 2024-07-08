import { Card, ListGroup, ListGroupItem, Col, Button, Badge } from "react-bootstrap";
import axios from "../../lib/axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function BookingInfo({ booking, refetch }) {
	const handleDelete = (id) => {
		const agree = window.confirm(
			`Are you sure you want to delete? You will get only 50% refund. contact admin for this.`
		);
		if (agree) {
			axios.delete(`/booking/delete/${id}`).then((res) => {
				if (res.data?.success) {
					toast.success("Booking deleted");
					refetch();
				} else {
					toast.error("Something went wrong");
				}
			});
		}
	};

	return (
		<Col md={4}>
			<Card style={{ margin: "10px 0" }}>
				<Card.Img variant="top" src={booking.place?.imageURL} />
				<Card.Body>
					<Card.Title>
						<Link
							className="text-dark text-decoration-none"
							to={`/details/${booking.place?._id}`}
						>
							{booking.place.title}
						</Link>
					</Card.Title>
					<Card.Text>
						<strong>Order ID:</strong> {booking.orderId}
						<br />
						<strong>Order Name:</strong> {booking.orderName}
						<br />
						<strong>Buyer:</strong> {booking.buyer.displayName}
						<br />
						<strong>Country:</strong> {booking.country}
						<br />
						<strong>Status:</strong>{" "}
						<Badge
							bg={
								booking.status === "approved"
									? "success"
									: booking.status === "declined"
									? "danger"
									: "warning"
							}
							className="text-capitalize my-2 ms-2"
						>
							{booking.status}
						</Badge>
						<br />
						<strong>Tour Date:</strong> {new Date(booking.dateFrom).toLocaleString()}
						<br />
					</Card.Text>
				</Card.Body>
				<ListGroup className="list-group-flush">
					<ListGroupItem>
						<strong>Number of Guests:</strong> {booking.numberOfGuest}
					</ListGroupItem>
					<ListGroupItem>
						<strong>Number of Children:</strong> {booking.numberOfChildren}
					</ListGroupItem>
					<ListGroupItem>
						<strong>Paid Amount:</strong> ৳ {booking.paidAmount}
					</ListGroupItem>
					<ListGroupItem>
						<strong>Actual Amount:</strong> ৳ {booking.actualAmount}
					</ListGroupItem>
					<ListGroupItem>
						<strong>Duration:</strong> {booking.duration} days
					</ListGroupItem>
					<ListGroupItem>
						<strong>Rooms:</strong> {booking.room}
					</ListGroupItem>
					<ListGroupItem>
						<strong>Transaction ID:</strong> {booking.transactionId}
					</ListGroupItem>
					<div className="p-3 d-flex gap-2">
						{booking.status === "approved" ? (
							<h5 className="text-success fw-normal">
								Congratulation! Your booking is confirmed by admin. Present on the
								spot by the date.
							</h5>
						) : booking.status === "declined" ? (
							<h5 className="text-danger fw-normal">
								Sorry! Your request has been rejected by admin. To learn more why
								this happened contact with the admin.
							</h5>
						) : (
							<Button onClick={() => handleDelete(booking._id)} variant="danger">
								Delete
							</Button>
						)}
					</div>
				</ListGroup>
				<Card.Footer>
					<small className="text-muted">
						Booked at: {new Date(booking.createdAt).toLocaleString()}
					</small>
				</Card.Footer>
			</Card>
		</Col>
	);
}
