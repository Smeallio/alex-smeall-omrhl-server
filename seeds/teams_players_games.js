const announcements = require("../seed_data/announcements");

exports.seed = async function (knex) {
    await knex("announcements").del();
    await knex("announcements").insert(announcements);
}