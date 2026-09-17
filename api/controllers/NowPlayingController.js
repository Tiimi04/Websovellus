const getNowPlaying = async (req, res, next) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_API_KEY}&language=fi-FI&region=FI`
    )

    if (!response.ok) {
      throw new Error('TMDB request failed')
    }

    const data = await response.json()

    res.json(data.results)
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

        res.json(data.results);
    } catch (error) {
        next(error);
    }
};

export { getNowPlaying, searchMovies };