import { findOrCreateByTmdbId, findById } from '../models/Movie.js'
import {
  getOrCreateDefaultList,
  addMovieToList,
  removeMovieFromList,
  getMoviesForUser,
  getListVisibility,
  updateListVisibility,
  getPublicListForUser
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

const getListVisibilityUser = async (req, res, next) => {
  try {
    const isPublic = await getListVisibility(req.user.id)
    res.json({ isPublic })
  } catch (error) {
    next(error)
  }
}

const updateListVisibilityUser = async (req, res, next) => {
  try {
    const { isPublic } = req.body
    if (typeof isPublic !== 'boolean') {
      const error = new Error('isPublic-arvon tulee olla totuusarvo')
      error.status = 400
      throw error
    }

    const updated = await updateListVisibility(req.user.id, isPublic)
    res.json({ isPublic: updated.is_public })
  } catch (error) {
    next(error)
  }
}

const getPublicFavourites = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId)
    if (!Number.isInteger(userId) || userId < 1) {
      const error = new Error('Virheellinen käyttäjätunnus')
      error.status = 400
      throw error
    }

    const publicList = await getPublicListForUser(userId)
    res.json(publicList)
  } catch (error) {
    next(error)
  }
}

export {
  getFavourites,
  addFavourite,
  removeFavourite,
  getListVisibilityUser,
  updateListVisibilityUser,
  getPublicFavourites
}
