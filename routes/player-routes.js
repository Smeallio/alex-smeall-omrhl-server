const router = require("express").Router();
const playerController = require("../controllers/player-controllers");

router.route("/").get(playerController.getAllPlayers)

router.route("/:teamId").get(playerController.getPlayersByTeam).post(playerController.addPlayer)

module.exports = router;