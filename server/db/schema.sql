DROP DATABASE IF EXISTS farmdata;

CREATE DATABASE farmdata;

\c farmdata

-- Creates the farm table

CREATE TABLE farm (
  id SERIAL PRIMARY KEY,
  farm_name VARCHAR(50) UNIQUE,
  location VARCHAR(100),
  phone VARCHAR(10)
);

--Creates the produce table

CREATE TABLE produce (
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(100)
);

--Creates the post table

CREATE TABLE post (
  id SERIAL PRIMARY KEY,
  farm_id integer REFERENCES farm (id),
  produce_id integer REFERENCES produce (id),
  price_per_pound decimal(10, 2),
  pounds_available integer
);