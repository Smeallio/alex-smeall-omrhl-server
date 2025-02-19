const knex = require("knex")(require("../knexfile"));

const getAllGames = async (_req, res) => {
  try {
    const games = await knex("games");

    games.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;

      const timeA = parseInt(a.time.split(":")[0]);
      const timeB = parseInt(b.time.split(":")[0]);
      return timeA - timeB;
    });

    res.status(200).json(games);
  } catch (err) {
    res.status(500).send(`Error retrieving games from the database: ${err}`);
  }
};

const getOneSeasonGames = async (req, res) => {
  try {
    const games = await knex("games").where({ season: req.params.seasonYear });

    games.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;

      const timeA = parseInt(a.time.split(":")[0]);
      const timeB = parseInt(b.time.split(":")[0]);
      return timeA - timeB;
    });

    res.status(200).json(games);
  } catch (err) {
    res.status(500).send(`Error retrieving games from the database: ${err}`);
  }
};

const getAllRegSeasonGames = async (_req, res) => {
  try {
    const games = await knex("games").where("game_type", "Regular Season");

    games.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;

      const timeA = parseInt(a.time.split(":")[0]);
      const timeB = parseInt(b.time.split(":")[0]);
      return timeA - timeB;
    });

    res.status(200).json(games);
  } catch (err) {
    res.status(500).send(`Error retrieving games from the database: ${err}`);
  }
};

const getAllPlayoffGames = async (_req, res) => {
  try {
    const games = await knex("games").where("game_type", "Playoffs");

    games.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;

      const timeA = parseInt(a.time.split(":")[0]);
      const timeB = parseInt(b.time.split(":")[0]);
      return timeA - timeB;
    });

    res.status(200).json(games);
  } catch (err) {
    res.status(500).send(`Error retrieving games from the database: ${err}`);
  }
};

const getOneGame = async (req, res) => {
  try {
    const game = await knex("games").where({ id: req.params.gameId }).first(); // Sync syntax for other controller
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.status(200).json(game);
  } catch (err) {
    res.status(500).send(`Error retrieving players from the database: ${err}`);
  }
};

const getStandings = async (_req, res) => {
  try {
    const teamResults = await knex
      .select(
        "team_name",
        knex.raw("COUNT(*) AS games_played"),
        knex.raw("SUM(CASE WHEN result = 'win' THEN 1 ELSE 0 END) AS wins"),
        knex.raw("SUM(CASE WHEN result = 'loss' THEN 1 ELSE 0 END) AS losses"),
        knex.raw("SUM(CASE WHEN result = 'tie' THEN 1 ELSE 0 END) AS ties"),
        knex.raw(
          "SUM(CASE WHEN result = 'win' THEN 2 WHEN result = 'tie' THEN 1 ELSE 0 END) AS points"
        )
      )
      .from(function () {
        this.select("team_name", "result")
          .from(function () {
            this.select("team1_name AS team_name", "team1_result AS result")
              .from("games")
              .where("complete", 1)
              .andWhere("game_type", "Regular Season")
              .as("subquery1");
          })
          .unionAll(function () {
            this.select("team_name", "result").from(function () {
              this.select("team2_name AS team_name", "team2_result AS result")
                .from("games")
                .where("complete", 1)
                .andWhere("game_type", "Regular Season")
                .as("subquery2");
            });
          })
          .as("results");
      })
      .groupBy("team_name");

    res.status(200).json(teamResults);
  } catch (err) {
    res
      .status(500)
      .send(`Error retrieving standings from the database: ${err}`);
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

const deleteGame = async (req, res) => {
  try {
    const result = await knex("games")
      .where({ id: req.params.gameId })
      .delete();
    res.status(204).json({ message: `Game deleted: ${result}` });
  } catch (err) {
    res.status(500).json({ message: `Unable to delete game due to: ${err}` });
  }
};

module.exports = {
  getAllGames,
  getOneSeasonGames,
  getAllRegSeasonGames,
  getAllPlayoffGames,
  getOneGame,
  getStandings,
  addGame,
  updateGame,
  deleteGame,
};
