const router = require("express").Router();
const gameController = require("../controllers/game-controllers");

router
  .route("/")
  .get(gameController.getAllGames)
  .get(gameController.getStandings)
  .post(gameController.addGame);

router
  .route("/:gameId")
  .get(gameController.getOneGame)
  .put(gameController.updateGame)
  .delete(gameController.deleteGame);

module.exports = router;
