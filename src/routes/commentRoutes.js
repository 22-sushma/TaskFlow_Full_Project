import express from 'express';
import { addComment, getCommentsForTask } from '../controllers/commentController.js';
const router = express.Router();
router.post('/', addComment);
router.get('/task/:taskId', getCommentsForTask);
export default router;
