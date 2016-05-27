DROP DATABASE IF EXISTS farmData;

CREATE DATABASE farmData;

USE farmData;


-- Creates the Farm table --

DROP TABLE IF EXISTS Farm;
		
CREATE TABLE `Farm` (
  id INTEGER NULL SERIAL DEFAULT NULL PRIMARY KEY,
  farmName VARCHAR(255) UNIQUE DEFAULT NULL,
  farmLocation VARCHAR(255) NULL DEFAULT NULL,
  farmPhone VARCHAR(10) UNIQUE DEFAULT NULL
);

-- Creates the product table --

DROP TABLE IF EXISTS `products`;
		
CREATE TABLE `products` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL PRIMARY KEY ,
  `productName` VARCHAR(255) UNIQUE DEFAULT NULL
);


-- Creates the Post table --

DROP TABLE IF EXISTS `Post`;
		
CREATE TABLE `Post` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL PRIMARY KEY,
  `id_Farm` integer REFERENCES Farm,
  `id_products` integer REFERENCES products,
  `pricePerPound` INTEGER(6) NULL DEFAULT NULL,
  `poundsAvailable` INTEGER(6) NULL DEFAULT NULL
); 

