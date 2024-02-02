const router = require("express").Router();
const teamController = require("../controllers/team-controllers");

router.route("/").get(teamController.getTeams).post(teamController.addTeam);

module.exports = router;
