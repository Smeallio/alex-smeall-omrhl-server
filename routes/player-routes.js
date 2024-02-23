const router = require("express").Router();
const playerController = require("../controllers/player-controllers");

router.route("/").get(playerController.getAllPlayers);

router
  .route("team/:teamId")
  .get(playerController.getPlayersByTeam)
  .post(playerController.addPlayer);

router
  .route("player/:playerId")
  .put(playerController.updatePlayer)
  .delete(playerController.deletePlayer);

module.exports = router;
