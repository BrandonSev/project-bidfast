const offerController = require("../controllers/offer.controller");
const {isAuthenticated} = require("../middleware/auth.middleware");
const router = require("express").Router();

router.post('/create', isAuthenticated, offerController.offerCreate)

module.exports = router;
