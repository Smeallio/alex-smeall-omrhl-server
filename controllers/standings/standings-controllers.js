const knex = require("knex")(require("../../knexfile"));

const getStandings = async (req, res) => {
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
              .andWhere("season", req.params.seasonYear)
              .as("subquery1");
          })
          .unionAll(function () {
            this.select("team_name", "result").from(function () {
              this.select("team2_name AS team_name", "team2_result AS result")
                .from("games")
                .where("complete", 1)
                .andWhere("game_type", "Regular Season")
                .andWhere("season", req.params.seasonYear)
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

module.exports = {
  getStandings,
};
