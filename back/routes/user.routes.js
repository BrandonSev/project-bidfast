const router = require("express").Router();
const userController = require("../controllers/user.controller");

//GET
router.get('/', userController.findAllUsers)
router.get('/:id', userController.findOne)

module.exports = router;
