import { Router } from 'express'
import { getFavourites, addFavourite, removeFavourite } from '../controllers/FavouriteController.js'
import authenticate from '../middleware/auth.js'

const router = Router()

router.get('/', authenticate, getFavourites)
router.post('/', authenticate, addFavourite)
router.delete('/:movieId', authenticate, removeFavourite)

export default router
