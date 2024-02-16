/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("skaterStats", function (table) {
    table.increments("id").primary();
    table
      .integer("game_id")
      .notNullable()
      .unsigned()
      .references("games.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("player_name").notNullable();
    table
      .integer("player_id")
      .notNullable()
      .unsigned()
      .references("players.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("team_id")
      .notNullable()
      .unsigned()
      .references("teams.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.integer("goals");
    table.integer("assists");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("skaterStats");
};
