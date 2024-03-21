const router = require("express").Router();
const statController = require("../controllers/stat-controllers");

router.route("/skaters").get(statController.getAllSkaterStats);

router.route("/goalies").get(statController.getAllGoalieStats);

router.route("/skaters/summary").get(statController.getSummarizedSkaterStats);

router.route("/goalies/summary").get(statController.getSummarizedGoalieStats);

router.route("/skaters/summary/playoffs").get(statController.getSummarizedPlayoffSkaterStats);

router.route("/goalies/summary/playoffs").get(statController.getSummarizedPlayoffGoalieStats);

router.route("/skaters/summary/playoffs/:teamId").get(statController.getSummarizedPlayoffSkaterStatsByTeam);

router.route("/goalies/summary/playoffs/:teamId").get(statController.getSummarizedPlayoffGoalieStatsByTeam);

router.route("/skaters/summary/:teamId").get(statController.getSummarizedSkaterStatsByTeam);

router.route("/goalies/summary/:teamId").get(statController.getSummarizedGoalieStatsByTeam);

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
