import { Router } from 'express'
import authenticate from '../middleware/auth.js'
import { createGroup,
        getGroups,
        getGroupMembers,
        deleteGroup,
        joinGroup,
        getDiscoverGroups,
        leaveGroup } from '../controllers/GroupController.js'

const router = Router()

router.get('/', authenticate, getGroups)
router.get('/:groupId/members', authenticate, getGroupMembers)
router.get('/discover', authenticate, getDiscoverGroups)
router.post('/:groupId/join', authenticate, joinGroup)
router.post('/', authenticate, createGroup)
router.delete('/:groupId', authenticate, deleteGroup)
router.delete('/:groupId/leave', authenticate, leaveGroup)

export default router