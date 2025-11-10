import express from 'express';
import { getTeams, createTeam, addMember } from '../controllers/teamController.js';
const router = express.Router();
router.route('/').get(getTeams).post(createTeam);
router.route('/:teamId/members').post(addMember);
export default router;
