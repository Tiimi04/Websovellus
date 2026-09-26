import express from 'express';
import { getReview, addNewReview, getAverageRating, } from '../controllers/ReviewController.js';
import authenticate from '../middleware/auth.js';


const router = express.Router();

router.get('/:tmdb_id/reviews', getReview)
router.post('/:tmdb_id/reviews', authenticate, addNewReview)
router.get('/:tmdb_id/reviews/average',getAverageRating)


export default router;