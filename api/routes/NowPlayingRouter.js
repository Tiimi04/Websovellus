import express from 'express'
import { getNowPlaying } from '../controllers/NowPlayingController.js'

const router = express.Router()

router.get('/', getNowPlaying)

export default router