const router = require("express").Router();
const gameController = require("../controllers/game-controllers");
const allGamesController = require("../controllers/games/all-games-controllers");
const singleGameController = require("../controllers/games/single-game-controllers");
const regSeasonGamesController = require("../controllers/games/reg-season-games-controllers");
const playoffGamesController = require("../controllers/games/playoff-games-controllers");

router
  .route("/")
  .get(allGamesController.getAllGames)
  .post(singleGameController.addOneGame);

router
  .route("/season/regular")
  .get(regSeasonGamesController.getAllRegSeasonGames);

router
  .route("/season/regular/:seasonYear")
  .get(regSeasonGamesController.getOneRegSeasonOfGames);

router.route("/season/playoffs").get(playoffGamesController.getAllPlayoffGames);

router
  .route("/season/playoffs/:seasonYear")
  .get(playoffGamesController.getOnePlayoffSeasonOfGames);

router.route("/season/:seasonYear").get(allGamesController.getOneSeasonOfGames);

router.route("/standings").get(gameController.getStandings); //Move this to a new file

router
  .route("/:gameId")
  .get(singleGameController.getOneGame)
  .put(singleGameController.updateOneGame)
  .delete(singleGameController.deleteOneGame);

module.exports = router;
