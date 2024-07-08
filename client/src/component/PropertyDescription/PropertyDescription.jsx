import { FaCity, FaMapPin, FaCarSide, FaCloudSun } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { HiOutlineCurrencyBangladeshi } from "react-icons/hi";
import { MdDateRange, MdOutlineNightsStay, MdOutlineQrCode } from "react-icons/md";

const PropertyDescription = ({ data }) => {
	return (
		<div>
			<p className="fs-4 pb-2 heading">Description</p>
			<div className="tour-details-info">{data?.details}</div>
			<div className="description-list">
				<div>
					<h5>Tour city</h5>
					<span>
						<FaCity className="font-awesome-icon me-1" /> {data.city}
					</span>
				</div>
				<div>
					<h5>Tour area</h5>
					<span>
						<FaMapPin className="font-awesome-icon me-1" /> {data.area}
					</span>
				</div>
				<div>
					<h5>Tour category</h5>
					<span>
						<BiCategory className="font-awesome-icon me-1" /> {data.category}
					</span>
				</div>
				<div>
					<h5>Tour fee</h5>
					<span>
						<HiOutlineCurrencyBangladeshi className="font-awesome-icon me-1" />{" "}
						{data.fee} BDT
					</span>
				</div>
				<div>
					<h5>Transportation</h5>
					<span>
						<FaCarSide className="font-awesome-icon me-1" />{" "}
						{data.transportOptions?.join(", ")}
					</span>
				</div>
				<div>
					<h5>Best Month</h5>
					<span>
						<MdDateRange className="font-awesome-icon me-1" /> {data.bestMonthToVisit}
					</span>
				</div>

				<div>
					<h5>Opening time</h5>
					<span>
						<FaCloudSun className="font-awesome-icon me-1" /> {data.openingTime}
					</span>
				</div>
				<div>
					<h5>Closing time</h5>
					<span>
						<MdOutlineNightsStay className="font-awesome-icon me-1" />{" "}
						{data.closingTime}
					</span>
				</div>
				<div>
					<h5>Zip code</h5>
					<span>
						<MdOutlineQrCode className="font-awesome-icon me-1" />
						{data.zipCode}
					</span>
				</div>
			</div>
		</div>
	);
};

export default PropertyDescription;
