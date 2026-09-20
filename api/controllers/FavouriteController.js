import { findOrCreateByTmdbId, findById } from '../models/Movie.js'
import {
  getOrCreateDefaultList,
  addMovieToList,
  removeMovieFromList,
  getMoviesForUser
} from '../models/FavouriteList.js'

const getFavourites = async (req, res, next) => {
  try {
    const movies = await getMoviesForUser(req.user.id)
    res.json(movies)
  } catch (error) {
    next(error)
  }
}

const addFavourite = async (req, res, next) => {
  try {
    const { tmdbId, title, posterPath, releaseDate } = req.body

    if (!tmdbId || !title) {
      const error = new Error('tmdbId ja title vaaditaan')
      error.status = 400
      throw error
    }

    const movie = await findOrCreateByTmdbId({ tmdbId, title, posterPath, releaseDate })
    const list = await getOrCreateDefaultList(req.user.id)
    await addMovieToList(list.id, movie.id)

    res.status(201).json({ movie })
  } catch (error) {
    next(error)
  }
}

const removeFavourite = async (req, res, next) => {
  try {
    const { movieId } = req.params

    const movie = await findById(movieId)
    if (!movie) {
      const error = new Error('Elokuvaa ei löytynyt')
      error.status = 404
      throw error
    }

    const list = await getOrCreateDefaultList(req.user.id)
    await removeMovieFromList(list.id, movieId)

    res.status(200).json({ message: 'Elokuva poistettu suosikeista' })
  } catch (error) {
    next(error)
  }
}

export { getFavourites, addFavourite, removeFavourite }
