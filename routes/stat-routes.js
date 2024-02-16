const router = require("express").Router();
const gameController = require("../controllers/stat-controllers");

router.route("/").get(gameController.getAllSkaterStats)

module.exports = router;