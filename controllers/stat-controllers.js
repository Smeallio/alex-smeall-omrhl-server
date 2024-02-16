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

const addSkaterStats = async (req, res) => {
    if (!req.body.game_id || !req.body.player_id || !req.body.team_id ) {
      return res.status(400).json({
        message: "Invalid game - game id, player id or team id",
      });
    }
    try {
      const result = await knex("skaterStats").insert(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({
        message: `Unable to add stats due to: ${err}`,
      });
    }
  };

module.exports = {
  getAllSkaterStats,
  getSkaterStatsByGame,
  addSkaterStats
};
