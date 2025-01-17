const router = require("express").Router();
const standingsController = require("../controllers/standings/standings-controllers");

router.route("/:seasonYear").get(standingsController.getStandings);
