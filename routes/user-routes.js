const router = require("express").Router();
const userController = require("../controllers/user-controllers");

router.route("/register").post(userController.createUser);
router.route("/login").post(userController.userLogin)

module.exports = router;