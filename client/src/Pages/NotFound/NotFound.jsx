import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<section className="d-flex justify-content-center flex-column gap-3 p-5 vh-100">
			<div className="text-center">
				<img src="/oops.png" alt="" />
			</div>
			<h1 className="text-center text-body">404 | Page not found</h1>
			<div className="text-center w-100">
				<Link to="/" replace>
					<Button variant="primary">Return</Button>
				</Link>
			</div>
		</section>
	);
}
