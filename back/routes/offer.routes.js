const offerController = require("../controllers/offer.controller");
const {isAuthenticated} = require("../middleware/auth.middleware");
const multer = require("multer");
const router = require("express").Router();
const {storage} = require('../multer')
const imageUpload = multer({storage: storage})
// GET
router.get('/', offerController.getAll)
router.get('/:id', offerController.findOne)
router.get('/:id/offerBiddings', offerController.findOfferBidding)
//POST
router.post('/create', isAuthenticated, imageUpload.array('image'), offerController.offerCreate)

module.exports = router;
