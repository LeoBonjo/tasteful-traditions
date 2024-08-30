CREATE TABLE `location`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` CHAR(255) NOT NULL,
    `image` CHAR(255) NOT NULL,
    `country` CHAR(255) NOT NULL,
    `culture` CHAR(5000) NOT NULL,
);
CREATE TABLE `junction_table`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `recipe_id` INT NOT NULL,
    `restriction_id` INT NOT NULL
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
    `instructions` CHAR(5000) NOT NULL,
    `culture_desc` CHAR(5000) NOT NULL,
    `country` CHAR(100) NOT NULL,
    `region` CHAR(255) NOT NULL
);
CREATE TABLE `restrictions`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` CHAR(255) NOT NULL
);
CREATE TABLE `ingredients`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `recipe_id` INT NOT NULL,
    `item` CHAR(255) NOT NULL,
    `quantity` INT NOT NULL,
    `unit` CHAR(255) NOT NULL
);



