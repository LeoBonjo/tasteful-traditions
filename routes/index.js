var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({ title: "Hello!!" });
});

// GET all recipes such that the user can filter by title or country
router.get(`/recipes`, async function (req, res, next) {
  const { title, restrictions, ingredient, country } = req.query;
  console.log(req.query);
  let whereClause = "";
  const where = [];
  try {
    if (title) {
      where.push(`title = ${title}`);
    }

    if (country) {
      where.push(`country = ${country}`);
    }

    if (where.length > 0) {
      whereClause = `WHERE ${where.join(" AND ")}`;
    }

    let result = await db(`SELECT * FROM recipes ${whereClause}`);

    const final = [];
    for (const recipe of result.data) {
      const ingredients = await db(`SELECT * FROM recipes_ingredients
      JOIN ingredients ON recipes_ingredients.ingredient_id = ingredients.id

      WHERE recipes_ingredients.recipe_id =${recipe.id}
      `);
      const restrictions = await db(
        `SELECT * FROM recipes_restrictions
      JOIN restrictions ON recipes_restrictions.restriction_id = restrictions.id
      WHERE recipes_restrictions.recipe_id =${recipe.id}

        `
      );
      recipe.ingredients = ingredients.data;
      recipe.restrictions = restrictions.data;
      final.push(recipe);
    }
    res.send(final);
  } catch (err) {
    res.status(500).send({ error: "An error occurred" });
  }
});

// GET recipe by id
router.get("/recipes/:id", async function (req, res) {
  try {
    let result = await db(`SELECT * FROM recipes WHERE id = ${req.params.id}`);
    console.log("hello", req.params.id);
    const final = [];
    for (const recipe of result.data) {
      const ingredients = await db(`SELECT * FROM recipes_ingredients
      JOIN ingredients ON recipes_ingredients.ingredient_id = ingredients.id

      WHERE recipes_ingredients.recipe_id =${recipe.id}
      `);
      const restrictions = await db(
        `SELECT * FROM recipes_restrictions
      JOIN restrictions ON recipes_restrictions.restriction_id = restrictions.id
      WHERE recipes_restrictions.recipe_id =${recipe.id}

        `
      );
      recipe.ingredients = ingredients.data;
      recipe.restrictions = restrictions.data;
      final.push(recipe);
    }
    res.send(final);
  } catch (err) {
    res.status(500).send({ error: "An error occurred" });
  }
});
// DELETE recipe by id
router.delete("/recipes/:id", async function (req, res) {
  try {
    let recipeId = req.params.id;
    let result = await db(`SELECT * FROM recipes WHERE id = ${recipeId}`);
    console.log(result.data.length);
    if (result.data.length === 1) {
      await db(`DELETE FROM recipes_ingredients WHERE recipe_id = ${recipeId}`);
      console.log("hello");
      await db(
        `DELETE FROM recipes_restrictions WHERE recipe_id = ${recipeId}`
      );
      await db(`DELETE FROM recipes WHERE id = ${recipeId}`);
      res.send({ message: "The recipe was deleted" });
    } else {
      // recipe doesn't exist
      res.status(404).send({ error: "Recipe not found" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET all countries
router.get("/countries", async function (req, res, next) {
  const result = await db("SELECT * FROM location;");
  res.send(result.data);
});

// GET country by id
router.get("/countries/:id", function (req, res) {
  db(`SELECT * FROM location WHERE id = ${req.params.id};`)
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

// POST a new recipe
router.post("/recipes", async function (req, res) {
  let {
    title,
    image,
    servings,
    instructions,
    culture_desc,
    country,
    region,
    ingredient,
    quantity,
    unit,
    restriction,
  } = req.body;
  try {
    let sql = `
  INSERT INTO recipes (
    title,
    image,
    servings,
    instructions,
    culture_desc,
    country,
    region
    )
    VALUES (
      ${title},
      ${image},
      ${servings},
      ${instructions},
      ${culture_desc},
      ${country},
      ${region},
      ${ingredients},
      ${restrictions}
  ) INSERT INTO ingredients WHERE recipe id ... ? (
    ingredient
  ) VALUES (
    ${ingredient}
  ) INSERT INTO recipes_ingredients WHERE recipe id ... ? (
    quantity,
    unit
  ) VALUES (
    ${quantity},
    ${unit}
  ) INSERT INTO restrictions WHERE recipe id .... ? (
    restriction
  ) VALUES (
    ${restriction}
  )
  `;
    await db(sql);
    let result = await db("select * from recipes");
    res.status(201).send(result.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// POST admin login
router.post("/login", async function (req, res) {
  let { username, password, name } = req.body;
  try {
    let sql = `
  INSERT INTO user (
    username,
    password,
    name)
    VALUES (
      ${username},
      ${password},
      ${name}
  )
  `;
    await db(sql);
    let result = await db("select * from login");
    res.status(201).send(result.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
