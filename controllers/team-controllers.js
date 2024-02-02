const knex = require("knex")(require("../knexfile"));

const getTeams = async (_req, res) => {
  try {
    const teams = await knex("teams");
    res.json(teams);
  } catch (err) {
    res.status(500).send(`Error retrieving teams from the database: ${err}`);
  }
};

const addTeam = async (req, res) => {
  if (!req.body.team_name) {
    return res.status(400).json({
      message: "Invalid team - missing team name",
    });
  }
  try {
    const result = await knex("teams").insert(req.body);
    const newTeamId = result[0];
    const createdTeam = await knex("teams").where({ id: newTeamId });
    res.status(201).json(createdTeam);
  } catch (err) {
    res.status(500).json({
      message: `Unable to create new team due to: ${err}`,
    });
  }
};

module.exports = {
  getTeams,
  addTeam,
};
