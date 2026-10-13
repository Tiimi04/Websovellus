import { Router } from 'express'
import authenticate from '../middleware/auth.js'
import { createGroup,
        getGroups,
        getGroupMembers,
        deleteGroup,
        updateGroup,
        joinGroup,
        getDiscoverGroups,
        leaveGroup,
        getGroupMovies
        } from '../controllers/GroupController.js'

const router = Router()

router.get('/', authenticate, getGroups)
router.get('/:groupId/members', authenticate, getGroupMembers)
router.get('/:groupId/movies', authenticate, getGroupMovies)
router.get('/discover', authenticate, getDiscoverGroups)
router.post('/:groupId/join', authenticate, joinGroup)
router.post('/', authenticate, createGroup)
router.delete('/:groupId', authenticate, deleteGroup)
router.put('/:groupId', authenticate, updateGroup)
router.delete('/:groupId/leave', authenticate, leaveGroup)

export default router