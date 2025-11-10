import { pool } from '../config/db.js';

export const getAllProjects = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM projects');
    res.json({ success: true, data: rows });
  } catch (err) { next(err); }
};

export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [[project]] = await pool.query('SELECT * FROM projects WHERE id = ?', [id]);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (err) { next(err); }
};

export const createProject = async (req, res, next) => {
  try {
    const { name, description, team_id, start_date, end_date, parent_id } = req.body;
    const [result] = await pool.query(
      'INSERT INTO projects (name, description, team_id, start_date, end_date, parent_id) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, team_id || null, start_date || null, end_date || null, parent_id || null]
    );
    res.status(201).json({ success: true, id: result.insertId });
  } catch (err) { next(err); }
};

export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const fields = req.body;
    const sets = Object.keys(fields).map(k => `${k} = ?`).join(', ');
    const values = Object.values(fields);
    if (!sets) return res.status(400).json({ success: false, message: 'No fields to update' });
    await pool.query(`UPDATE projects SET ${sets} WHERE id = ?`, [...values, id]);
    res.json({ success: true, message: 'Updated' });
  } catch (err) { next(err); }
};

export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM projects WHERE id = ?', [id]);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
};
