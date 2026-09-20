import { pool } from './db.js'

const DEFAULT_LIST_NAME = 'Suosikit'

// Hakee käyttäjän ensimmäisen suosikkilistan tai luo sen "lennossa", jos sitä ei vielä ole
const getOrCreateDefaultList = async (userId) => {
  const existing = await pool.query(
    'SELECT * FROM favourite_list WHERE user_id = $1 ORDER BY id ASC LIMIT 1',
    [userId]
  )
  if (existing.rows[0]) {
    return existing.rows[0]
  }

  const created = await pool.query(
    `INSERT INTO favourite_list (user_id, list_name)
     VALUES ($1, $2)
     RETURNING *`,
    [userId, DEFAULT_LIST_NAME]
  )
  return created.rows[0]
}

const addMovieToList = async (listId, movieId) => {
  const result = await pool.query(
    `INSERT INTO favourite_list_movies (favourite_list_id, movie_id)
     VALUES ($1, $2)
     ON CONFLICT (favourite_list_id, movie_id) DO NOTHING
     RETURNING *`,
    [listId, movieId]
  )
  return result.rows[0]
}

const removeMovieFromList = async (listId, movieId) => {
  const result = await pool.query(
    `DELETE FROM favourite_list_movies
     WHERE favourite_list_id = $1 AND movie_id = $2
     RETURNING *`,
    [listId, movieId]
  )
  return result.rows[0]
}

// Palauttaa käyttäjän suosikkilistan elokuvat yhdistettynä movies-tauluun
const getMoviesForUser = async (userId) => {
  const result = await pool.query(
    `SELECT m.id, m.tmdb_id, m.title, m.poster_path, m.release_date, flm.added_at
     FROM favourite_list fl
     JOIN favourite_list_movies flm ON flm.favourite_list_id = fl.id
     JOIN movies m ON m.id = flm.movie_id
     WHERE fl.user_id = $1
     ORDER BY flm.added_at DESC`,
    [userId]
  )
  return result.rows
}

export { getOrCreateDefaultList, addMovieToList, removeMovieFromList, getMoviesForUser }
