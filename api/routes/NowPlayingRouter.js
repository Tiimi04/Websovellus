import express from 'express'
import { getNowPlaying,searchMovies } from '../controllers/NowPlayingController.js'

const router = express.Router()

router.get('/', getNowPlaying)
router.get('/search', searchMovies)

export default router