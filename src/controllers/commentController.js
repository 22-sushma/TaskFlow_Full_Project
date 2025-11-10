import { pool } from '../config/db.js';

export const addComment = async (req, res, next) => {
  try {
    const { task_id, user_id, content, parent_id } = req.body;
    const [result] = await pool.query(
      'INSERT INTO comments (task_id, user_id, content, parent_id) VALUES (?, ?, ?, ?)',
      [task_id, user_id, content, parent_id || null]
    );
    res.status(201).json({ success: true, id: result.insertId });
  } catch (err) { next(err); }
};

export const getCommentsForTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const [rows] = await pool.query('SELECT * FROM comments WHERE task_id = ? ORDER BY created_at ASC', [taskId]);
    res.json({ success: true, data: rows });
  } catch (err) { next(err); }
};
