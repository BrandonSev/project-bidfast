const router = require("express").Router();
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const multer = require('multer')
const {isAuthenticated, onlyOwnerOrAdmin, onlyVisitor} = require("../middleware/auth.middleware");
const {storage} = require("../multer");
const imageUpload = multer({storage: storage})
//GET
router.get('/', userController.findAllUsers)
router.get('/:id', userController.findOne)
router.get('/:id/offers', userController.findOffer)
router.get('/:id/offerBiddings', userController.findOfferBidding)
// POST
router.post("/register", onlyVisitor, authController.signUp);
router.post("/login", onlyVisitor, authController.signIn);
router.post("/logout", isAuthenticated, authController.signOut)

// PUT
router.put('/:id', isAuthenticated, onlyOwnerOrAdmin, imageUpload.array('image'), userController.update)

// DELETE
router.delete('/:id', isAuthenticated, onlyOwnerOrAdmin,  userController.removeUser);

module.exports = router;
