const teamData = require("../seed_data/teams");
const playerData = require("../seed_data/players");
const gameData = require("../seed_data/games");

exports.seed = async function (knex) {
    await knex("teams").del();
    await knex("teams").insert(teamData);
    await knex("players").del();
    await knex("players").insert(playerData);
    await knex("games").del();
    await knex("games").insert(gameData);
}