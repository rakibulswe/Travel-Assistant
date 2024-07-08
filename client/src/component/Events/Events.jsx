import { formatDateTime } from "../../lib/date";
import "./../ShoppingMall/ShoppingMall.css";

export default function Events({ data }) {
	return (
		<section>
			<p className="fs-4 pb-2 heading">Available Events</p>
			<div className="available-packages">
				{data.map((event) => (
					<article key={event._id} className="shadow-sm shopping-mall-container">
						<div>
							<img src={event.imageURL} alt="" />
							<div className="description">
								<small>{event.description}</small>
							</div>
						</div>
						<div className="shopping-mall-body">
							<h4 className="mt-2 mb-3">
								<span className="text-uppercase">{event.name} </span>
							</h4>
							<p>
								<span className="fw-semibold">Date:</span>{" "}
								{formatDateTime(event.datetime)}
							</p>
							<p>
								<span className="fw-semibold">Location:</span> {event.address}
							</p>
						</div>
					</article>
				))}
			</div>
		</section>
	);
}
