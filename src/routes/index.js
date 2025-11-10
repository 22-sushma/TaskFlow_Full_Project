import express from 'express';
import projectRoutes from './projectRoutes.js';
import taskRoutes from './taskRoutes.js';
import teamRoutes from './teamRoutes.js';
import commentRoutes from './commentRoutes.js';
import analyticsRoutes from './analyticsRoutes.js';

const router = express.Router();
router.use('/projects', projectRoutes);
router.use('/tasks', taskRoutes);
router.use('/teams', teamRoutes);
router.use('/comments', commentRoutes);
router.use('/analytics', analyticsRoutes);
export default router;
