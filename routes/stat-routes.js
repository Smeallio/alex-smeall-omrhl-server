const router = require("express").Router();
const statController = require("../controllers/stat-controllers");

router.route("/skaters").get(statController.getAllSkaterStats)

router
  .route("/:gameId")
  .get(statController.getSkaterStatsByGame)

module.exports = router;