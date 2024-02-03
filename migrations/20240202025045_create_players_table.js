/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("players", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table
      .integer("team_id")
      .unsigned()
      .references("teams.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("position");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("players");
};
