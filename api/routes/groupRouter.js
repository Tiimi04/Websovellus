import { Router } from 'express'
import authenticate from '../middleware/auth.js'
import { createGroup, getGroups, getGroupMembers, deleteGroup } from '../controllers/GroupController.js'

const router = Router()

router.get('/', authenticate, getGroups)
router.get('/:groupId/members', authenticate, getGroupMembers)
router.post('/', authenticate, createGroup)
router.delete('/:groupId', authenticate, deleteGroup)

export default router