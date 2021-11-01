const offerBiddingController = require("../controllers/offerBidding.controller");
const {isAuthenticated} = require("../middleware/auth.middleware");
const router = require("express").Router();

// POST
router.post('/', isAuthenticated ,offerBiddingController.create)

module.exports = router;
