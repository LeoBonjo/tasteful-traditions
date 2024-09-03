DROP TABLE IF EXISTS location;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS recipes_restrictions;
DROP TABLE IF EXISTS restrictions;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS recipes_ingredients;
DROP TABLE IF EXISTS junction_table;

CREATE TABLE `location`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `image` CHAR(255) NOT NULL,
    `country` CHAR(255) NOT NULL,
    `culture` VARCHAR(5000) NOT NULL
);
CREATE TABLE `users`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` CHAR(255) NOT NULL,
    `username` CHAR(20) NOT NULL,
    `password` CHAR(20) NOT NULL
);
CREATE TABLE `recipes`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` CHAR(255) NOT NULL,
    `image` CHAR(255) NOT NULL,
    `servings` INT NOT NULL,
    `instructions` VARCHAR(5000) NOT NULL,
    `culture_desc` VARCHAR(5000) NOT NULL,
    `country` CHAR(100) NOT NULL,
    `region` CHAR(255) NOT NULL
);

CREATE TABLE `recipes_restrictions`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `recipe_id` INT NOT NULL,
    `restriction_id` INT NOT NULL
);

CREATE TABLE `restrictions`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `restriction` CHAR(255) NOT NULL
);
CREATE TABLE `ingredients`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `ingredient` CHAR(255) NOT NULL
);

CREATE TABLE `recipes_ingredients`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `ingredient_id` INT NOT NULL,
    `recipe_id` INT NOT NULL,
    `quantity` INT NOT NULL,
    `unit` CHAR(255) NOT NULL
);

INSERT INTO `location` (`image`, `country`, `culture`)
VALUES
('x', 'Morocco', 'Moroccan cuisine is known for its rich and diverse flavors, with influences from Berber, Arab, and Mediterranean cuisines. Common ingredients include spices such as cumin, coriander, and saffron. Traditional dishes often include tagines and couscous.'),
('x', 'Mexico', 'Mexican cuisine is characterized by its bold flavors and use of indigenous ingredients like corn, beans, and chili peppers. Dishes such as tacos, enchiladas, and mole are staples. Mexican food is known for its vibrant and diverse regional variations.'),
('x', 'Japan', 'Japanese cuisine emphasizes seasonal ingredients and is known for its delicate flavors and presentation. Staples include rice, fish, and vegetables. Traditional dishes include sushi, tempura, and ramen. Japanese culinary traditions also focus on the aesthetics of food presentation.'),
('x', 'Italy', 'Italian cuisine is renowned for its use of fresh, high-quality ingredients such as tomatoes, olive oil, and garlic. Classic dishes include pasta, pizza, and risotto. Each region in Italy has its own culinary specialties and traditions.'),
('x', 'Australia', 'Australian cuisine features a diverse array of influences, reflecting the multicultural nature of the country. Common ingredients include lamb, seafood, and native bush foods like wattleseed. Outdoor cooking, such as barbecues, is a popular tradition, and there is a growing emphasis on using local and seasonal produce.');
INSERT INTO `recipes` (`title`, `image`, `servings`, `instructions`, `culture_desc`, `country`, `region`)
VALUES
('Tagine of Lamb with Prunes', 'x', 4,
'1. In a large tagine or heavy pot, heat oil and brown lamb pieces on all sides. \n2. Remove lamb and set aside. \n3. In the same pot, sauté onions, garlic, and ginger until soft. \n4. Stir in spices and cook for another minute. \n5. Return lamb to the pot and add broth, prunes, and honey. \n6. Cover and simmer on low heat for about 1.5 hours or until lamb is tender. \n7. Garnish with almonds and fresh cilantro before serving. \n8. Serve with couscous or crusty bread.',
'This tagine is a classic Moroccan dish that combines sweet and savory flavors. It is traditionally cooked in a tagine pot, which allows for slow cooking and rich flavor development.',
'Morocco', 'Fes'),
('Tacos al Pastor', 'x', 4,
'1. Marinate pork in a mixture of chili peppers, spices, and pineapple juice overnight. \n2. Skewer the marinated pork and grill until cooked through. \n3. Slice the pork thinly and serve in warm tortillas with chopped onions, cilantro, and a squeeze of lime. \n4. Top with salsa and your choice of toppings.',
'This popular Mexican street food features marinated pork with a distinct blend of spices and pineapple. It’s often cooked on a vertical rotisserie and served with fresh, flavorful toppings.',
'Mexico', 'Mexico City'),
('Sushi Rolls', 'x', 2,
'1. Cook sushi rice according to package instructions and let cool. \n2. Lay out a nori sheet on a bamboo mat and spread a thin layer of rice over it, leaving a 2 cm edge at the top. \n3. Place desired fillings (such as fish, cucumber, and avocado) along the bottom edge. \n4. Roll the sushi tightly using the mat, then slice into bite-sized pieces. \n5. Serve with soy sauce, wasabi, and pickled ginger.',
'Sushi is a staple of Japanese cuisine, known for its emphasis on fresh, seasonal ingredients. Rolls are often made with a variety of fillings and are a popular choice for both casual and formal dining.',
'Japan', 'Tokyo'),
('Spaghetti Carbonara', 'x', 4,
'1. Cook spaghetti according to package instructions. \n2. In a pan, cook pancetta until crispy. \n3. In a bowl, whisk together eggs and Parmesan cheese. \n4. Drain pasta and toss with pancetta and its fat. \n5. Remove from heat and quickly mix in the egg mixture to create a creamy sauce. \n6. Season with black pepper and serve immediately.',
'Carbonara is a classic Italian pasta dish known for its creamy sauce made from eggs and cheese. It traditionally features pancetta and is a prime example of simple, yet delicious Italian cooking.',
'Italy', 'Lazio'),
('Lamingtons', 'x', 12,
'1. Preheat oven and grease a baking pan. \n2. Prepare a sponge cake batter and bake until golden. \n3. Once cooled, cut the cake into squares. \n4. Dip each square into chocolate sauce and then roll in desiccated coconut. \n5. Let set before serving.',
'Lamingtons are a beloved Australian treat, consisting of sponge cake squares dipped in chocolate and rolled in coconut. They are often enjoyed with tea and reflect Australia’s affinity for sweet, simple desserts.',
'Australia', 'Queensland');
-- No initial data for users created yet
INSERT INTO `ingredients` (`ingredient`)
VALUES
('Lamb'),               -- ID 1
('Prunes'),             -- ID 2
('Honey'),              -- ID 3
('Almonds'),            -- ID 4
('Cilantro'),           -- ID 5
('Couscous'),           -- ID 6
('Oil'),                -- ID 7
('Onions'),             -- ID 8
('Garlic'),             -- ID 9
('Ginger'),             -- ID 10
('Broth'),              -- ID 11
('Chili Peppers'),      -- ID 12
('Pineapple Juice'),    -- ID 13
('Pork'),               -- ID 14
('Tortillas'),          -- ID 15
('Lime'),               -- ID 16
('Salsa'),              -- ID 17
('Fish'),               -- ID 18
('Cucumber'),           -- ID 19
('Avocado'),            -- ID 20
('Nori'),               -- ID 21
('Sushi Rice'),         -- ID 22
('Soy Sauce'),          -- ID 23
('Wasabi'),             -- ID 24
('Pickled Ginger'),     -- ID 25
('Spaghetti'),          -- ID 26
('Pancetta'),           -- ID 27
('Eggs'),               -- ID 28
('Parmesan Cheese'),    -- ID 29
('Black Pepper'),       -- ID 30
('Salt'),               -- ID 31
('Paprika'),            -- ID 32
('Cumin'),              -- ID 33
('Coriander'),          -- ID 34
('Saffron'),            -- ID 35
('Nutmeg'),             -- ID 36
('Cinnamon'),           -- ID 37
('Turmeric'),           -- ID 38
('Cardamom'),           -- ID 39
('Cloves'),             -- ID 40
('Cayenne Pepper'),     -- ID 41
('Sponge Cake'),        -- ID 42
('Chocolate Sauce'),    -- ID 43
('Desiccated Coconut'); -- ID 44
INSERT INTO `recipes_ingredients` (`ingredient_id`, `recipe_id`, `quantity`, `unit`)
VALUES
-- Tagine of Lamb with Prunes
(1, 1, 1, 'kg'),  -- Lamb
(2, 1, 200, 'g'), -- Prunes
(3, 1, 2, 'tbsp'), -- Honey
(4, 1, 50, 'g'), -- Almonds
(5, 1, 1, 'bunch'), -- Cilantro
(6, 1, 200, 'g'), -- Couscous
(7, 1, 2, 'tbsp'), -- Oil
(8, 1, 2, 'large'), -- Onions
(9, 1, 4, 'cloves'), -- Garlic
(10, 1, 1, 'tbsp'), -- Ginger
(11, 1, 500, 'ml'), -- Broth
(12, 1, 1, 'tbsp'), -- Chili Peppers
(32, 1, 1, 'tbsp'), -- Paprika
(33, 1, 1, 'tbsp'), -- Cumin
(34, 1, 1, 'tbsp'), -- Coriander
(35, 1, 1, 'pinch'), -- Saffron
(13, 1, 200, 'ml'), -- Pineapple Juice
-- Tacos al Pastor
(14, 2, 1, 'kg'), -- Pork
(15, 2, 12, 'pieces'), -- Tortillas
(8, 2, 1, 'medium'), -- Onions
(5, 2, 1, 'bunch'), -- Cilantro
(16, 2, 2, 'whole'), -- Lime
(17, 2, 100, 'g'), -- Salsa
-- Sushi Rolls
(18, 3, 200, 'g'), -- Fish
(19, 3, 1, 'large'), -- Cucumber
(20, 3, 1, 'medium'), -- Avocado
(21, 3, 10, 'sheets'), -- Nori
(22, 3, 200, 'g'), -- Sushi Rice
(23, 3, 50, 'ml'), -- Soy Sauce
(24, 3, 10, 'g'), -- Wasabi
(25, 3, 30, 'g'), -- Pickled Ginger
-- Spaghetti Carbonara
(26, 4, 400, 'g'), -- Spaghetti
(27, 4, 150, 'g'), -- Pancetta
(28, 4, 3, 'large'), -- Eggs
(29, 4, 100, 'g'), -- Parmesan Cheese
(30, 4, 1, 'tsp'), -- Black Pepper
(31, 4, 1, 'pinch'), -- Salt
-- Lamingtons
(42, 5, 1, 'whole'), -- Sponge Cake
(43, 5, 200, 'ml'), -- Chocolate Sauce
(44, 5, 100, 'g'); -- Desiccated Coconut
INSERT INTO `recipes_restrictions` (`recipe_id`, `restriction_id`)
VALUES
-- Tagine of Lamb with Prunes
-- No vegan or vegetarian restrictions
-- Tacos al Pastor
(2, 4),   -- Fish (contains fish)
(2, 6),   -- Soybeans (contains soy sauce)
(2, 3);   -- Eggs (contains eggs)
-- Sushi Rolls
(3, 4),   -- Fish (contains fish)
(3, 6),   -- Soybeans (contains soy sauce)
-- Spaghetti Carbonara
(4, 3),   -- Eggs (contains eggs)
(4, 7);   -- Milk (contains cheese)
-- Lamingtons
(5, 7);   -- Milk (contains milk)
INSERT INTO `location` (`image`, `country`, `culture`)
VALUES
('x', 'Morocco', 'Moroccan cuisine is rich and diverse, heavily influenced by Berber, Arab, and Mediterranean traditions. It is known for its bold flavors, using a variety of spices like saffron, cumin, and coriander. Popular dishes include tagines, couscous, and pastilla. Meals often start with salads or appetizers and are followed by a main course of meat or fish, and then dessert, often featuring fruits and pastries. Mint tea is a common beverage, symbolizing hospitality.'),
('x', 'Mexico', 'Mexican cuisine is vibrant and diverse, reflecting its indigenous roots and Spanish colonial influence. Staples include corn, beans, and chili peppers. Dishes like tacos, tamales, and enchiladas are iconic, often accompanied by salsas and guacamole. Mexican cuisine also features rich stews like mole and pozole, known for their complex flavors. Street food is popular, with antojitos (snacks) like elote and quesadillas being favorites.'),
('x', 'Japan', 'Japanese cuisine is known for its precision and emphasis on seasonal ingredients. It combines simplicity with refined presentation. Staples include rice, fish, and soy products like tofu and miso. Sushi and sashimi are famous globally, showcasing fresh seafood. Japanese meals often include several small dishes, such as pickles, soup, and vegetables, providing a balanced, nutritious experience. Umami, the fifth taste, plays a significant role in Japanese cooking.'),
('x', 'Italy', 'Italian cuisine is world-renowned for its emphasis on fresh, high-quality ingredients and regional diversity. Pasta, olive oil, and tomatoes are staples, with dishes varying greatly from region to region. In the north, creamy risottos and polenta are common, while the south is famous for its pasta and pizza. Italian meals are leisurely and social, often starting with antipasti, followed by multiple courses, and ending with coffee or dessert like gelato or tiramisu.'),
('x', 'Australia', 'Australian cuisine is a reflection of its multicultural society, blending indigenous ingredients with European, Asian, and Middle Eastern influences. Barbecue is a quintessential part of Australian food culture, with lamb, beef, and seafood being popular. Bush tucker, or indigenous foods like kangaroo and bush tomatoes, are increasingly recognized. Modern Australian cuisine, or Mod Oz, often involves creative fusions of flavors from around the world.');

INSERT INTO `recipes_ingredients` (`ingredient_id`, `recipe_id`, `quantity`, `unit`)
VALUES
-- Tagine of Lamb with Prunes (Recipe ID 1)
(1, 1, 800, 'grams'),       -- Lamb
(2, 1, 200, 'grams'),       -- Prunes
(3, 1, 2, 'tablespoons'),   -- Honey
(4, 1, 50, 'grams'),        -- Almonds
(5, 1, 1, 'bunch'),         -- Cilantro
(7, 1, 2, 'tablespoons'),   -- Oil
(8, 1, 2, 'large'),         -- Onions
(9, 1, 3, 'cloves'),        -- Garlic
(10, 1, 1, 'teaspoon'),     -- Ginger
(11, 1, 500, 'ml'),         -- Broth
(30, 1, 1, 'teaspoon'),     -- Black Pepper
(31, 1, 1, 'teaspoon'),     -- Salt
(33, 1, 1, 'teaspoon'),     -- Cumin
(34, 1, 1, 'teaspoon'),     -- Coriander
(35, 1, 1, 'pinch'),        -- Saffron
(36, 1, 1, 'pinch'),        -- Nutmeg
(37, 1, 1, 'teaspoon'),     -- Cinnamon
-- Tacos al Pastor (Recipe ID 2)
(14, 2, 500, 'grams'),      -- Pork
(12, 2, 2, 'pieces'),       -- Chili Peppers
(13, 2, 250, 'ml'),         -- Pineapple Juice
(15, 2, 8, 'pieces'),       -- Tortillas
(16, 2, 1, 'whole'),        -- Lime
(17, 2, 100, 'grams'),      -- Salsa
(30, 2, 1, 'teaspoon'),     -- Black Pepper
(31, 2, 1, 'teaspoon'),     -- Salt
(33, 2, 1, 'teaspoon'),     -- Cumin
(32, 2, 1, 'teaspoon'),     -- Paprika
-- Sushi Rolls (Recipe ID 3)
(18, 3, 200, 'grams'),      -- Fish
(19, 3, 1, 'whole'),        -- Cucumber
(20, 3, 1, 'whole'),        -- Avocado
(21, 3, 4, 'sheets'),       -- Nori
(22, 3, 300, 'grams'),      -- Sushi Rice
(23, 3, 3, 'tablespoons'),  -- Soy Sauce
(24, 3, 1, 'teaspoon'),     -- Wasabi
(25, 3, 50, 'grams'),       -- Pickled Ginger
(31, 3, 1, 'teaspoon'),     -- Salt
-- Spaghetti Carbonara (Recipe ID 4)
(26, 4, 400, 'grams'),      -- Spaghetti
(27, 4, 100, 'grams'),      -- Pancetta
(28, 4, 3, 'whole'),        -- Eggs
(29, 4, 50, 'grams'),       -- Parmesan Cheese
(30, 4, 1, 'teaspoon'),     -- Black Pepper
(31, 4, 1, 'teaspoon'),     -- Salt
-- Lamingtons (Recipe ID 5)
(42, 5, 500, 'grams'),      -- Sponge Cake
(43, 5, 200, 'ml'),         -- Chocolate Sauce
(44, 5, 100, 'grams');      -- Desiccated Coconut
INSERT INTO `restrictions` (`restriction`)
VALUES
('Gluten'),          -- ID 1
('Crustaceans'),     -- ID 2
('Eggs'),            -- ID 3
('Fish'),            -- ID 4
('Peanuts'),         -- ID 5
('Soybeans'),        -- ID 6
('Milk'),            -- ID 7
('Nuts'),            -- ID 8
('Celery'),          -- ID 9
('Mustard'),         -- ID 10
('Sesame seeds'),    -- ID 11
('Sulphites'),       -- ID 12
('Lupin'),           -- ID 13
('Molluscs'),        -- ID 14
('Vegan'),           -- ID 15
('Vegetarian');      -- ID 16







