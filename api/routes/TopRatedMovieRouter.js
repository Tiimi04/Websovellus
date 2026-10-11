import express from 'express'
import { getTopRatedMoviesController } from '../controllers/TopRatedMovieController.js'

const router = express.Router()

router.get('/', getTopRatedMoviesController)

export default router