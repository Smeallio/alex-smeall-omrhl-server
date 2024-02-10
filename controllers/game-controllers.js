const knex = require("knex")(require("../knexfile"));

const getAllGames = async (_req, res) => {
  try {
    const games = await knex("games");
    res.status(200).json(games);
  } catch (err) {
    res.status(500).send(`Error retrieving games from the database: ${err}`);
  }
};

const getOneGame = async (req, res) => {
  try {
    const game = await knex("games").where( { id: req.params.gameId }).first();
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.status(200).json(game);
  } catch (err) {
    res.status(500).send(`Error retrieving players from the database: ${err}`);
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

const updateGame = async (req, res) => {
  try {
    await knex("games").where({ id: req.params.gameId }).update(req.body);
    const updatedGame = await knex("games").where({
      id: req.params.gameId,
    });

    if (updatedGame.length > 0) {
      res.status(201).json(updatedGame);
    } else {
      res.status(404).json({
        message: "Game not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Unable to update game due to: ${err}`,
    });
  }
};

module.exports = {
  getAllGames,
  getOneGame,
  addGame,
  updateGame
};
