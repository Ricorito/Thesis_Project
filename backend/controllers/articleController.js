import { db } from "../db.js";

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM articles WHERE cat=?"
    : "SELECT * FROM articles";
  db.query(q, [req.query.cat], (err, data) => {
    if (err) {
      console.error("SQL error:", err.message);
      return res.status(500).send(err);
    }
    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const q = `
    SELECT p.id, username, title, \`desc\`, p.img, u.img AS userImg, cat, date
    FROM users u
    JOIN articles p ON u.id = p.uid
    WHERE p.id = ?
  `;

  db.query(q, [req.params.id], (err, data) => {
    if (err) {
      console.error("SQL error:", err.message);
      return res.status(500).json(err);
    }
    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
  const q = `
    INSERT INTO articles (title, \`desc\`, img, cat, date, uid)
    VALUES (?)
  `;

  const values = [
    req.body.title,
    req.body.desc,
    req.body.img,
    req.body.cat,
    req.body.date,
    req.user.id,
  ];

  db.query(q, [values], (err, data) => {
    if (err) {
      console.error("SQL error:", err.message);
      return res.status(500).json(err);
    }
    return res.json("Post has been created.");
  });
};

export const deletePost = (req, res) => {
  const postId = req.params.id;
  const q = "DELETE FROM articles WHERE id = ? AND uid = ?";

  db.query(q, [postId, req.user.id], (err, data) => {
    if (err) {
      console.error("SQL error:", err.message);
      return res.status(500).json("Error deleting article.");
    }
    if (data.affectedRows === 0) {
      return res.status(403).json("You can only delete your own article, or the article does not exist!");
    }
    return res.json("Article has been deleted!");
  });
};

export const updatePost = (req, res) => {
  const postId = req.params.id;
  const q = `
    UPDATE articles
    SET title = ?, \`desc\` = ?, img = ?, cat = ?
    WHERE id = ? AND uid = ?
  `;

  const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

  db.query(q, [...values, postId, req.user.id], (err, data) => {
    if (err) {
      console.error("SQL error:", err.message);
      return res.status(500).json(err);
    }
    if (data.affectedRows === 0) {
      return res.status(403).json("You can only update your own article, or the article does not exist!");
    }
    return res.json("Post has been updated.");
  });
};
