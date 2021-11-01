const offerBiddingController = require("../controllers/offerBidding.controller");
const {isAuthenticated} = require("../middleware/auth.middleware");
const router = require("express").Router();

// GET
router.get('/:id', offerBiddingController.findOne)
// POST
router.post('/', isAuthenticated, offerBiddingController.create)

module.exports = router;
