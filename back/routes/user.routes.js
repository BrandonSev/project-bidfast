const router = require("express").Router();
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const {isAuthenticated, onlyOwnerOrAdmin, onlyVisitor} = require("../middleware/auth.middleware");

//GET
router.get('/', userController.findAllUsers)
router.get('/:id', userController.findOne)
router.get('/:id/offers', userController.findOffer)
router.get('/:id/offerBiddings', userController.findOfferBidding)
// POST
router.post("/register", onlyVisitor, authController.signUp);
router.post("/login", onlyVisitor ,authController.signIn);
router.post("/logout", isAuthenticated, authController.signOut)

// PUT
router.put('/:id', isAuthenticated, onlyOwnerOrAdmin, userController.update)

// DELETE
router.delete('/:id', isAuthenticated, onlyOwnerOrAdmin, userController.removeUser);

module.exports = router;
