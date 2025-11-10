import { pool } from '../config/db.js';

export const projectProgress = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const [rows] = await pool.query(
      `SELECT status, COUNT(*) as count FROM tasks WHERE project_id = ? GROUP BY status`,
      [projectId]
    );
    res.json({ success: true, data: rows });
  } catch (err) { next(err); }
};

export const teamProductivity = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const [rows] = await pool.query(
      `SELECT u.id, u.name, COUNT(t.id) as tasks_completed FROM users u
       LEFT JOIN task_assignees ta ON ta.user_id = u.id
       LEFT JOIN tasks t ON t.id = ta.task_id AND t.status = 'done'
       WHERE u.id IN (SELECT user_id FROM team_members WHERE team_id = ?)
       GROUP BY u.id`,
      [teamId]
    );
    res.json({ success: true, data: rows });
  } catch (err) { next(err); }
};
