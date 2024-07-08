import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
	const navigate = useNavigate();

	return (
		<section className="d-flex justify-content-center flex-column gap-3 p-5 vh-100">
			<div className="text-center">
				<img src="/oops.png" alt="" />
			</div>
			<h1 className="text-center text-body">500 | Something went wrong</h1>
			<div className="text-center w-100 justify-content-center d-flex gap-2">
				<Button onClick={() => navigate(-1)} variant="info" className="text-light">
					Return
				</Button>
				<Button onClick={() => navigate(0)} variant="primary">
					Reload
				</Button>
			</div>
		</section>
	);
}
