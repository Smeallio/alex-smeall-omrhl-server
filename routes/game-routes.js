const router = require("express").Router();
const gameController = require("../controllers/game-controllers");

router.route("/").get(gameController.getAllGames).post(gameController.addGame);

router.route("/season").get(gameController.getRegSeasonGames);

router.route("/playoffs").get(gameController.getPlayoffGames);

router.route("/standings").get(gameController.getStandings);

router
  .route("/:gameId")
  .get(gameController.getOneGame)
  .put(gameController.updateGame)
  .delete(gameController.deleteGame);

module.exports = router;
