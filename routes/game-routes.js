const router = require("express").Router();
const gameController = require("../controllers/game-controllers");

router.route("/").get(gameController.getAllGames).post(gameController.addGame);

router.route("/season").get(gameController.getAllRegSeasonGames);

router.route("/season/:seasonId").get(gameController.getOneRegSeasonGames);

router.route("/playoffs").get(gameController.getAllPlayoffGames);

router.route("/standings").get(gameController.getStandings);

router
  .route("/:gameId")
  .get(gameController.getOneGame)
  .put(gameController.updateGame)
  .delete(gameController.deleteGame);

module.exports = router;
