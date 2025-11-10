import { pool } from "../config/db.js";

export const getTeams = async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT * FROM teams");
    res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
};

export const createTeam = async (req, res, next) => {
  try {
    const { name, description, members } = req.body;
    const [result] = await pool.query(
      "INSERT INTO teams (name, description) VALUES (?, ?)",
      [name, description || null]
    );
    const teamId = result.insertId;
    if (Array.isArray(members) && members.length) {
      const values = members.map((m) => [teamId, m.user_id || m, "member"]);
      await pool.query(
        "INSERT INTO team_members (team_id, user_id, role) VALUES ?",
        [values]
      );
    }

    res.status(201).json({ success: true, id: teamId });
  } catch (err) {
    next(err);
  }
};

export const addMember = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const { user_id, role } = req.body;
    await pool.query(
      "INSERT INTO team_members (team_id, user_id, role) VALUES (?, ?, ?)",
      [teamId, user_id, role || "member"]
    );
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
