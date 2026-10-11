import { pool } from './db.js'

const findByTmdbId = async (tmdbId) => {
  const result = await pool.query('SELECT * FROM movies WHERE tmdb_id = $1', [tmdbId])
  return result.rows[0]
}

const createMovie = async ({ tmdbId, title, categoryType, posterPath, releaseDate }) => {
  const result = await pool.query(
    `INSERT INTO movies (tmdb_id, title, category_type, poster_path, release_date)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [tmdbId, title, categoryType, posterPath || null, releaseDate || null]
  )
  return result.rows[0]
}

// Palauttaa olemassa olevan elokuvan tai luo uuden rivin, jos tmdb_id:tä ei löydy vielä kannasta
const findOrCreateByTmdbId = async ({ tmdbId, title, categoryType = 'favourite', posterPath, releaseDate }) => {
  const existing = await findByTmdbId(tmdbId)
  if (existing) {
    return existing
  }
  return createMovie({ tmdbId, title, categoryType, posterPath, releaseDate })
}

const findById = async (id) => {
  const result = await pool.query('SELECT * FROM movies WHERE id = $1', [id])
  return result.rows[0]
}

const topRatedMovies = async (limit = 5) => {
  const result = await pool.query(
    `SELECT m.tmdb_id,
    m.title,
    m.poster_path,
    m.release_date,
    AVG(r.rating) AS average_rating
     FROM movies m
     JOIN reviews r ON m.id = r.movie_id
     GROUP BY m.id
     ORDER BY average_rating DESC
     LIMIT $1`,
    [limit]
  )
  return result.rows
}

export { findByTmdbId, createMovie, findOrCreateByTmdbId, findById, topRatedMovies }
