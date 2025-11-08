import { Router } from 'express';
import { createApplication, listApplications } from '../controllers/applications.controller';

const router = Router();

// GET /api/applications/ - list recent applications (admin/dev)
router.get('/', listApplications);

// POST /api/applications/ - create new application
router.post('/', createApplication);

export default router;
