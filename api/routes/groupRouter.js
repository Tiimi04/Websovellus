import { Router } from 'express'
import authenticate from '../middleware/auth.js'
import { createGroup, getGroups, deleteGroup } from '../controllers/GroupController.js'

const router = Router()

router.get('/', authenticate, getGroups)
router.post('/', authenticate, createGroup)
router.delete('/:groupId', authenticate, deleteGroup)

export default router