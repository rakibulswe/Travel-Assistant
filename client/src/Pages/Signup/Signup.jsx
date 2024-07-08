import { useContext, useState } from "react";
import "../Login/Login.css";
import loginBanner from "../../images/login-banner.png";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import useTitle from "../../hooks/useTitle";
import axios from "../../lib/axios";

const Signup = () => {
	const [show, setShow] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [signUpError, setSignUPError] = useState("");
	const { createUser, setSignupKey } = useContext(AuthContext);

	const navigate = useNavigate();
	useTitle("SignUp");

	const saveUser = (displayName, email, phoneNumber) => {
		const userInfo = { displayName, email, phoneNumber };
		axios
			.post("/users", userInfo)
			.then((res) => {
				setSignupKey(Date.now()); // rerun the auth effect
				return navigate("/");
			})
			.catch((err) => console.error(err));
	};

	const handleSignUp = (data) => {
		createUser(data.email, data.password)
			.then(() => {
				saveUser(data.displayName, data.email, data.phoneNumber);
			})
			.catch((error) => {
				console.error(error);
				setSignUPError(error.message);
			});
	};

	return (
		<section>
			<div className="login-section  container mt-2">
				<div className="row align-content-center">
					<div className="col-md-7 col-lg-7 col-sm-12 image-container text-center">
						<img src={loginBanner} alt="" />
					</div>
					<div className="col-md-5 col-lg-5 col-sm-12 p-2 ">
						<div className="p-3 login-Form text-center mt-md-0 mt-lg-0 mt-sm-5">
							<div className="login-heading">
								<div>
									<img src="/logo.svg" alt="logo" />
								</div>
							</div>
							<div className="text-center">
								<h3 className="fw-bolder">Sign Up</h3>
							</div>
							<form onSubmit={handleSubmit(handleSignUp)}>
								<div className="m-3">
									<label
										htmlFor="exampleFormControlInput1"
										className="form-label float-start"
									>
										Name
									</label>
									<input
										{...register("displayName", { required: true })}
										type="text"
										className="form-control"
										id="exampleFormControlInput1"
										placeholder="Enter your name"
										required
									/>
									<label
										htmlFor="exampleFormControlInput2"
										className="form-label float-start mt-2"
									>
										Email address
									</label>
									<input
										{...register("email", {
											required: "Email Address is required",
										})}
										type="email"
										className="form-control"
										id="exampleFormControlInput2"
										placeholder="name@example.com"
									/>
									{errors.email && (
										<p className="text-danger">{errors.email?.message}</p>
									)}
									<label
										htmlFor="exampleFormControlInput3"
										className="form-label float-start mt-2"
									>
										Phone Number
									</label>
									<input
										{...register("phoneNumber", { required: true })}
										type="tel"
										className="form-control"
										id="exampleFormControlInput3"
										placeholder="Phone"
										required
									/>
									<label
										htmlFor="inputPassword"
										className="form-label float-start mt-2"
									>
										Password
									</label>
									<input
										{...register("password", {
											required: "Password is required",
											minLength: {
												value: 6,
												message: "Password must be 6 characters or longer",
											},
										})}
										type={show ? "text" : "password"}
										className="form-control"
										placeholder="Password"
										id="password"
									/>
									{errors.password && (
										<p className="text-danger">{errors.password?.message}</p>
									)}
								</div>
								<div>
									<input
										onClick={() => setShow(!show)}
										id="show"
										type="checkbox"
										className="mb-4"
									/>
									<label className="ms-1 d-inline-block" htmlFor="show">
										Show Password
									</label>
								</div>
								{signUpError && <p className="text-danger">{signUpError}</p>}
								<p>
									Already have an account? <Link to="/logIn">Login now.</Link>
								</p>
								<input
									className="signIn-btn mb-5 login-btn"
									value="Sign Up"
									type="submit"
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Signup;
