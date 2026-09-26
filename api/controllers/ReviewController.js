import { findByTmdbId } from "../models/Movie.js";
import { getReviewsForMovie, addReview, getAverageRatingForMovie,} from "../models/Review.js";

const getReview = async (req, res, next) => {
    try {
        const { tmdb_id } = req.params;
        const movie = await findByTmdbId(tmdb_id);

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        const reviews = await getReviewsForMovie(movie.id);
        res.json(reviews);
    } catch (error) {
        next(error);
    }
};

const addNewReview = async (req, res, next) => {
    try {
        const { tmdb_id } = req.params;
        const movie = await findByTmdbId(tmdb_id);

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        const { rating, comment } = req.body;
        const user_id = req.user.id;
        const review = await addReview(movie.id, user_id, rating, comment);
        res.status(201).json(review);
    } catch (error) {
        next(error);
    }
};

const getAverageRating = async (req, res, next) => {
    try {
        const {tmdb_id} = req.params
        const movie = await findByTmdbId(tmdb_id)

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" })
        }

        const averageRating = await getAverageRatingForMovie(movie.id)

        res.json({
            average_rating: averageRating
        })
    } catch (error) {
        next(error)
    }
}


    

export { getReview, addNewReview, getAverageRating,};
