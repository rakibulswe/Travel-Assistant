import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "../../contexts/AuthProvider";
import Dropdown from "react-bootstrap/Dropdown";
import Profile from "../../component/Profile/Profile";
import { MdOutlineSecurityUpdateGood, MdLogout, MdPhone } from "react-icons/md";

const NavSection = () => {
	const { user, logOut, loading } = useContext(AuthContext);

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleLogOut = () => {
		logOut();
	};

	return (
		<div className="container nav-container">
			<nav className="navbar navbar-expand-lg navbar-light">
				<div className="container-fluid">
					<Link to="/" className="navbar-brand">
						<img src="/logo.svg" className="app-logo" alt="logo" />
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarText"
						aria-controls="navbarText"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarText">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<NavLink to="/" className="nav-link nav-style" aria-current="page">
									HOME
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink to="/all-tours" className="nav-link nav-style">
									ALL TOURS
								</NavLink>
							</li>
							{user?.uid && (
								<li className="nav-item">
									<NavLink to="/mybooking" className="nav-link nav-style">
										MY BOOKING
									</NavLink>
								</li>
							)}
							{user?.uid && (
								<>
									{user?.role === "admin" && (
										<li className="nav-item">
											<NavLink to="/add-tour" className="nav-link nav-style">
												ADD TOUR
											</NavLink>
										</li>
									)}
								</>
							)}
						</ul>

						{user?.uid ? (
							<>
								{user?.role === "admin" && (
									<span className="navbar-text">
										<NavLink
											to="/dashboard/allUsers"
											className="nav-link nav-style"
										>
											DASHBOARD
										</NavLink>
									</span>
								)}
								<Dropdown>
									<Dropdown.Toggle variant="light" id="dropdown-basic">
										<img
											className="rounded-circle"
											style={{ height: "30px", width: "30px" }}
											src={user.photoURL}
											alt=""
										/>
									</Dropdown.Toggle>

									<Dropdown.Menu className="shadow">
										<div className="d-flex gap-2 flex-column px-3">
											{loading ? (
												"Loading..."
											) : (
												<>
													<span>{user?.displayName}</span>
													<span>{user?.email}</span>
													<div className="d-flex align-items-center gap-1">
														<MdPhone />
														<span>{user?.phoneNumber}</span>
													</div>
												</>
											)}
										</div>
										<hr />
										<Dropdown.Item onClick={handleShow}>
											<div className="d-flex align-items-center gap-1">
												<MdOutlineSecurityUpdateGood />
												<span>Update profile</span>
											</div>
										</Dropdown.Item>
										<Dropdown.Item onClick={handleLogOut}>
											<div className="d-flex align-items-center gap-1">
												<MdLogout />
												<span>Logout</span>
											</div>
										</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
								{/* ------------ profile modal here --------- */}
								<Profile
									show={show}
									displayName={user?.displayName}
									email={user?.email}
									phoneNumber={user?.phoneNumber}
									handleClose={handleClose}
								/>
							</>
						) : (
							<>
								<span className="navbar-text">
									<Link to="/logIn">
										<button className="nav-button">Login</button>
									</Link>
								</span>
								<span className="navbar-text ms-lg-3 ms-md-3 ms-sm-0">
									<Link to="/signUp">
										<button
											className="nav-button"
											style={{ backgroundColor: "#1DC5CE", color: "White" }}
										>
											SignUp
										</button>
									</Link>
								</span>
							</>
						)}
					</div>
				</div>
			</nav>
		</div>
	);
};

export default NavSection;
