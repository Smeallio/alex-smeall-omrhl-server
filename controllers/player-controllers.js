const knex = require("knex")(require("../knexfile"));

const getAllPlayers = async (_req, res) => {
  try {
    const players = await knex("players");
    res.json(players);
  } catch (err) {
    res.status(500).send(`Error retrieving players from the database: ${err}`);
  }
};

const getPlayersByTeam = async (req, res) => {
  try {
    const players = await knex("players").where(
      "players.team_id",
      "=",
      req.params.teamId
    );
    res.json(players);
  } catch (err) {
    res.status(500).send(`Error retrieving players from the database: ${err}`);
  }
};

const addPlayer = async (req, res) => {
  const { teamId } = req.params;

  if (!req.body.name) {
    return res.status(400).json({
      message: "Invalid team - missing player name",
    });
  }
  try {
    const playerData = {
      ...req.body,
      team_id: teamId,
    };
    const result = await knex("players").insert(playerData);
    const newPlayerId = result[0];
    const createdPlayer = await knex("players").where({ id: newPlayerId });
    res.status(201).json(createdPlayer);
  } catch (err) {
    res.status(500).json({
      message: `Unable to create new player due to: ${err}`,
    });
  }
};

const updatePlayer = async (req, res) => {
  try {
    await knex("players").where({ id: req.params.playerId }).update(req.body);
    const updatedPlayer = await knex("players").where({
      id: req.params.playerId,
    });

    if (updatedPlayer.length > 0) {
      res.status(201).json(updatedPlayer);
    } else {
      res.status(404).json({
        message: "Player not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Unable to update player due to: ${err}`,
    });
  }
};

const deletePlayer = async (req, res) => {
  try {
    const result = await knex("players")
      .where({ id: req.params.playerId })
      .delete();
    res.status(204).send("Player deleted");
  } catch (err) {
    res.status(500).json({ message: `Unable to delete player due to: ${err}` });
  }
};

module.exports = {
  getAllPlayers,
  getPlayersByTeam,
  addPlayer,
  updatePlayer,
  deletePlayer,
};
