import { Fragment } from "react";
import { Form } from "react-bootstrap";
import { HiOutlineMinusCircle } from "react-icons/hi";
import { MdAddCircleOutline } from "react-icons/md";

export default function AddShoppingMall({ handleMallField, shoppingMallCount, handleInputChange }) {
	return (
		<>
			{/* ------------- add shopping mall ------------- */}
			<div
				style={{ marginTop: "30px" }}
				className="d-flex add-new-tables justify-content-between align-items-center gap-2"
			>
				<h4 className="user-none">Add reside shopping mall</h4>
				<div>
					<span className="text-danger" onClick={handleMallField}>
						<HiOutlineMinusCircle size={28} />
					</span>
					<span className="text-success" onClick={() => handleMallField("inc")}>
						<MdAddCircleOutline size={28} />
					</span>
				</div>
			</div>
			<div className="row mt-2">
				{shoppingMallCount.map((mall, index) => (
					<Fragment key={mall.id}>
						<div className="col-md-6 col-lg-6 col-sm-12">
							<Form.Group className="mt-2">
								<Form.Control
									value={mall.name}
									onChange={(e) =>
										handleInputChange(index, "name", e.target.value)
									}
									placeholder="Shopping mall name"
									required
									type="text"
								/>
							</Form.Group>
						</div>
						<div className="col-md-6 col-lg-6 col-sm-12">
							<Form.Group className="mt-2">
								<Form.Control
									placeholder="Shopping mall address"
									required
									type="text"
									value={mall.address}
									onChange={(e) =>
										handleInputChange(index, "address", e.target.value)
									}
								/>
							</Form.Group>
						</div>
						<div className="col-md-6 col-lg-6 col-sm-12">
							<Form.Group className="mt-3">
								<Form.Control
									value={mall.description}
									onChange={(e) =>
										handleInputChange(index, "description", e.target.value)
									}
									placeholder="Shopping mall description"
									type="text"
									as="textarea"
									required
									rows={2}
								/>
							</Form.Group>
						</div>
						<div className="col-md-6 col-lg-6 col-sm-12">
							<Form.Group className="mt-3">
								<Form.Control
									name="image"
									type="file"
									onChange={(e) =>
										handleInputChange(index, "image", e.target.files)
									}
									accept="image/*"
									required
									placeholder="image"
									size="lg"
								/>
							</Form.Group>
						</div>
						<div className="separator" />
					</Fragment>
				))}
			</div>
		</>
	);
}
