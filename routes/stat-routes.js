const router = require("express").Router();
const statController = require("../controllers/stat-controllers");

router.route("/skaters").get(statController.getAllSkaterStats).post(statController.addSkaterStats)

router
  .route("/skaters/:gameId")
  .get(statController.getSkaterStatsByGame)

module.exports = router;