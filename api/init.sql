-- Database is automatically created from POSTGRES_DB environment variable
-- No need to create database manually since PostgreSQL container handles this

DROP TABLE IF EXISTS test;

CREATE TABLE test (
    id SERIAL PRIMARY KEY,
    description TEXT
);

INSERT INTO test (description) VALUES ('bar'), ('baz'), ('qux');

-- Users table for registration / login (see api/db.sql for the full schema)
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(45) NOT NULL UNIQUE,
  email VARCHAR(45) NOT NULL UNIQUE,
  password_hash VARCHAR(250) NOT NULL,
  profile_image VARCHAR(45) NULL
);