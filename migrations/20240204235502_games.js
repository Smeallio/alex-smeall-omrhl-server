/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("games", (table) => {
    table.increments("id").primary();
    table.string("date").notNullable();
    table.string("time").notNullable();
    table.boolean("complete");
    table.string("team1_name");
    table
      .integer("team1_team_id")
      .unsigned()
      .references("teams.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.integer("team1_score");
    table.string("team1_result");
    table.string("team2_name");
    table
      .integer("team2_team_id")
      .unsigned()
      .references("teams.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.integer("team2_score");
    table.string("team2_result");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("games");
};
