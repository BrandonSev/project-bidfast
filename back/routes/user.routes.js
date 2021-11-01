const router = require("express").Router();
const userController = require("../controllers/user.controller");

//GET
router.get('/', userController.findAllUsers)

module.exports = router;
