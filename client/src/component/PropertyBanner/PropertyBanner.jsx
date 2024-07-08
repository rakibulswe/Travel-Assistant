import Form from "react-bootstrap/Form";
import "./PropertyBanner.css";
import { categories, cities } from "./../../constants/index";

const PropertyBanner = ({ data, handleChange, handleSearch }) => {
	return (
		<div className="banner-background">
			<div className="container">
				<div className="hero-property d-flex justify-content-center">
					<div className="search-property-form">
						<div className="form">
							<Form
								onSubmit={handleSearch}
								className="d-flex row justify-content-between align-items-center"
							>
								<Form.Group className="col-md-4 col-12 col-lg-4 search-category">
									<Form.Label className="float-start filter-label">
										City
									</Form.Label>
									<Form.Select
										aria-label="Default select example"
										name="city"
										required
										onChange={handleChange}
									>
										<option value="">Choose City</option>
										{Object.keys(cities).map((city, index) => (
											<option key={index} value={city}>
												{city}
											</option>
										))}
									</Form.Select>
								</Form.Group>

								<Form.Group className="col-md-3 col-6 col-lg-3 search-category">
									<Form.Label className="float-start filter-label">
										Area
									</Form.Label>
									<Form.Select
										aria-label="Default select example"
										name="area"
										required
										onChange={handleChange}
									>
										<option value="">Choose Area</option>
										{!cities[data.city] ? (
											<option value="">Select a city first</option>
										) : (
											cities[data.city]?.areas.map((area) => (
												<option key={area} value={area}>
													{area}
												</option>
											))
										)}
									</Form.Select>
								</Form.Group>

								<Form.Group className="col-md-3 col-6 col-lg-3 search-category">
									<Form.Label className="float-start filter-label">
										Category
									</Form.Label>
									<Form.Select
										aria-label="Default select example"
										name="category"
										required
										onChange={handleChange}
									>
										<option value="">Choose</option>
										{categories.map((data, index) => (
											<option key={index} value={data.name}>
												{data.name}
											</option>
										))}
									</Form.Select>
								</Form.Group>
								<div className="col-md-2 col-12 col-lg-2 search-category mt-3 mt-md-0 mt-lg-0">
									<button type="submit" className="browse-property">
										Browse Available Tours
									</button>
								</div>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</div>
		// </div>
	);
};

export default PropertyBanner;
