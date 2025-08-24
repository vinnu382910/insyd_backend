import { Router } from 'express';
import { followUser } from '../controllers/followController.js';

const router = Router();
router.post('/', followUser);
export default router;
