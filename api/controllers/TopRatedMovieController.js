import { topRatedMovies } from '../models/Movie.js';

const getTopRatedMoviesController = async (req, res, next) => {
    try {
        console.log('TOP RATED CONTROLLER START');

        const { limit } = req.query;
        console.log('LIMIT:', limit);

        const movies = await topRatedMovies(
            limit ? parseInt(limit) : 5
        );

        console.log('TOP RATED MOVIES:', movies);

        res.json(movies);
    } catch (error) {
        console.error('TOP RATED ERROR:', error);
        next(error);
    }
};

export { getTopRatedMoviesController };