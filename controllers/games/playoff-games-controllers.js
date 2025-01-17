const knex = require("knex")(require("../knexfile"));

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

const getOnePlayoffSeasonOfGames = async (_req, res) => {
  try {
    const games = await knex("games")
      .where("game_type", "Playoffs")
      .andWhere({ season: req.params.seasonYear });

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

module.exports = {
  getAllPlayoffGames,
  getOnePlayoffSeasonOfGames,
};
