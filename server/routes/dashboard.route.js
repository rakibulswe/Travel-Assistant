const router = require("express").Router();
const {
	getAllSellersController,
	getAllBuyersController,
} = require("../controllers/dashboard.controller");

router.get("/allsellers", getAllSellersController);
router.get("/allbuyers", getAllBuyersController);

module.exports = router;
