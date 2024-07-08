import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import NavSection from "../Shared/Navbar/NavSection";

const Main = () => {
	return (
		<main>
			<NavSection />
			<ScrollRestoration />
			<Outlet />
			<Footer />
		</main>
	);
};

export default Main;
