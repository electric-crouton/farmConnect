-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Farm'
-- 
-- ---

DROP TABLE IF EXISTS `Farm`;
		
CREATE TABLE `Farm` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `farmName` VARCHAR(255) UNIQUE DEFAULT NULL,
  `farmLocation` VARCHAR(255) NULL DEFAULT NULL,
  `farmPhone` VARCHAR(12) UNIQUE DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'products'
-- 
-- ---

DROP TABLE IF EXISTS `products`;
		
CREATE TABLE `products` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `productName` VARCHAR(255) UNIQUE DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Post'
-- 
-- ---

DROP TABLE IF EXISTS `Post`;
		
CREATE TABLE `Post` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `id_Farm` INTEGER NULL DEFAULT NULL,
  `id_products` INTEGER NULL DEFAULT NULL,
  `pricePerPound` INTEGER(6) NULL DEFAULT NULL,
  `poundsAvailable` INTEGER(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `Post` ADD FOREIGN KEY (id_Farm) REFERENCES `Farm` (`id`);
ALTER TABLE `Post` ADD FOREIGN KEY (id_products) REFERENCES `products` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Farm` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `products` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Post` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Farm` (`id`,`farmName`,`farmLocation`,`farmPhone`) VALUES
-- ('','','','');
-- INSERT INTO `products` (`id`,`productName`) VALUES
-- ('','');
-- INSERT INTO `Post` (`id`,`id_Farm`,`id_products`,`pricePerPound`,`poundsAvailable`) VALUES
-- ('','','','','');