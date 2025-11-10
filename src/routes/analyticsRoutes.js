import express from 'express';
import { projectProgress, teamProductivity } from '../controllers/analyticsController.js';
const router = express.Router();
router.get('/project/:projectId/progress', projectProgress);
router.get('/team/:teamId/productivity', teamProductivity);
export default router;
