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
    `SELECT m.id, m.tmdb_id, m.title, m.poster_path, m.release_date, flm.added_at, AVG(r.rating) AS average_rating
     FROM favourite_list fl
     JOIN favourite_list_movies flm ON flm.favourite_list_id = fl.id
     JOIN movies m ON m.id = flm.movie_id
     LEFT JOIN reviews r ON r.movie_id = m.id
     WHERE fl.user_id = $1
     GROUP BY
        m.id,
        m.tmdb_id,
        m.title,
        m.poster_path,
        m.release_date,
        flm.added_at
     ORDER BY flm.added_at DESC`,
    [userId]
  )
  return result.rows
}

const getListVisibility = async (userId) => {
  const result = await pool.query(
    `SELECT is_public
     FROM favourite_list
     WHERE user_id = $1
     ORDER BY id ASC
     LIMIT 1`,
    [userId]
  )
  return result.rows[0]?.is_public ?? false
}

const updateListVisibility = async (userId, isPublic) => {
  const list = await getOrCreateDefaultList(userId)
  const result = await pool.query(
    `UPDATE favourite_list
     SET is_public = $1
     WHERE id = $2
     RETURNING is_public`,
    [isPublic, list.id]
  )
  return result.rows[0]
}

const getPublicListForUser = async (userId) => {
  const result = await pool.query(
    `SELECT fl.is_public, m.id, m.tmdb_id, m.title, m.poster_path, m.release_date,
            flm.added_at, AVG(r.rating) AS average_rating
     FROM (
       SELECT id, is_public
       FROM favourite_list
       WHERE user_id = $1
       ORDER BY id ASC
       LIMIT 1
     ) fl
     LEFT JOIN favourite_list_movies flm
       ON flm.favourite_list_id = fl.id AND fl.is_public = TRUE
     LEFT JOIN movies m ON m.id = flm.movie_id
     LEFT JOIN reviews r ON r.movie_id = m.id
     GROUP BY fl.id, fl.is_public, m.id, flm.added_at
     ORDER BY flm.added_at DESC`,
    [userId]
  )
  return {
    isPublic: result.rows[0]?.is_public ?? false,
    movies: result.rows.filter((row) => row.id !== null)
  }
}

export {
  getOrCreateDefaultList,
  addMovieToList,
  removeMovieFromList,
  getMoviesForUser,
  getListVisibility,
  updateListVisibility,
  getPublicListForUser
}
