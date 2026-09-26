import { getAverageRatingsForMovies} from "../models/Review.js"

const getNowPlaying = async (req, res, next) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_API_KEY}&language=fi-FI&region=FI`
    )

    if (!response.ok) {
      throw new Error('TMDB request failed')
    }

    const data = await response.json()
    console.log("TMDB:", data.results.length)
    const ratings = await getAverageRatingsForMovies(data.results.map(movie => movie.id)
  )
  console.log("RATINGS:", ratings)
  const ratingsMap = new Map(
    ratings.map(rating => [
        String(rating.tmdb_id),
        rating.average_rating
    ])
)
const movies = data.results.map(movie => ({
    ...movie,
    average_rating: ratingsMap.get(String(movie.id)) ?? null
}))

    res.json(movies)
  } catch (error) {
    next(error)
  }
}

const searchMovies = async (req, res, next) => {
    try {
        const query = req.query.query;

        if (!query) {
            return res.json([]);
        }

        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=fi-FI&query=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
            throw new Error("TMDB search failed");
        }

        const data = await response.json();
        const ratings = await getAverageRatingsForMovies(
    data.results.map(movie => movie.id)
)

const ratingsMap = new Map(
    ratings.map(rating => [
        String(rating.tmdb_id),
        rating.average_rating
    ])
)

const movies = data.results.map(movie => ({
    ...movie,
    average_rating: ratingsMap.get(String(movie.id)) ?? null
}))


        res.json(movies);
    } catch (error) {
        next(error);
    }
};

export { getNowPlaying, searchMovies };