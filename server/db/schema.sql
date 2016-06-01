DROP DATABASE IF EXISTS farmdata;

CREATE DATABASE farmdata;

\c farmdata

-- Creates the farm table

CREATE TABLE farms (
  id SERIAL PRIMARY KEY,
  farm_name VARCHAR(50) UNIQUE,
  location VARCHAR(100),
  phone VARCHAR(10)
);

--Creates the produce table

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(100)
);

--Creates the post table

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  farm_id integer REFERENCES farm (id),
  produce_id integer REFERENCES produce (id),
<<<<<<< HEAD
  price_per_pound decimal(10, 2),
  pounds_available integer
);

CREATE TABLE users (
 id SERIAL PRIMARY KEY,
 username VARCHAR(30) UNIQUE,
 password VARCHAR(20) UNIQUE,
 farmer BOOLEAN NOT NULL DEFAULT FALSE
);
=======
  pricePerPound decimal(10, 2),
  amountAvailable integer
);

--Creates user table

CREATE TABLE user (
  id SERIAL PRIMARY KEY,
  email VARCHAR(60) UNIQUE,
  password VARCHAR(20) UNIQUE,
  farmer BOOLEAN NOT NULL DEFAULT FALSE
);


>>>>>>> 356002c59b64a7f6f6191de8f379d82a6cb15068
