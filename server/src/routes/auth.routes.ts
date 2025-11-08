import { Router } from 'express';
import { signup, login, profile } from '../controllers/auth.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', requireAuth, profile);

export default router;