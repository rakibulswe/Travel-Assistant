const router = require("express").Router();
const {
	getAllUserBookingController,
	addBookingController,
	getAllBookingController,
	cancelBookingController,
	approveBookingController,
	deleteBookingController,
	reviewBookingController,
	getAllPlaceReviewsController,
	checkUserAlreadyReviewed,
} = require("../controllers/booking.controller");

router.get("/", getAllBookingController);
router.get("/:buyer", getAllUserBookingController);
router.post("/", addBookingController);

router.patch("/cancel/:bookingId", cancelBookingController);
router.delete("/delete/:bookingId", deleteBookingController);
router.patch("/approve/:bookingId", approveBookingController);

router.post("/rating", reviewBookingController);
router.get("/rating/:placeId", getAllPlaceReviewsController);
router.get("/rating/user/checked", checkUserAlreadyReviewed);

module.exports = router;
