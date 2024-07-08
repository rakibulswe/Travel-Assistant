import { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { packages, transportation as transportationData } from "../../constants";
import { AuthContext } from "../../contexts/AuthProvider";
import axios from "../../lib/axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function OrderInformation({
	placeId,
	fee,
	city,
	baseFee,
	setFee,
	transportOptions,
}) {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const [isCalculated, setIsCalculated] = useState(false);
	const [formData, setFormData] = useState({
		orderName: "",
		country: "",
		time: "",
		dateFrom: "",
		numberOfGuest: "",
		numberOfChildren: "",
		paidAmount: 0,
		duration: 3,
		room: 0,
		transactionId: "",
		package: "bronze",
		transportation: "",
	});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;

		if (name === "package" || name === "transportation" || name === "room") {
			// required calculation after the package and transportation plan has been changed
			setIsCalculated(false);
		} else {
			// don't required the calculation when other field is invoked
			setIsCalculated(true);
		}

		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));

		if (name === "package") {
			// update the duration according to the package
			setFormData((prev) => ({
				...prev,
				duration: Number(packages[prev.package || "bronze"].duration),
			}));
		}
	};

	const calculatePrice = () => {
		// calculate and finalized the overall price for the tour
		setIsCalculated(true);
		const selectedPackage = packages[formData.package || "bronze"];
		// combine the package rate, room rent and merge with transportation price
		setFee(
			baseFee * Number(selectedPackage.rate || 1) +
				Number(formData.transportation || 0) +
				selectedPackage.roomPrice * formData.room
		);
	};

	// add the booking to the database
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!user?._id) return alert("Buyer id not found, try again");

		const bookingInfo = {
			...formData,
			city, // for generate order Id only
			place: placeId,
			buyer: user._id,
			actualAmount: fee,
		};

		axios
			.post("/booking", bookingInfo)
			.then((res) => {
				if (res.data.booking) {
					toast.success("Booking added successfully");
					return navigate("/mybooking");
				}
				return toast.error("Booking failed");
			})
			.catch((error) => {
				console.error(error);
				throw new Error(error);
			});
	};

	return (
		<div className="order-info">
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="name">
					<Form.Label>Order name</Form.Label>
					<Form.Control
						type="text"
						name="orderName"
						required
						placeholder="Your name"
						value={formData.name}
						onChange={handleChange}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="country">
					<Form.Label>Country</Form.Label>
					<Form.Control
						type="text"
						name="country"
						required
						placeholder="Country"
						value={formData.country}
						onChange={handleChange}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="time">
					<Form.Label>Time</Form.Label>
					<Form.Control
						type="time"
						name="time"
						required
						value={formData.time}
						onChange={handleChange}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="dateFrom">
					<Form.Label>Date From</Form.Label>
					<Form.Control
						type="date"
						name="dateFrom"
						min={new Date().toISOString().split("T")[0]}
						required
						value={formData.dateFrom}
						onChange={handleChange}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="numberOfGuest">
					<Form.Label>Number of Guests</Form.Label>
					<Form.Control
						type="number"
						name="numberOfGuest"
						required
						max={10}
						placeholder="Number of Guests"
						value={formData.numberOfGuest}
						onChange={handleChange}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="numberOfChildren">
					<Form.Label>Number of Children</Form.Label>
					<Form.Control
						type="number"
						name="numberOfChildren"
						required
						max={3}
						placeholder="Number of Children"
						value={formData.numberOfChildren}
						onChange={handleChange}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="package">
					<Form.Label>Package</Form.Label>
					<Form.Control
						as="select"
						name="package"
						value={formData.package}
						onChange={handleChange}
					>
						<option value="">Select a package</option>
						<option value="gold">Gold (1.5x)</option>
						<option value="silver">Silver (1.2x)</option>
						<option value="bronze">Bronze (default)</option>
					</Form.Control>
				</Form.Group>

				<Form.Group className="mb-3" controlId="duration">
					<Form.Label>Tour Duration</Form.Label>
					<Form.Control
						type="number"
						name="duration"
						required
						readOnly
						max={7}
						min={3}
						placeholder="Tour duration"
						value={formData.duration}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="room">
					<Form.Label>Number of Room</Form.Label>
					<Form.Control
						type="number"
						name="room"
						required
						max={10}
						placeholder="Number of room"
						value={formData.room}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="transportation">
					<Form.Label>Transportation</Form.Label>
					<Form.Control
						as="select"
						name="transportation"
						value={formData.transportation}
						onChange={handleChange}
					>
						<option value="">Select a transportation</option>
						<option value="500">Car (+500tk)</option>
						{transportOptions?.map((data, index) => (
							<option key={index} value={transportationData[data]?.price}>
								{transportationData[data]?.name} (+{transportationData[data]?.price}
								tk)
							</option>
						))}
					</Form.Control>
				</Form.Group>
				<div className="d-flex align-items-center gap-2 mb-3">
					<Button className="text-light" onClick={calculatePrice} variant="info">
						Calculate price
					</Button>
					{isCalculated && <div className="calculated-price">{fee}/- BDT</div>}
				</div>
				<Form.Group className="mb-3" controlId="paid">
					<Form.Label>
						Paid Amount {isCalculated && <span>({fee}/- BDT)</span>}
					</Form.Label>
					<Form.Control
						type="number"
						name="paidAmount"
						label="Paid"
						required
						disabled={!isCalculated}
						placeholder="Total amount paid"
						value={formData.paidAmount}
						onChange={handleChange}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="transactionId">
					<Form.Label>Transaction ID</Form.Label>
					<Form.Control
						type="text"
						name="transactionId"
						required
						disabled={!isCalculated}
						placeholder="nagad/bkash/rocket or upay"
						value={formData.transactionId}
						onChange={handleChange}
					/>
					<small className="small mt-2">Payment number: +8801340004004</small>
				</Form.Group>

				<Button disabled={!isCalculated} variant="primary" type="submit">
					Book Now
				</Button>
				{!isCalculated && (
					<p className="mt-2 text-danger">Calculate the overall price to proceed</p>
				)}
			</Form>
		</div>
	);
}
