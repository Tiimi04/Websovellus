import { Router } from 'express'
import {
  getFavourites,
  addFavourite,
  removeFavourite,
  getListVisibilityUser,
  updateListVisibilityUser,
  getPublicFavourites
} from '../controllers/FavouriteController.js'
import authenticate from '../middleware/auth.js'

const router = Router()

router.get('/public/:userId', getPublicFavourites)
router.get('/visibility', authenticate, getListVisibilityUser)
router.put('/visibility', authenticate, updateListVisibilityUser)
router.get('/', authenticate, getFavourites)
router.post('/', authenticate, addFavourite)
router.delete('/:movieId', authenticate, removeFavourite)

export default router
