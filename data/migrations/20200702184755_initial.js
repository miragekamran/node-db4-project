
exports.up = async function(knex) {
    await knex.schema.createTable("recipes", (table) => {
        table.increments("id")
        table.text("name").notNull().unique()
        table.text("description").notNull()
    })
    await knex.schema.createTable("steps", (table) => {
        table.float("step_number").notNull()
        table
            .integer("recipe_id")
            .references("id")
            .inTable("recipes")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
        table.text("description")
        table.primary(["step_number"])
    })
    await knex.schema.createTable("ingredients", (table) => {
        table.increments("id")
        table.text("name").notNull().unique()
    })
    await knex.schema.createTable("recipes_ingredients", (table) => {
        table
            .integer("step")
            .references("step_number")
            .inTable("steps")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
        table
            .integer("ingredient_id")
            .references("id")
            .inTable("ingredients")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
        table.float("quantity")
    })
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists("recipes_ingredients")
    await knex.schema.dropTableIfExists("ingredients")
    await knex.schema.dropTableIfExists("steps")
    await knex.schema.dropTableIfExists("recipes")
};
