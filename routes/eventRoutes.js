import { Router } from 'express';
import { newPost, likePost } from '../controllers/eventController.js';

const router = Router();
router.post('/post', newPost);
router.post('/like', likePost);
export default router;
