const router = require("express").Router();
const authorize = require("../middleware/authorize")
const userController = require("../controllers/user-controllers");

router.route("/").get(authorize, userController.getUser)
router.route("/register").post(userController.createUser);
router.route("/login").post(userController.userLogin)

module.exports = router;