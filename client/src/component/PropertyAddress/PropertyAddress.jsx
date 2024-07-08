import { useLoaderData } from "react-router-dom";
const PropertyAddress = () => {
	const data = useLoaderData();
	const { address, area, city } = data.place;

	return (
		<div>
			<p className="fs-4 pb-2 heading">Address</p>
			<div className="address px-2">
				<div className="row">
					<div className="col-6">
						<h6 className="fw-bold">Address</h6>
					</div>
					<div className="col-6">
						<span>{address}</span>
					</div>
				</div>
				<div className="row">
					<div className="col-6">
						<h6 className="fw-bold">Area</h6>
					</div>
					<div className="col-6">
						<span>{area}</span>
					</div>
				</div>
				<div className="row">
					<div className="col-6">
						<h6 className="fw-bold">City</h6>
					</div>
					<div className="col-6">
						<span>{city}</span>
					</div>
				</div>
				<div className="row">
					<div className="col-6">
						<h6 className="fw-bold">Country</h6>
					</div>
					<div className="col-6">
						<span>Bangladesh</span>
					</div>
				</div>
				<div className="row">
					<div className="col-6">
						<h6 className="fw-bold">Zip/Postal Code</h6>
					</div>
					<div className="col-6">
						<span>1800</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PropertyAddress;
