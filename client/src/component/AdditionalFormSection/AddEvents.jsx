import { Fragment } from "react";
import { Form } from "react-bootstrap";
import { HiOutlineMinusCircle } from "react-icons/hi";
import { MdAddCircleOutline } from "react-icons/md";

export default function AddEvents({ eventCount, handleEventField, handleInputChange }) {
	return (
		<Fragment>
			<div className="d-flex add-new-tables mt-4 justify-content-between align-items-center gap-2">
				<h4 className="user-none">Add upcoming events</h4>
				<div>
					<span className="text-danger" onClick={handleEventField}>
						<HiOutlineMinusCircle size={28} />
					</span>
					<span className="text-success" onClick={() => handleEventField("inc")}>
						<MdAddCircleOutline size={28} />
					</span>
				</div>
			</div>
			<div className="row mt-2">
				{eventCount.map((event, index) => (
					<Fragment key={event.id}>
						<div className="col-md-4 col-lg-4 col-sm-12">
							<Form.Group className="mt-2">
								<Form.Control
									value={event.name}
									onChange={(e) =>
										handleInputChange(index, "name", e.target.value)
									}
									placeholder="Event name"
									required
									type="text"
								/>
							</Form.Group>
						</div>
						<div className="col-md-4 col-lg-4 col-sm-12">
							<Form.Group className="mt-2">
								<Form.Control
									placeholder="Event address"
									required
									type="text"
									value={event.address}
									onChange={(e) =>
										handleInputChange(index, "address", e.target.value)
									}
								/>
							</Form.Group>
						</div>
						<div className="col-md-4 col-lg-4 col-sm-12">
							<Form.Group className="mt-2">
								<Form.Control
									required
									onChange={(e) =>
										handleInputChange(index, "datetime", e.target.value)
									}
									value={event.datetime}
									type="datetime-local"
									placeholder="Event date and time."
								/>
							</Form.Group>
						</div>
						<div className="col-md-6 col-lg-6 col-sm-12">
							<Form.Group className="mt-3">
								<Form.Control
									value={event.description}
									onChange={(e) =>
										handleInputChange(index, "description", e.target.value)
									}
									placeholder="Event description"
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
									type="file"
									name="image"
									accept="image/*"
									onChange={(e) =>
										handleInputChange(index, "image", e.target.files)
									}
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
		</Fragment>
	);
}
