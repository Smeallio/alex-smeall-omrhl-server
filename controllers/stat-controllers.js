const knex = require("knex")(require("../knexfile"));

const getAllSkaterStats = async (_req, res) => {
  try {
    const skaterStats = await knex("skaterStats")
      .select("skaterStats.*", "players.name as player_name")
      .leftJoin("players", "skaterStats.player_id", "players.id");
    res.status(200).json(skaterStats);
  } catch (err) {
    res.status(500).send(`Error retrieving stats from the database: ${err}`);
  }
};

const getAllGoalieStats = async (_req, res) => {
  try {
    const goalieStats = await knex("goalieStats")
      .select("goalieStats.*", "players.name as player_name")
      .leftJoin("players", "goalieStats.player_id", "players.id");
    res.status(200).json(goalieStats);
  } catch (err) {
    res.status(500).send(`Error retrieving stats from the database: ${err}`);
  }
};

const getSkaterStatsByGame = async (req, res) => {
  try {
    const skaterStatsByGame = await knex("skaterStats")
      .select(
        "skaterStats.*",
        "players.name as player_name",
        "players.position as player_position",
        "players.number as player_number"
      )
      .leftJoin("players", "skaterStats.player_id", "players.id")
      .where({
        game_id: req.params.gameId,
      });
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

const getGoalieStatsByGame = async (req, res) => {
  try {
    const goalieStatsByGame = await knex("goalieStats")
      .select(
        "goalieStats.*",
        "players.name as player_name",
        "players.position as player_position",
        "players.number as player_number"
      )
      .leftJoin("players", "goalieStats.player_id", "players.id")
      .where({
        game_id: req.params.gameId,
      });
    if (!goalieStatsByGame) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.status(200).json(goalieStatsByGame);
  } catch (err) {
    res
      .status(500)
      .send(`Error retrieving game stats from the database: ${err}`);
  }
};

const getSummarizedSkaterStats = async (_req, res) => {
  try {
    const summedSkaterStats = await knex("skaterStats")
      .select(
        "players.id as player_id",
        "players.name as player_name",
        "players.position as player_position",
        "players.number as player_number",
        "players.team_id as player_teamId",
        knex.raw("COUNT(skaterStats.player_id) AS games_played"),
        knex.raw("SUM(skaterStats.goals) AS total_goals"),
        knex.raw("SUM(skaterStats.assists) AS total_assists"),
        knex.raw(
          "SUM(skaterStats.goals) + SUM(skaterStats.assists) AS total_points"
        )
      )
      .leftJoin("players", "skaterStats.player_id", "players.id")
      .leftJoin("games", "skaterStats.game_id", "games.id")
      .where("games.game_type", "Regular Season")
      .groupBy("skaterStats.player_id")
      .orderBy("total_points", "desc");
    res.status(200).json(summedSkaterStats);
  } catch (err) {
    res.status(500).send(`Error retrieving stats from the database: ${err}`);
  }
};

const getSummarizedGoalieStats = async (_req, res) => {
  try {
    const summedGoalieStats = await knex("goalieStats")
      .select(
        "players.id as player_id",
        "players.name as player_name",
        "players.position as player_position",
        "players.number as player_number",
        "players.team_id as player_teamId",
        knex.raw("COUNT(goalieStats.player_id) AS games_played"),
        knex.raw("SUM(goalieStats.wins) AS total_wins"),
        knex.raw("SUM(goalieStats.goalsAgainst) AS total_goalsAgainst"),
        knex.raw("ROUND(SUM(goalieStats.goalsAgainst) / COUNT(goalieStats.player_id), 2) AS goalsAgainst_average")
      )
      .leftJoin("players", "goalieStats.player_id", "players.id")
      .leftJoin("games", "goalieStats.game_id", "games.id")
      .where("games.game_type", "Regular Season")
      .groupBy("goalieStats.player_id")
      .orderBy("total_wins", "desc");
    res.status(200).json(summedGoalieStats);
  } catch (err) {
    res.status(500).send(`Error retrieving stats from the database: ${err}`);
  }
};

const getSummarizedSkaterStatsByTeam = async (req, res) => {
  try {
    const summedSkaterStats = await knex("skaterStats")
      .select(
        "players.id as player_id",
        "players.name as player_name",
        "players.position as player_position",
        "players.number as player_number",
        knex.raw("COUNT(skaterStats.player_id) AS games_played"),
        knex.raw("SUM(skaterStats.goals) AS total_goals"),
        knex.raw("SUM(skaterStats.assists) AS total_assists"),
        knex.raw(
          "SUM(skaterStats.goals) + SUM(skaterStats.assists) AS total_points"
        )
      )
      .leftJoin("players", "skaterStats.player_id", "players.id")
      .leftJoin("games", "skaterStats.game_id", "games.id")
      .where({
        "players.team_id": req.params.teamId,
      })
      .andWhere("game_type", "Regular Season")
      .groupBy("skaterStats.player_id")
      .orderBy("total_points", "desc");
    res.status(200).json(summedSkaterStats);
  } catch (err) {
    res.status(500).send(`Error retrieving stats from the database: ${err}`);
  }
};

const getSummarizedGoalieStatsByTeam = async (req, res) => {
  try {
    const summedGoalieStats = await knex("goalieStats")
      .select(
        "players.id as player_id",
        "players.name as player_name",
        "players.position as player_position",
        "players.number as player_number",
        knex.raw("COUNT(goalieStats.player_id) AS games_played"),
        knex.raw("SUM(goalieStats.wins) AS total_wins"),
        knex.raw("SUM(goalieStats.goalsAgainst) AS total_goalsAgainst")
      )
      .leftJoin("players", "goalieStats.player_id", "players.id")
      .leftJoin("games", "goalieStats.game_id", "games.id")
      .where({
        "players.team_id": req.params.teamId,
      })
      .andWhere("game_type", "Regular Season")
      .groupBy("goalieStats.player_id")
      .orderBy("total_wins", "desc");
    res.status(200).json(summedGoalieStats);
  } catch (err) {
    res.status(500).send(`Error retrieving stats from the database: ${err}`);
  }
};

const getSummarizedPlayoffSkaterStats = async (_req, res) => {
  try {
    const summedSkaterStats = await knex("skaterStats")
      .select(
        "players.id as player_id",
        "players.name as player_name",
        "players.position as player_position",
        "players.number as player_number",
        "players.team_id as player_teamId",
        knex.raw("COUNT(skaterStats.player_id) AS games_played"),
        knex.raw("SUM(skaterStats.goals) AS total_goals"),
        knex.raw("SUM(skaterStats.assists) AS total_assists"),
        knex.raw(
          "SUM(skaterStats.goals) + SUM(skaterStats.assists) AS total_points"
        )
      )
      .leftJoin("players", "skaterStats.player_id", "players.id")
      .leftJoin("games", "skaterStats.game_id", "games.id")
      .where("games.game_type", "Playoffs")
      .groupBy("skaterStats.player_id")
      .orderBy("total_points", "desc");
    res.status(200).json(summedSkaterStats);
  } catch (err) {
    res.status(500).send(`Error retrieving stats from the database: ${err}`);
  }
};

const getSummarizedPlayoffGoalieStats = async (_req, res) => {
  try {
    const summedGoalieStats = await knex("goalieStats")
      .select(
        "players.id as player_id",
        "players.name as player_name",
        "players.position as player_position",
        "players.number as player_number",
        "players.team_id as player_teamId",
        knex.raw("COUNT(goalieStats.player_id) AS games_played"),
        knex.raw("SUM(goalieStats.wins) AS total_wins"),
        knex.raw("SUM(goalieStats.goalsAgainst) AS total_goalsAgainst"),
        knex.raw("ROUND(SUM(goalieStats.goalsAgainst) / COUNT(goalieStats.player_id), 2) AS goalsAgainst_average")
      )
      .leftJoin("players", "goalieStats.player_id", "players.id")
      .leftJoin("games", "goalieStats.game_id", "games.id")
      .where("games.game_type", "Playoffs")
      .groupBy("goalieStats.player_id")
      .orderBy("total_wins", "desc");
    res.status(200).json(summedGoalieStats);
  } catch (err) {
    res.status(500).send(`Error retrieving stats from the database: ${err}`);
  }
};

const getSummarizedPlayoffSkaterStatsByTeam = async (req, res) => {
  try {
    const summedSkaterStats = await knex("skaterStats")
      .select(
        "players.id as player_id",
        "players.name as player_name",
        "players.position as player_position",
        "players.number as player_number",
        knex.raw("COUNT(skaterStats.player_id) AS games_played"),
        knex.raw("SUM(skaterStats.goals) AS total_goals"),
        knex.raw("SUM(skaterStats.assists) AS total_assists"),
        knex.raw(
          "SUM(skaterStats.goals) + SUM(skaterStats.assists) AS total_points"
        )
      )
      .leftJoin("players", "skaterStats.player_id", "players.id")
      .leftJoin("games", "skaterStats.game_id", "games.id")
      .where({
        "players.team_id": req.params.teamId,
      })
      .andWhere("game_type", "Playoffs")
      .groupBy("skaterStats.player_id")
      .orderBy("total_points", "desc");
    res.status(200).json(summedSkaterStats);
  } catch (err) {
    res.status(500).send(`Error retrieving stats from the database: ${err}`);
  }
};

const getSummarizedPlayoffGoalieStatsByTeam = async (req, res) => {
  try {
    const summedGoalieStats = await knex("goalieStats")
      .select(
        "players.id as player_id",
        "players.name as player_name",
        "players.position as player_position",
        "players.number as player_number",
        knex.raw("COUNT(goalieStats.player_id) AS games_played"),
        knex.raw("SUM(goalieStats.wins) AS total_wins"),
        knex.raw("SUM(goalieStats.goalsAgainst) AS total_goalsAgainst")
      )
      .leftJoin("players", "goalieStats.player_id", "players.id")
      .leftJoin("games", "goalieStats.game_id", "games.id")
      .where({
        "players.team_id": req.params.teamId,
      })
      .andWhere("game_type", "Playoffs")
      .groupBy("goalieStats.player_id")
      .orderBy("total_wins", "desc");
    res.status(200).json(summedGoalieStats);
  } catch (err) {
    res.status(500).send(`Error retrieving stats from the database: ${err}`);
  }
};

const addSkaterStat = async (req, res) => {
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

const addGoalieStat = async (req, res) => {
  const game_id = req.params.gameId;
  if (!req.body.player_id || !req.body.team_id) {
    return res.status(400).json({
      message: "Invalid game id, player id or team id",
    });
  }

  req.body.game_id = game_id;

  try {
    const result = await knex("goalieStats").insert(req.body);
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

const updateGoalieStat = async (req, res) => {
  const game_id = req.params.gameId;
  if (!req.body.player_id || !req.body.team_id) {
    return res.status(400).json({
      message: "Invalid game - game id, player id or team id",
    });
  }

  req.body.game_id = game_id;

  try {
    await knex("goalieStats")
      .where({ id: req.params.goalieStatId })
      .update(req.body);
    const updatedGoalieStat = await knex("goalieStats").where({
      id: req.params.goalieStatId,
    });

    if (updatedGoalieStat.length > 0) {
      res.status(201).json(updatedGoalieStat);
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
    res.status(204).json({ message: `Stat deleted: ${result}` });
  } catch (err) {
    res.status(500).json({ message: `Unable to delete stat due to: ${err}` });
  }
};

const deleteGoalieStat = async (req, res) => {
  try {
    const result = await knex("goalieStats")
      .where({ id: req.params.goalieStatId })
      .delete();
    res.status(204).json({ message: `Stat deleted: ${result}` });
  } catch (err) {
    res.status(500).json({ message: `Unable to delete stat due to: ${err}` });
  }
};

module.exports = {
  getAllSkaterStats,
  getAllGoalieStats,
  getSkaterStatsByGame,
  getGoalieStatsByGame,
  getSummarizedSkaterStats,
  getSummarizedGoalieStats,
  getSummarizedSkaterStatsByTeam,
  getSummarizedGoalieStatsByTeam,
  getSummarizedPlayoffSkaterStats,
  getSummarizedPlayoffGoalieStats,
  getSummarizedPlayoffSkaterStatsByTeam,
  getSummarizedPlayoffGoalieStatsByTeam,
  addSkaterStat,
  addGoalieStat,
  updateSkaterStat,
  updateGoalieStat,
  deleteSkaterStat,
  deleteGoalieStat,
};
