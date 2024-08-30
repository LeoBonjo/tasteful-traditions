-- Pink hamburger file is a migration file

DROP TABLE IF EXISTS productions;
DROP TABLE IF EXISTS purchases;

CREATE TABLE `productions`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255),
    `budget` INT NOT NULL
);
CREATE TABLE `purchases`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `production_id` INT NOT NULL COMMENT 'For which show or production did you make this purchase?',
    `date` DATE NOT NULL COMMENT 'When did you make this purchase?',
    `order_num` INT NOT NULL COMMENT 'What are the last four digits of the order number?',
    `vender` VARCHAR(255) NOT NULL COMMENT 'From what company or store did you buy these things?',
    `items` INT NOT NULL,
    `description` VARCHAR(255) NULL COMMENT 'What specific item(s) were purchased in this transaction?',
    `payment_type` VARCHAR(255) NOT NULL COMMENT 'How did you pay for these things?',
    `total` DECIMAL(8, 2) NOT NULL COMMENT 'What is the total cost of this ENTIRE PURCHASE as shown on the receipt?',
    `reimb_submitted` BOOLEAN NOT NULL,
    `reimb_received` BOOLEAN NOT NULL
);



