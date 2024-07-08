import "./TourCard.css";
import { ImLocation2 } from "react-icons/im";
import { FaCloudSun } from "react-icons/fa";
import { MdOutlineNightsStay } from "react-icons/md";
import { Link } from "react-router-dom";

export default function TourCard({ tourInfo }) {
	return (
		<div className="card">
			<div className="card-image text-center">
				<img
					src={tourInfo.imageURL}
					className="card-img-top img-fluid w-100 object-fit-cover"
					alt="..."
					height={190}
				/>
			</div>
			<div style={{ minHeight: "308px" }} className="card-info">
				<p style={{ fontSize: "20px" }} className="fw-bold">
					{tourInfo.title}
				</p>

				<span>
					<ImLocation2 className="property-des-style" />
					<span className="d-inline-block ms-1">
						{tourInfo.area}, {tourInfo.city}
					</span>
				</span>
				<p> Category: {tourInfo.category}</p>
				<div className="d-flex mt-2 justify-content-start gap-4">
					<span className="fw-semibold">
						<FaCloudSun className="font-awesome-icon me-1" /> {tourInfo.openingTime}
					</span>
					<span className="fw-semibold">
						<MdOutlineNightsStay className="font-awesome-icon me-1" />{" "}
						{tourInfo.closingTime}
					</span>
				</div>
				<div className="mt-3">
					<span>
						Best Month: <strong>{tourInfo.bestMonthToVisit}</strong>
					</span>
				</div>
				<div className="mt-2">
					<span>
						Tour Fees: <strong>{tourInfo.fee} TK</strong>
					</span>
				</div>
				<div className="text-center mt-4 mb-3">
					<Link to={`/details/${tourInfo._id}`} className="details">
						View Details
					</Link>
				</div>
			</div>
		</div>
	);
}
