const skaterStats = require("../seed_data/skaterStats");

exports.seed = async function (knex) {
    await knex("skaterStats").del();
    await knex("skaterStats").insert(skaterStats);
}