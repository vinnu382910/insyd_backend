import { Router } from 'express';
import { listNotifications, markRead } from '../controllers/notificationController.js';

const router = Router();
router.get('/:userId', listNotifications);
router.patch('/:id/read', markRead);
export default router;
