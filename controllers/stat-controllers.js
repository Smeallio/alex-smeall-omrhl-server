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
    const skaterStatsByGame = await knex("skaterStats").where({
      game_id: req.params.gameId,
    }); // Sync syntax for other controller
    if (!skaterStatsByGame) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.status(200).json(skaterStatsByGame);
  } catch (err) {
    res
      .status(500)
      .send(`Error retrieving game stats from the database: ${err}`);
  }
};

const addSkaterStats = async (req, res) => {
    const game_id = req.params.gameId;
  if (!req.body.player_id || !req.body.team_id) {
    return res.status(400).json({
      message: "Invalid game id, player id or team id",
    });
  }

  req.body.game_id = game_id;

  try {
    const result = await knex("skaterStats").insert(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({
      message: `Unable to add stats due to: ${err}`,
    });
  }
};

const updateSkaterStat = async (req, res) => {
    const game_id = req.params.gameId;
  if (!req.body.player_id || !req.body.team_id) {
    return res.status(400).json({
      message: "Invalid game - game id, player id or team id",
    });
  }

  req.body.game_id = game_id;

  try {
    await knex("skaterStats")
      .where({ id: req.params.skaterStatId })
      .update(req.body);
    const updatedSkaterStat = await knex("skaterStats").where({
      id: req.params.skaterStatId,
    });

    if (updatedSkaterStat.length > 0) {
      res.status(201).json(updatedSkaterStat);
    } else {
      res.status(404).json({
        message: `Stat not found`,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Unable to update stat due to: ${err}`,
    });
  }
};

const deleteSkaterStat = async (req, res) => {
  try {
    const result = await knex("skaterStats")
      .where({ id: req.params.skaterStatId })
      .delete();
    res.status(204).send("Stat deleted: ", result);
  } catch (err) {
    res.status(500).json({ message: `Unable to delete stat due to: ${err}` });
  }
};

module.exports = {
  getAllSkaterStats,
  getSkaterStatsByGame,
  addSkaterStats,
  updateSkaterStat,
  deleteSkaterStat,
};
