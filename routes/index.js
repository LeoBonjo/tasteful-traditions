var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({ title: "Hello!!" });
});

// GET all recipes such that the user can filter by title or country
router.get(`/recipes`, async function (req, res, next) {
  console.log("hello?");
  const { title, country } = req.query;
  console.log(req.query);
  let whereClause = "";
  const where = [];
  // all the filtering logic (conditional statement) belong in the BACKEND
  // filtering operation means "see all the recipes from franc" for ex
  // Because it is a backend operation (scalability, efficiency, logarithmically faster, use a tree to get from O of N to LogN - like the glossary in a textbook)
  // This is done by the INSERT and WHERE clauses, which traverse the binary tree
  try {
    if (title) {
      where.push(`title LIKE "%${title}%"`);
    }

    if (country) {
      where.push(`country = "${country}"`);
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
    const recipe = result.data[0];
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
    res.send(recipe);
  } catch (err) {
    res.status(500).send({ error: "An error occurred" });
  }
});

// DELETE recipe by id
router.delete("/recipes/:id", async function (req, res) {
  try {
    let recipeId = req.params.id;
    let result = await db(`SELECT * FROM recipes WHERE id = ${recipeId}`);

    if (result.data.length === 1) {
      let result = await db(
        `SELECT * FROM recipes_ingredients WHERE recipe_id = ${recipeId}`
      );
      if (result.data.length) {
        await db(
          `DELETE FROM recipes_ingredients WHERE recipe_id = ${recipeId}`
        );
      }

      result = await db(
        `SELECT * FROM recipes_restrictions WHERE recipe_id = ${recipeId}`
      );
      if (result.data.length) {
        await db(
          `DELETE FROM recipes_restrictions WHERE recipe_id = ${recipeId}`
        );
      }

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

// // GET country by id VERSION 1
// router.get("/countries/:id", function (req, res) {
//   db(`SELECT * FROM location WHERE id = ${req.params.id};`)
//     .then((results) => {
//       res.send(results.data);
//     })
//     .catch((err) => res.status(500).send(err));
// });

// GET country by id VERSION 2
router.get("/countries/:id", async function (req, res) {
  const countryId = req.params.id;

  if (!Number.isInteger(parseInt(countryId))) 
    {return res.status(400).send({ error: "Invalid ID format" });}

  try {
    const locationQuery = `SELECT * FROM location WHERE id = ${parseInt(countryId)}`;
    const locationResult = await db(locationQuery);

    if (locationResult.data.length === 0) {
      return res.status(404).send({ error: "Location not found" });
    }

    const location = locationResult.data[0];

    const country = location.country.replace(/'/g, "''");
    const recipesQuery = `SELECT * FROM recipes WHERE country = '${country}'`;
    const recipesResult = await db(recipesQuery);

    const recipes = await Promise.all(recipesResult.data.map(async (recipe) => {

      const recipeId = parseInt(recipe.id);
      const ingredientsQuery = `SELECT ingredients.* FROM recipes_ingredients JOIN ingredients ON recipes_ingredients.ingredient_id = ingredients.id WHERE recipes_ingredients.recipe_id = ${recipeId}`;
      const ingredientsResult = await db(ingredientsQuery);

      const restrictionsQuery = `SELECT restrictions.* FROM recipes_restrictions JOIN restrictions ON recipes_restrictions.restriction_id = restrictions.id WHERE recipes_restrictions.recipe_id = ${recipeId}`;
      const restrictionsResult = await db(restrictionsQuery);

      return {
        ...recipe,
        ingredients: ingredientsResult.data,
        restrictions: restrictionsResult.data,};
      }));
    res.send({location, recipes,});
  } catch (err) {
    console.error("Error in /api/countries/:id route:", err);
    res.status(500).send({ error: "An error occurred", details: err.message });
  }
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
    ingredients,
    quantity,
    unit,
    restrictions,
  } = req.body;
  console.log(req.body);

  try {
    const result = await db(
      `INSERT INTO recipes (
      title,
      image,
      servings,
      instructions,
      culture_desc,
      country,
      region
    ) VALUES (
      "${title}", 
      "${image}",
      ${servings},
      "${instructions}",
      "${culture_desc}",
      "${country}",
      "${region}"
    )`
    );

    let recipeId;
    const checkRecipeId = await db(`
      SELECT * FROM recipes ORDER BY id DESC LIMIT 1
    `);
    if (checkRecipeId.data.length > 0) {
      recipeId = checkRecipeId.data[0].id;
    } else {
      result;
    }

    // Insert ingredients and recipes_ingredients junction
    for (const ingredient of ingredients) {
      let ingredientId;
      const checkForIngredient = await db(`
      SELECT * FROM ingredients WHERE ingredient = "${ingredient.ingredient}"
      `);
      if (checkForIngredient.data.length > 0) {
        ingredientId = checkForIngredient.data[0].id;
      } else {
        await db(`INSERT INTO ingredients (
          ingredient
        ) VALUES (
          "${ingredient.ingredient}"
        );`);
        const resultIngredient = await db(
          `SELECT * FROM ingredients ORDER BY id DESC LIMIT 1`
        );
        ingredientId = resultIngredient.data[0].id;
      }

      await db(
        `INSERT INTO recipes_ingredients (
        ingredient_id,
        recipe_id,
        quantity,
        unit
      ) VALUES (
        ${ingredientId},
        ${recipeId},
        ${ingredient.quantity},
        "${ingredient.unit}"
      ); `
      );
    }

    // Insert restrictions and recipes_restrictions junction
    for (const restriction of restrictions) {
      let restrictionId;
      const checkForRestriction = await db(`
      SELECT * FROM restrictions WHERE restriction = "${restriction.restriction}"
      `);
      if (checkForRestriction.data.length > 0) {
        restrictionId = checkForRestriction.data[0].id;
      } else {
        await db(`INSERT INTO restrictions (
          restriction
        ) VALUES (
          "${restriction.restriction}"
        );`);
        const resultRestriction = await db(
          `SELECT * FROM restrictions ORDER BY id DESC LIMIT 1`
        );
        restrictionId = resultRestriction.data[0].id;
      }

      await db(`INSERT INTO recipes_restrictions (
      recipe_id,
      restriction_id
    ) VALUES (
      ${recipeId},
      ${restrictionId}
    ); `);
    }

    // Send the response after all ingredients and restrictions have been processed
    res.status(201).json({ message: "Recipe added!", data: checkRecipeId.data[0] });

  } catch (error) {
    res.status(500).send({ message: error.message });
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
