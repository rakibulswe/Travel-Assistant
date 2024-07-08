import "./Footer.css";
import { FaFacebookSquare, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<section className="footer">
			<div className="border-bottom">
				<div className="container">
					<div className="row w-100 d-flex pt-5">
						<Link to="/" className="col-lg-3 col-md-3 col-sm-12 text-start">
							<img src="/logo.svg" alt="logo" />
						</Link>
						<div className="col-lg-3 col-md-3 col-sm-12 text-start">
							<h3 className="mb-3">Book a tour</h3>
							<p>Request an offer</p>
							<p>Pricing</p>
							<p>Reviews</p>
							<p>Stories</p>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-12 text-start">
							<h3 className="mb-3">Terms & Privacy</h3>
							<p>Trust & Safety</p>
							<p>Terms of Service</p>
							<p>Privacy Policy</p>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-12 text-start">
							<h3 className="mb-3">About</h3>
							<p>Company</p>
							<p>How it Works</p>
							<p>Contact</p>
						</div>
					</div>
				</div>
			</div>
			<div className="container mt-2">
				<div className="row py-2">
					<div className="col-6 text-start">
						<p>©{new Date().getFullYear()} Treker. All rights reserved</p>{" "}
					</div>
					<div className="col-6 d-flex justify-content-end">
						<span className="media-icon">
							<FaFacebookSquare />
						</span>

						<span className="media-icon">
							<FaTwitter />
						</span>
						<span className="media-icon">
							<FaInstagram />
						</span>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Footer;
