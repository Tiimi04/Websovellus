const getNowPlaying = async (req, res, next) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_API_KEY}&language=fi-FI`
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

export { getNowPlaying }