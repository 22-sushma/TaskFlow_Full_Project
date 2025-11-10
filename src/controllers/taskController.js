import { pool } from '../config/db.js';

export const getTasks = async (req, res, next) => {
  try {
    const { project_id } = req.query;
    const q = project_id ? 'WHERE project_id = ?' : '';
    const params = project_id ? [project_id] : [];
    const [rows] = await pool.query(`SELECT * FROM tasks ${q}`, params);
    res.json({ success: true, data: rows });
  } catch (err) { next(err); }
};

export const createTask = async (req, res, next) => {
  try {
    const { title, description, project_id, priority, status, assignees, due_date } = req.body;
    const [result] = await pool.query(
      'INSERT INTO tasks (title, description, project_id, priority, status, due_date) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, project_id, priority || 'medium', status || 'todo', due_date || null]
    );
    const taskId = result.insertId;
    // handle many-to-many assignees
    if (Array.isArray(assignees) && assignees.length) {
      const values = assignees.map(a => [taskId, a]);
      await pool.query('INSERT INTO task_assignees (task_id, user_id) VALUES ?', [values]);
    }
    res.status(201).json({ success: true, id: taskId });
  } catch (err) { next(err); }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const fields = req.body;
    const sets = Object.keys(fields).map(k => `${k} = ?`).join(', ');
    const values = Object.values(fields);
    if (sets) await pool.query(`UPDATE tasks SET ${sets} WHERE id = ?`, [...values, id]);
    // update assignees if provided
    if (fields.assignees) {
      await pool.query('DELETE FROM task_assignees WHERE task_id = ?', [id]);
      const values2 = fields.assignees.map(a => [id, a]);
      if (values2.length) await pool.query('INSERT INTO task_assignees (task_id, user_id) VALUES ?', [values2]);
    }
    res.json({ success: true, message: 'Task updated' });
  } catch (err) { next(err); }
};

export const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [[task]] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    const [assignees] = await pool.query(
      'SELECT u.id, u.name, u.email FROM users u JOIN task_assignees ta ON ta.user_id = u.id WHERE ta.task_id = ?',
      [id]
    );
    task.assignees = assignees;
    res.json({ success: true, data: task });
  } catch (err) { next(err); }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
};
