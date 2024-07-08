const router = require("express").Router();
const {
	getRestaurantCollectionController,
	getAllRestaurants,
	getRestaurantByEmail,
	categoryWiseDataController,
	sortRestaurantController,
	addPlaceController,
	deletePlaceController,
	getPlaceDetailsController,
} = require("../controllers/places.controller");

router.get("/", getRestaurantByEmail);
router.get("/details/:id", getPlaceDetailsController);
router.get("/productCollection", getRestaurantCollectionController);

router.delete("/:id", deletePlaceController);
router.post("/productCollection", addPlaceController);

router.get("/allProducts", getAllRestaurants);
router.get("/sortProducts", sortRestaurantController);
router.get("/categoryWiseData", categoryWiseDataController);

module.exports = router;
