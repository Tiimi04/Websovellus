-- Luodaan taulut -- 
DROP TABLE IF EXISTS group_movies;
DROP TABLE IF EXISTS group_members;
DROP TABLE IF EXISTS join_requests;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS favourite_list_movies;
DROP TABLE IF EXISTS favourite_list;
DROP TABLE IF EXISTS groups;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(45) NOT NULL UNIQUE,
  email VARCHAR(45) NOT NULL UNIQUE,
  password_hash VARCHAR(250) NOT NULL,
  profile_image VARCHAR(45) NULL
);

CREATE TABLE groups (
  id SERIAL PRIMARY KEY,
  name VARCHAR(250) NOT NULL,
  owner_id INT NOT NULL REFERENCES users(id),
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  tmdb_id INT NOT NULL,
  title VARCHAR(45) NOT NULL,
  category_type VARCHAR(45) NOT NULL
);

CREATE TABLE favourite_list (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  list_name VARCHAR(45) NOT NULL,
  is_public BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE group_members (
  group_id INT NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  joined_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(
    group_id,
    user_id
  )
);

CREATE TABLE group_movies (
  group_id INT NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  movie_id INT NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
  added_by INT NULL REFERENCES users(id),
  added_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (group_id, movie_id)
);

CREATE TABLE join_requests (
  id SERIAL PRIMARY KEY,
  group_id INT NOT NULL
    REFERENCES groups(id) ON DELETE CASCADE,
  user_id INT NOT NULL
    REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(45) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id),
  movie_id INT NOT NULL REFERENCES movies(id),
  rating SMALLINT NOT NULL,
  review_text VARCHAR(250) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- liitostaulu --
CREATE TABLE favourite_list_movies (
  favourite_list_id INT NULL
    REFERENCES favourite_list(id) ON DELETE CASCADE,
  movie_id INT NULL
    REFERENCES movies(id) ON DELETE CASCADE,
  added_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(
  favourite_list_id,
  movie_id
  )
  );
