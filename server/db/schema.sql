DROP DATABASE IF EXISTS farmdata;

CREATE DATABASE farmdata;

\c farmdata

CREATE TABLE farms (
  id SERIAL PRIMARY KEY,
  -- user_id integer REFERENCES users (id)
  farm_name VARCHAR(50) UNIQUE,
  location VARCHAR(100),
  phone VARCHAR(10)
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(100),
  organic BOOLEAN,
  img VARCHAR(100)
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  farm_id integer REFERENCES farms (id),
  product_id integer REFERENCES products (id),
  price_per_pound decimal(10, 2),
  pounds_available integer
);

CREATE TABLE users (
 id SERIAL PRIMARY KEY,
 email VARCHAR(30) UNIQUE,
 password VARCHAR(255),
 farmer BOOLEAN NOT NULL DEFAULT FALSE
);

