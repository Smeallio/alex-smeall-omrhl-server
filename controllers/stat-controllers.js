const knex = require("knex")(require("../knexfile"));

const getAllSkaterStats = async (_req, res) => {
  try {
    const skaterStats = await knex("skaterStats");
    res.status(200).json(skaterStats);
  } catch (err) {
    res.status(500).send(`Error retrieving stats from the database: ${err}`);
  }
};

const getSkaterStatsByGame = async (req, res) => {
  try {
    const skaterStatsByGame = await knex("skaterStats").where({ game_id: req.params.gameId }); // Sync syntax for other controller
    if (!skaterStatsByGame) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.status(200).json(skaterStatsByGame);
  } catch (err) {
    res.status(500).send(`Error retrieving game stats from the database: ${err}`);
  }
};

module.exports = {
  getAllSkaterStats,
  getSkaterStatsByGame,
};
