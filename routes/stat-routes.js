const router = require("express").Router();
const statController = require("../controllers/stat-controllers");

router.route("/skaters").get(statController.getAllSkaterStats);

router.route("/goalies").get(statController.getAllGoalieStats);

router.route("/skaters/summary").get(statController.getSummarizedSkaterStats);

router.route("/skaters/summary/:teamId").get(statController.getSummarizedSkaterStatsByTeam);

router
  .route("/skaters/:gameId")
  .get(statController.getSkaterStatsByGame)
  .post(statController.addSkaterStat);

router
  .route("/goalies/:gameId")
  .get(statController.getGoalieStatsByGame)
  .post(statController.addGoalieStat);

router
  .route("/skaters/:skaterStatId")
  .put(statController.updateSkaterStat)
  .delete(statController.deleteSkaterStat);

router
  .route("/goalies/:goalieStatId")
  .put(statController.updateGoalieStat)
  .delete(statController.deleteGoalieStat);

module.exports = router;
