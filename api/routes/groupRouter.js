import { Router } from 'express'
import authenticate from '../middleware/auth.js'
import { createGroup,
        getGroups,
        getGroupMembers,
        deleteGroup,
        updateGroup,
        joinRequest,
        getDiscoverGroups,
        leaveGroup,
        getGroupMovies,
        addMember,
        rejectRequest,
        getRequests
        } from '../controllers/GroupController.js'

const router = Router()

router.get('/', authenticate, getGroups)
router.get('/:groupId/members', authenticate, getGroupMembers)
router.get('/:groupId/movies', authenticate, getGroupMovies)
router.get('/discover', authenticate, getDiscoverGroups)
router.get('/:groupId/requests', authenticate, getRequests)
router.post('/:groupId/join', authenticate, joinRequest)
router.post('/', authenticate, createGroup)
router.post('/:groupId/requests/:requestId/accept', authenticate, addMember)
router.put('/:groupId', authenticate, updateGroup)
router.patch('/:groupId/requests/:requestId/reject', authenticate, rejectRequest)
router.delete('/:groupId', authenticate, deleteGroup)
router.delete('/:groupId/leave', authenticate, leaveGroup)

export default router