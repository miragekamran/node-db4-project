exports.seed = async function (knex) {
    await knex("ingredients").insert([
        { name: "flour" },
        { name: "sugar" },
    ])
}