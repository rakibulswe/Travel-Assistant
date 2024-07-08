import { packages } from "../../constants";
import "./AvailablePackages.css";

const packagesKeys = Object.keys(packages);

export default function AvailablePackages() {
	return (
		<section>
			<p className="fs-4 pb-2 heading">Available packages</p>
			<div className="available-packages">
				{packagesKeys.map((key) => (
					<article key={key} className="shadow-sm packages-container">
						<img src={packages[key].image} alt="badge" />
						<div className="packages-body">
							<h4 className="mt-2 mb-3">
								<span className="text-uppercase">{packages[key].name} </span>(
								{packages[key].rate}x)
							</h4>
							<ul className="text-start">
								{packages[key]?.services?.map((service, index) => (
									<li key={index} className="mb-2">
										{service}
									</li>
								))}
							</ul>
						</div>
					</article>
				))}
			</div>
		</section>
	);
}
