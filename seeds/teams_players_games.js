const goalieStats = require("../seed_data/goalieStats");

exports.seed = async function (knex) {
    await knex("goalieStats").del();
    await knex("goalieStats").insert(goalieStats);
}