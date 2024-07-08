import { useContext, useState } from "react";
import "./AddProperty.css";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../../contexts/AuthProvider";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
import axios from "../../lib/axios";
import { categories, cities } from "../../constants";
import AddShoppingShoppingMall from "../../component/AdditionalFormSection/AddShoppingMall";
import AddEvents from "../../component/AdditionalFormSection/AddEvents";
import toast from "react-hot-toast";

const defaultData = {
	addedBy: "",
	title: "",
	details: "",
	address: "",
	fee: 0,
	shoppingMall: [],
	events: [],
	transportOptions: [],
	bestMonthToVisit: "",
	area: "",
	category: "",
	city: "",
	zipCode: "",
	image: null,
	imageURL: "",
	openingTime: "",
	closingTime: "",
};

const shoppingMallTemplate = {
	id: "",
	name: "",
	address: "",
	description: "",
	image: null,
	imageURL: "",
};
const eventTemplate = {
	id: "",
	name: "",
	address: "",
	datetime: "",
	description: "",
	image: null,
	imageURL: "",
};

const AddProperty = () => {
	const [shoppingMallCount, setShoppingMallCount] = useState([]);

	const [eventCount, setEventCount] = useState([]);

	const { user } = useContext(AuthContext);
	useTitle("Add Tour");

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: defaultData,
	});

	const cityData = watch("city"); // watch city field's value change

	const navigate = useNavigate();

	// <----- upload image into imgBB ----->
	const uploadImageToImgBB = async (image) => {
		const formData = new FormData();
		formData.append("image", image);

		const url = `https://api.imgbb.com/1/upload?&key=${process.env.REACT_APP_IMGBB_API}`;

		try {
			const response = await fetch(url, {
				method: "POST",
				body: formData,
			});

			const data = await response.json();
			if (data.success) {
				return data.data.url; // Return the URL of the uploaded image
			} else {
				throw new Error("Failed to upload image");
			}
		} catch (error) {
			console.error("Error uploading image:", error);
			return null;
		}
	};

	const uploadAllImagesAndUpdateData = async (data) => {
		const updatedData = { ...data };

		// Helper function to upload image and update URL
		const uploadImageAndSetUrl = async (image) => {
			if (image && image[0]) {
				return uploadImageToImgBB(image[0]);
			}
			return null;
		};

		// Collect promises for main image
		const mainImagePromise = uploadImageAndSetUrl(updatedData.image).then((url) => {
			updatedData.imageURL = url;
		});

		// Collect promises for shoppingMall images
		const shoppingMallPromises = updatedData.shoppingMall?.map(async (mall, index) => {
			const imageUrl = await uploadImageAndSetUrl(mall.image);
			updatedData.shoppingMall[index].imageURL = imageUrl;
		});

		// Collect promises for events images
		const eventPromises = updatedData.events?.map(async (event, index) => {
			const imageUrl = await uploadImageAndSetUrl(event.image);
			updatedData.events[index].imageURL = imageUrl;
		});

		// Wait for all image uploads to complete
		await Promise.all([mainImagePromise, ...shoppingMallPromises, ...eventPromises]);

		return updatedData;
	};

	// add the tourist place into database
	const handleAddPlace = async (data) => {
		// toast.promise(
		uploadAllImagesAndUpdateData({
			...data,
			addedBy: user?._id,
			shoppingMall: [...shoppingMallCount],
			events: [...eventCount],
		}).then((placeInfo) => {
			//Save Products information to the database
			axios.post("/places/productCollection", placeInfo).then((res) => {
				if (res.data.place) {
					toast.success("Tour place added successfully");
					return navigate("/all-tours");
				}
			});
		});
	};

	// add a field for input the events field
	const handleEventField = (type) => {
		if (type === "inc") {
			// increment
			setEventCount((prev) => {
				return [...prev, { ...eventTemplate, id: crypto.randomUUID() }];
			});
		} else {
			// decrement
			setEventCount((prev) => {
				if (prev.length === 0) {
					return [];
				} else {
					const newEvent = [...prev];
					newEvent.pop(); // Remove the last added event data
					return newEvent;
				}
			});
		}
	};

	// add a field for input the shopping mall field
	const handleMallField = (type) => {
		if (type === "inc") {
			// increment
			setShoppingMallCount((prev) => {
				return [...prev, { ...shoppingMallTemplate, id: crypto.randomUUID() }];
			});
		} else {
			// decrement
			setShoppingMallCount((prev) => {
				if (prev.length === 0) {
					return [];
				} else {
					const newMalls = [...prev];
					newMalls.pop(); // Remove the last added shoppingMallData
					return newMalls;
				}
			});
		}
	};

	// handle shopping mall fields
	const handleInputChange = (index, field, value) => {
		const newMalls = [...shoppingMallCount];

		if (field === "image") {
			const file = value;
			newMalls[index][field] = file;
		} else {
			newMalls[index][field] = value;
		}

		setShoppingMallCount(newMalls);
	};

	// handle event fields
	const handleEventInputChange = (index, field, value) => {
		const newEvent = [...eventCount];
		if (field === "image") {
			const file = value;
			newEvent[index][field] = file;
		} else {
			newEvent[index][field] = value;
		}
		setEventCount(newEvent);
	};

	return (
		<section>
			<h3 className="text-center text-uppercase mt-4">Add New Tourist Place</h3>
			<Form onSubmit={handleSubmit(handleAddPlace)}>
				<div className=" d-flex justify-content-center">
					<div className="add-property-box">
						<h4>Personal Information</h4>
						<div className="row my-2">
							<div className="col-md-4 col-lg-4 col-sm-12">
								<Form.Group>
									<Form.Label>Name</Form.Label>
									<Form.Control
										defaultValue={user?.displayName}
										disabled
										type="text"
									/>
								</Form.Group>
							</div>
							<div className="col-md-4 col-lg-4 col-sm-12">
								<Form.Group>
									<Form.Label>Phone No</Form.Label>
									<Form.Control
										defaultValue={user?.phoneNumber}
										disabled
										type="tel"
									/>
								</Form.Group>
							</div>
							<div className="col-md-4 col-lg-4 col-sm-12">
								<Form.Label>Email</Form.Label>
								<Form.Control type="email" defaultValue={user?.email} disabled />
							</div>
						</div>
						<h4 className="mt-4"> Tour information</h4>
						<div className="row">
							<Form.Group className="mb-2 col-6" controlId="">
								<Form.Label>Tour Title</Form.Label>
								<Form.Control
									{...register("title", {
										required: "Tour title is Required",
									})}
									type="text"
									placeholder="Enter tour title"
								/>
								{errors.title && (
									<p className="text-danger mt-1">{errors.title.message}</p>
								)}
							</Form.Group>
							<Form.Group className="mb-2 col-6" controlId="">
								<Form.Label>Tour Address</Form.Label>
								<Form.Control
									{...register("address", {
										required: "Tour address is Required",
									})}
									type="text"
									placeholder="Enter tour address"
								/>
								{errors.address && (
									<p className="text-danger mt-1">{errors.address.message}</p>
								)}
							</Form.Group>
						</div>
						<Form.Group className="mb-2" controlId="">
							<Form.Label>Tour Details</Form.Label>
							<Form.Control
								{...register("details", {
									required: "Tour Details is Required",
								})}
								type="text"
								as="textarea"
								rows={3}
								placeholder="write details about the tour"
							/>
							{errors.details && (
								<p className="text-danger mt-1">{errors.details.message}</p>
							)}
						</Form.Group>
						<Form.Group className="mb-2">
							<div className="row">
								<div className="col-6">
									<Form.Label>Tour Fees</Form.Label>
									<Form.Control
										{...register("fee", {
											required: "Tour fees is Required",
										})}
										min={1}
										type="number"
										placeholder="Fees amount"
									/>
									{errors.fee && (
										<p className="text-danger mt-1">{errors.fee.message}</p>
									)}
								</div>
								<div className="col-6">
									<Form.Group>
										<Form.Label>Best month to visit</Form.Label>
										<Form.Select
											{...register("bestMonthToVisit", {
												required: "Month is Required",
											})}
											aria-label="Default select example"
										>
											<option value="">Select Month</option>
											<option value="January">January</option>
											<option value="February">February</option>
											<option value="March">March</option>
											<option value="April">April</option>
											<option value="May">May</option>
											<option value="June">June</option>
											<option value="July">July</option>
											<option value="August">August</option>
											<option value="September">September</option>
											<option value="October">October</option>
											<option value="November">November</option>
											<option value="December">December</option>
										</Form.Select>
										{errors.bestMonthToVisit && (
											<p className="text-danger mt-1">
												{errors.bestMonthToVisit.message}
											</p>
										)}
									</Form.Group>
								</div>
							</div>
						</Form.Group>

						<div className="row mb-2">
							<div className="col-md-6 col-lg-6 col-sm-12">
								<Form.Group>
									<Form.Label>Opening Time</Form.Label>
									<Form.Control
										{...register("openingTime", {
											required: "Property size is Required",
										})}
										type="time"
										placeholder="Opening time is required."
									/>
									{errors.openingTime && (
										<p className="text-danger mt-1">
											{errors.openingTime.message}
										</p>
									)}
								</Form.Group>
							</div>
							<div className="col-md-6 col-lg-6 col-sm-12">
								<Form.Group>
									<Form.Label>Closing Time</Form.Label>
									<Form.Control
										{...register("closingTime", {
											required: "Closing time is Required",
										})}
										type="time"
										placeholder="Closing time is required."
									/>
									{errors.closingTime && (
										<p className="text-danger mt-1">
											{errors.closingTime.message}
										</p>
									)}
								</Form.Group>
							</div>
						</div>
						<div className="row mb-2">
							<div className="col-md-4 col-lg-4 col-sm-12">
								<Form.Group>
									<Form.Label>City</Form.Label>
									<Form.Select
										{...register("city", {
											required: "city is Required",
										})}
										aria-label="Default select example"
									>
										<option value="">Choose a city</option>
										{Object.keys(cities).map((city, index) => (
											<option key={index} value={city}>
												{city}
											</option>
										))}
									</Form.Select>
									{errors.city && (
										<p className="text-danger mt-1">{errors.city.message}</p>
									)}
								</Form.Group>
							</div>
							<div className="col-md-4 col-lg-4 col-sm-12">
								<Form.Group>
									<Form.Label>Area</Form.Label>
									<Form.Select
										{...register("area", {
											required: "Area is Required",
										})}
										aria-label="Default select example"
									>
										<option value="">Choose an area</option>
										{!cities[cityData] ? (
											<option value="">Select a city first</option>
										) : (
											cities[cityData]?.areas.map((area) => (
												<option key={area} value={area}>
													{area}
												</option>
											))
										)}
									</Form.Select>
									{errors.area && (
										<p className="text-danger mt-1">{errors.area.message}</p>
									)}
								</Form.Group>
							</div>
							<div className="col-md-4 col-lg-4 col-sm-12">
								<Form.Group>
									<Form.Label>Tour Category</Form.Label>
									<Form.Select
										{...register("category", {
											required: "Category is Required",
										})}
										aria-label="Default select example"
									>
										<option value="">Choose</option>
										{categories.map((data, index) => (
											<option key={index} value={data.name}>
												{data.name}
											</option>
										))}
									</Form.Select>
									{errors.name && (
										<p className="text-danger mt-1">
											{errors.category.message}
										</p>
									)}
								</Form.Group>
							</div>
						</div>
						<Form.Group controlId="formFileLg" className="mb-3">
							<Form.Label>Upload tour Image</Form.Label>
							<Form.Control
								{...register("image", {
									required: "Image is Required",
								})}
								type="file"
								accept="image/*"
								size="lg"
							/>
							{errors.image && (
								<p className="text-danger mt-1">{errors.image.message}</p>
							)}
						</Form.Group>

						{/* ----------- available transportation selection --------- */}
						<div className="row mt-3">
							<div className="col-md-6 col-lg-6 col-sm-12">
								<Form.Group>
									<Form.Label>Available transportation</Form.Label>
									<Form.Select
										{...register("transportOptions", {
											required: "Transportation option is Required",
										})}
										multiple
										aria-label="Default select example"
									>
										<option value="">--- Choose transportation ---</option>
										<option value="bus">Bus</option>
										<option value="train">Train</option>
										<option value="car">Car</option>
										<option value="boat">Boat</option>
										<option value="bike">Bike</option>
										<option value="foot">On Foot</option>
									</Form.Select>
									<Form.Text className="text-muted mt-2">
										Press <kbd>ctrl</kbd> to multi select
									</Form.Text>
									{errors.transportation && (
										<p className="text-danger mt-1">
											{errors.transportation.message}
										</p>
									)}
								</Form.Group>
							</div>
							<div className="col-md-6 col-lg-6 col-sm-12">
								<Form.Group>
									<Form.Label>Zip code</Form.Label>
									<Form.Control
										{...register("zipCode")}
										placeholder="0000/0"
										type="text"
									/>
								</Form.Group>
							</div>
						</div>

						{/* ----------- add shopping mall section ----------- */}
						<AddShoppingShoppingMall
							handleMallField={handleMallField}
							shoppingMallCount={shoppingMallCount}
							handleInputChange={handleInputChange}
						/>

						{/* ------------- add events ------------- */}
						<AddEvents
							handleEventField={handleEventField}
							eventCount={eventCount}
							handleInputChange={handleEventInputChange}
						/>

						<div className="text-center mt-4">
							<input
								className="login-btn mt-2 text-uppercase"
								value="Add tourist place"
								type="submit"
							/>
						</div>
					</div>
				</div>
			</Form>
		</section>
	);
};

export default AddProperty;
