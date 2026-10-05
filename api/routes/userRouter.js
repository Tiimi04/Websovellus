import { Router } from 'express'
import { search, getPublicById } from '../controllers/UserController.js'

const router = Router()

router.get('/search', search)
router.get('/:id', getPublicById)

export default router
