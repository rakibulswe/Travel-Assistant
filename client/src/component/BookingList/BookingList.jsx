import { Container, Row } from "react-bootstrap";
import BookingInfo from "./BookingInfo";

const BookingList = ({ bookings, refetch }) => {
	return (
		<Container>
			<Row>
				{bookings.map((booking, index) => (
					<BookingInfo key={booking?._id || index} refetch={refetch} booking={booking} />
				))}
			</Row>
		</Container>
	);
};

export default BookingList;
