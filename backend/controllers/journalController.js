import { db } from "../db.js";

// GET all journals for the authenticated user
export const getJournals = (req, res) => {
  const q = `
    SELECT id, title, content, created_at, uid
    FROM journals
    WHERE uid = ?
    ORDER BY created_at DESC
  `;

  db.query(q, [req.user.id], (err, data) => {
    if (err) {
      console.error("SQL error (getJournals):", err.sqlMessage);
      return res.status(500).json({ error: err.sqlMessage });
    }
    return res.status(200).json(data);
  });
};

// GET a specific journal (only if it belongs to the user)
export const getJournal = (req, res) => {
  const q = `
    SELECT id, title, content, created_at, uid
    FROM journals
    WHERE id = ? AND uid = ?
  `;

  db.query(q, [req.params.id, req.user.id], (err, data) => {
    if (err) {
      console.error("SQL error (getJournal):", err.sqlMessage);
      return res.status(500).json({ error: err.sqlMessage });
    }
    if (data.length === 0)
      return res.status(404).json("Journal entry not found or unauthorized.");
    return res.status(200).json(data[0]);
  });
};

// POST a new journal
export const addJournal = (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json("Title and content cannot be empty.");
  }

  const q = `
    INSERT INTO journals (title, content, created_at, uid)
    VALUES (?, ?, NOW(), ?)
  `;

  const values = [title, content, req.user.id];

  db.query(q, values, (err) => {
    if (err) {
      console.error("SQL error (addJournal):", err.sqlMessage);
      return res.status(500).json({ error: err.sqlMessage });
    }
    return res.status(200).json("Journal entry created successfully.");
  });
};

// PUT update a journal entry
export const updateJournal = (req, res) => {
  const journalId = req.params.id;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json("Title and content cannot be empty.");
  }

  const q = `
    UPDATE journals
    SET title = ?, content = ?
    WHERE id = ? AND uid = ?
  `;

  const values = [title, content, journalId, req.user.id];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error("SQL error (updateJournal):", err.sqlMessage);
      return res.status(500).json({ error: err.sqlMessage });
    }
    if (data.affectedRows === 0) {
      return res
        .status(403)
        .json("Cannot edit: journal not found or not owned by user.");
    }
    return res.status(200).json("Journal entry updated successfully.");
  });
};

// DELETE a journal entry
export const deleteJournal = (req, res) => {
  const journalId = req.params.id;

  const q = `
    DELETE FROM journals
    WHERE id = ? AND uid = ?
  `;

  db.query(q, [journalId, req.user.id], (err, data) => {
    if (err) {
      console.error("SQL error (deleteJournal):", err.sqlMessage);
      return res.status(500).json({ error: err.sqlMessage });
    }
    if (data.affectedRows === 0) {
      return res
        .status(403)
        .json("Cannot delete: journal not found or not owned by user.");
    }
    return res.status(200).json("Journal entry deleted successfully.");
  });
};
