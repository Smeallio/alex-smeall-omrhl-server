const knex = require("knex")(require("../knexfile"));

const getAllGames = async (_req, res) => {
  try {
    const games = await knex("games");
    res.json(games);
  } catch (err) {
    res.status(500).send(`Error retrieving games from the database: ${err}`);
  }
};

const addGame = async (req, res) => {
  if (!req.body.date || !req.body.time) {
    return res.status(400).json({
      message: "Invalid game - missing date and/or time",
    });
  }
  try {
    const result = await knex("games").insert(req.body);
    const newGameId = result[0];
    const createdGame = await knex("games").where({ id: newGameId });
    res.status(201).json(createdGame);
  } catch (err) {
    res.status(500).json({
      message: `Unable to create new team due to: ${err}`,
    });
  }
};

module.exports = {
  getAllGames,
  addGame,
};
