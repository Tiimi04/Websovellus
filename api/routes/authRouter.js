import { Router } from 'express'
import { register, login, deleteAccount, selectProfileImage } from '../controllers/AuthController.js'
import authenticate from '../middleware/auth.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.delete('/account', deleteAccount)
router.put('/profile-image', authenticate, selectProfileImage)

export default router
