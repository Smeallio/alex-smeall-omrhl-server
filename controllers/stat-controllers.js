const knex = require("knex")(require("../knexfile"));

const getAllSkaterStats = async (_req, res) => {
  try {
    const skaterStats = await knex("skaterStats");
    res.status(200).json(skaterStats);
  } catch (err) {
    res.status(500).send(`Error retrieving games from the database: ${err}`);
  }
};

module.exports = {
    getAllSkaterStats
}