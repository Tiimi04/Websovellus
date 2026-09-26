import { pool } from './db.js'

const getReviewsForMovie = async (movieId) => {
    const result = await pool.query(
        `SELECT *
        FROM reviews
        WHERE movie_id = $1
        ORDER BY created_at DESC`,
        [movieId]
    )
    return result.rows
}

const addReview = async (movieId, userId, rating, comment) => {
    const result = await pool.query(
        `INSERT INTO reviews (movie_id, user_id, rating, review_text, created_at)
        VALUES ($1, $2, $3, $4, NOW())
        RETURNING *`,
        [movieId, userId, rating, comment]
    )
    return result.rows[0]
}

const getAverageRatingForMovie = async (movieId) => {
    const result = await pool.query(
        `SELECT AVG(rating) AS average_rating
         FROM reviews
         WHERE movie_id = $1`,
        [movieId]
    )

    return result.rows[0].average_rating
}

const getAverageRatingsForMovies = async (tmdbIds) => {
    const result = await pool.query(
        `SELECT movies.tmdb_id, AVG(reviews.rating) AS average_rating
         FROM movies
         LEFT JOIN reviews ON reviews.movie_id = movies.id
         WHERE movies.tmdb_id = ANY($1)
         GROUP BY movies.tmdb_id`,
        [tmdbIds]
    )

    return result.rows
}


export { getReviewsForMovie, addReview, getAverageRatingForMovie, getAverageRatingsForMovies}