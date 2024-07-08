import Form from "react-bootstrap/Form";
import "./PropertySorting.css";

const PropertySorting = ({ handleForm }) => {
	return (
		<div className="sorting-section p-3">
			<h5>Sort by</h5>
			<Form onSubmit={handleForm}>
				<Form.Group className="mb-2">
					<Form.Select aria-label="Default select example" name="price">
						<option value=""> Sort by price</option>
						<option value="Low to High">Low to High</option>
						<option value="High to Low">High to Low</option>
					</Form.Select>
				</Form.Group>
				<Form.Group className="mb-2">
					<Form.Select aria-label="Default select example" name="city">
						<option value="">Choose city...</option>
						<option value="Dhaka">Dhaka</option>
						<option value="Chattogram">Chattogram</option>
						<option value="Rajshahi">Rajshahi</option>
						<option value="Rangpur">Rangpur</option>
						<option value="Barisal">Barishal</option>
						<option value="Khulna">Khulna</option>
						<option value="Sylhet">Sylhet</option>
						<option value="Mymensingh">Mymensingh</option>
					</Form.Select>
				</Form.Group>
				<h5 className="mt-3">Opening Time</h5>
				<Form.Control
					name="openingTime"
					type="time"
					placeholder="Opening time is required."
				/>
				<h5 className="mt-3">Closing Time</h5>
				<Form.Control
					name="closingTime"
					type="time"
					placeholder="Closing time is required."
				/>
				<h5 className="mt-3">Select Month</h5>
				<Form.Group>
					<Form.Select aria-label="Default select example" name="month">
						<option value="">Select Month</option>
						<option value="January">January</option>
						<option value="February">February</option>
						<option value="March">March</option>
						<option value="April">April</option>
						<option value="May">May</option>
						<option value="June">June</option>
						<option value="July">July</option>
						<option value="August">August</option>
						<option value="September">September</option>
						<option value="October">October</option>
						<option value="November">November</option>
						<option value="December">December</option>
					</Form.Select>
				</Form.Group>
				<h5 className="mt-3">Transportation</h5>
				<Form.Group>
					<Form.Check label="Bike" value="bike" name="transportType" inline />
					<Form.Check label="Train" value="train" name="transportType" inline />
					<Form.Check label="Boat" value="boat" name="transportType" inline />
					<Form.Check label="Car" value="car" name="transportType" inline />
					<Form.Check label="Bus" value="bus" name="transportType" inline />
					<Form.Check label="Foot" value="foot" name="transportType" inline />
				</Form.Group>
				<div className="my-4 text-center">
					<button className="all-property-btn" type="submit">
						Find Tours
					</button>
				</div>
			</Form>
		</div>
	);
};

export default PropertySorting;
