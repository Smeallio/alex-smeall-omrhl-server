const router = require("express").Router();
const statController = require("../controllers/stat-controllers");

router.route("/skaters").get(statController.getAllSkaterStats);

router
  .route("/skaters/:gameId")
  .get(statController.getSkaterStatsByGame)
  .post(statController.addSkaterStats);

router
  .route("/skaters/:skaterStatId")
  .put(statController.updateSkaterStat)
  .delete(statController.deleteSkaterStat);

module.exports = router;
