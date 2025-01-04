const router = require("express").Router();
const gameController = require("../controllers/game-controllers");

router.route("/").get(gameController.getAllGames).post(gameController.addGame);

router.route("/season/regular").get(gameController.getAllRegSeasonGames);

router.route("/season/playoffs").get(gameController.getAllPlayoffGames);

router.route("/season/:seasonYear").get(gameController.getOneSeasonGames);

router.route("/standings").get(gameController.getStandings);

router
  .route("/:gameId")
  .get(gameController.getOneGame)
  .put(gameController.updateGame)
  .delete(gameController.deleteGame);

module.exports = router;
