const getMovie = async (req, res, next) => {
    try {
        const { id } = req.params


        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=fi-FI`
        )

        if (!response.ok) {
            throw new Error('TMDB movie request failed')
        }

        const data = await response.json()

        res.json(data)
    } catch (error) {
        next(error)
    }
}

export { getMovie }