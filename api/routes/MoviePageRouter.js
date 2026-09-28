import express from 'express'
import { getMovie } from '../controllers/MoviePageController.js'

const router = express.Router()

router.get('/:id', getMovie)

export default router