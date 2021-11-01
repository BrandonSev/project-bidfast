const router = require("express").Router();
const userController = require("../controllers/user.controller");
const {isAuthenticated, onlyOwnerOrAdmin} = require("../middleware/auth.middleware");

//GET
router.get('/', userController.findAllUsers)
router.get('/:id', userController.findOne)

// DELETE
router.delete('/:id', isAuthenticated, onlyOwnerOrAdmin, userController.removeUser);

module.exports = router;
