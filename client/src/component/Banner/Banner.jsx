import "./Banner.css";
import banner1 from "../../images/banner1.jpg";
import banner2 from "../../images/banner2.jpeg";
import banner4 from "../../images/banner4.jpg";

const Banner = () => {
	return (
		<div>
			<section className="banner-section">
				<div id="carouselExampleIndicators1" className="carousel slide" data-bs-ride="true">
					<div className="carousel-indicators">
						<button
							type="button"
							data-bs-target="#carouselExampleIndicators1"
							data-bs-slide-to="0"
							className="active"
							aria-current="true"
							aria-label="Slide 1"
						></button>
						<button
							type="button"
							data-bs-target="#carouselExampleIndicators1"
							data-bs-slide-to="1"
							aria-label="Slide 2"
						></button>
						<button
							type="button"
							data-bs-target="#carouselExampleIndicators1"
							data-bs-slide-to="2"
							aria-label="Slide 3"
						></button>
					</div>
					<div className="carousel-inner">
						<div className="carousel-item active carousel-Item">
							<img
								src={banner1}
								className="d-block w-100 banner-image-resize"
								alt="..."
							/>
						</div>

						<div className="carousel-item carousel-Item">
							<img
								src={banner2}
								className="d-block w-100 banner-image-resize"
								alt="..."
							/>
						</div>
						<div className="carousel-item carousel-Item">
							<img
								src={banner4}
								className="d-block w-100 banner-image-resize"
								alt="..."
							/>
						</div>
					</div>
					<button
						className="carousel-control-prev"
						type="button"
						data-bs-target="#carouselExampleIndicators1"
						data-bs-slide="prev"
					>
						<span className="carousel-control-prev-icon" aria-hidden="true"></span>
						<span className="visually-hidden">Previous</span>
					</button>
					<button
						className="carousel-control-next"
						type="button"
						data-bs-target="#carouselExampleIndicators1"
						data-bs-slide="next"
					>
						<span className="carousel-control-next-icon" aria-hidden="true"></span>
						<span className="visually-hidden">Next</span>
					</button>
				</div>
			</section>
		</div>
	);
};
export default Banner;
