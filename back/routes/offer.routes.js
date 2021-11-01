const offerController = require("../controllers/offer.controller");
const {isAuthenticated} = require("../middleware/auth.middleware");
const router = require("express").Router();

// GET
router.get('/', offerController.getAll)
//POST
router.post('/create', isAuthenticated, offerController.offerCreate)

module.exports = router;
