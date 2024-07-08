const router = require("express").Router();
const {
	getSellerController,
	getAdminController,
	getUsersController,
	addUserController,
	deleteUserController,
	getCurrentUserController,
	updateCurrentUserController,
} = require("../controllers/user.controller");

router.get("/", getUsersController);
router.delete("/:id", deleteUserController);
router.patch("/:userId", updateCurrentUserController);
router.post("/", addUserController);

router.get("/current/:email", getCurrentUserController);

router.get("/seller/:email", getSellerController);
router.get("/admin/:email", getAdminController);

module.exports = router;
