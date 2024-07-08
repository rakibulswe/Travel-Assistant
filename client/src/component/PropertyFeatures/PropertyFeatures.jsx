import { FaCheckCircle } from "react-icons/fa";

const PropertyFeatures = () => {
	return (
		<div>
			<p className="fs-4 pb-2 heading">Features</p>
			<div className="all-features">
				<div>
					<FaCheckCircle className="font-awesome-icon me-2" /> 24/7 hours CC TV coverage
				</div>
				<div>
					<FaCheckCircle className="font-awesome-icon me-2" />
					24/7 hours Gas & Electricity
				</div>
				<div>
					<FaCheckCircle className="font-awesome-icon me-2" />
					Generator backup
				</div>
				<div>
					<FaCheckCircle className="font-awesome-icon me-2" />
					Guard facilities
				</div>
				<div>
					<FaCheckCircle className="font-awesome-icon me-2" />
					Road side view
				</div>
				<div>
					<FaCheckCircle className="font-awesome-icon me-2" />
					WiFi facilities
				</div>
				<div>
					<FaCheckCircle className="font-awesome-icon me-2" />
					24/7 hours CC TV coverage
				</div>
			</div>
		</div>
	);
};

export default PropertyFeatures;
