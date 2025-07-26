import { db } from "../db.js"
import dotenv from "dotenv"
dotenv.config()

export const createCommunityPost = (req, res) => {
  const { category, title, content } = req.body;
  const user = req.user;

  const q = "INSERT INTO community_posts (user_id, category, title, content) VALUES (?, ?, ?, ?)";
  db.query(q, [user.id, category, title, content], (err, data) => {
    if (err) return res.status(500).json("Failed to create post");

    const getPostQuery = `
      SELECT p.*, u.username,
        (SELECT COUNT(*) FROM community_post_upvotes WHERE post_id = p.id) AS upvoteCount,
        (SELECT COUNT(*) FROM community_comments WHERE post_id = p.id) AS commentCount,
        EXISTS (
          SELECT 1 FROM community_post_upvotes WHERE user_id = ? AND post_id = p.id
        ) AS isUpvoted
      FROM community_posts p
      JOIN users u ON p.user_id = u.id
      WHERE p.id = ?
    `;
    db.query(getPostQuery, [user.id, data.insertId], (err2, postResult) => {
      if (err2 || !postResult.length) {
        return res.status(500).json("Post created but failed to fetch full data");
      }
      res.status(201).json(postResult[0]);
    });
  });
};

export const getSingleCommunityPost = (req, res) => {
  const user = req.user;
  const postId = req.params.id;

  const q = `
    SELECT p.*, u.username,
      (SELECT COUNT(*) FROM community_post_upvotes WHERE post_id = p.id) AS upvotes,
      (SELECT COUNT(*) FROM community_comments WHERE post_id = p.id) AS commentCount,
      EXISTS (
        SELECT 1 FROM community_post_upvotes 
        WHERE post_id = p.id AND user_id = ?
      ) AS isUpvoted
    FROM community_posts p
    JOIN users u ON p.user_id = u.id
    WHERE p.id = ?
  `;

  db.query(q, [user.id, postId], (err, data) => {
    if (err) return res.status(500).json("Couldn't load post");
    if (!data.length) return res.status(404).json("Post not found");
    res.status(200).json(data[0]);
  });
};

export const getCommunityPosts = (req, res) => {
  const user = req.user;
  const { category, sort, offset = 0, limit = 10 } = req.query;

  let q = `
    SELECT p.*, u.username,
      EXISTS (SELECT 1 FROM community_post_upvotes WHERE user_id=? AND post_id=p.id) AS isUpvoted,
      (SELECT COUNT(*) FROM community_post_upvotes WHERE post_id=p.id) AS upvoteCount,
      (SELECT COUNT(*) FROM community_comments WHERE post_id=p.id) AS commentCount
    FROM community_posts p
    JOIN users u ON p.user_id = u.id
  `;
  const params = [user.id];

  if (category && category !== "all") {
    q += " WHERE p.category = ?";
    params.push(category);
  }

  q += sort === "trending" ? " ORDER BY upvoteCount DESC" : " ORDER BY p.id DESC";
  q += " LIMIT ? OFFSET ?";
  params.push(Number(limit), Number(offset));

  db.query(q, params, (err, data) => {
    if (err) return res.status(500).json("Couldn't load posts");
    res.status(200).json(data);
  });
};

export const updateCommunityPost = (req, res) => {
  const user = req.user;
  const { title, content, category } = req.body;

  db.query("SELECT user_id FROM community_posts WHERE id = ?", [req.params.id], (err, data) => {
    if (err || !data.length) return res.status(404).json("Post not found");

    if (data[0].user_id !== user.id && user.role !== "admin") {
      return res.status(403).json("Access denied");
    }

    const q = "UPDATE community_posts SET title=?, content=?, category=? WHERE id=?";
    db.query(q, [title, content, category, req.params.id], err => {
      if (err) return res.status(500).json("Update failed");
      res.status(200).json("Post updated");
    });
  });
};

export const deleteCommunityPost = (req, res) => {
  const user = req.user;

  db.query("SELECT user_id FROM community_posts WHERE id = ?", [req.params.id], (err, data) => {
    if (err || !data.length) return res.status(404).json("Post not found");
    if (data[0].user_id !== user.id && user.role !== "admin") return res.status(403).json("Access denied");

    db.query("DELETE FROM community_posts WHERE id = ?", [req.params.id], err => {
      if (err) return res.status(500).json("Delete failed");
      res.status(200).json("Post deleted");
    });
  });
};

export const upvoteCommunityPost = (req, res) => {
  const user = req.user;

  const q = "INSERT INTO community_post_upvotes (user_id, post_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE id=id";
  db.query(q, [user.id, req.params.id], err => {
    if (err) return res.status(500).json("Upvote failed");
    res.status(200).json("Post upvoted");
  });
};

export const downvoteCommunityPost = (req, res) => {
  const user = req.user;

  const q = "DELETE FROM community_post_upvotes WHERE user_id = ? AND post_id = ?";
  db.query(q, [user.id, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to remove upvote" });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Upvote not found" });
    }

    res.status(200).json({ success: true, message: "Upvote removed" });
  });
};

export const reportCommunityPost = (req, res) => {
  const user = req.user;
  const { reason } = req.body;

  const q = "INSERT INTO community_post_reports (user_id, post_id, reason) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE reason=VALUES(reason)";
  db.query(q, [user.id, req.params.id, reason], err => {
    if (err) return res.status(500).json("Report failed");
    res.status(200).json("Post reported");
  });
};

export const addCommunityComment = (req, res) => {
  const user = req.user;
  const { content, parent_comment_id = null } = req.body;

  const q = "INSERT INTO community_comments (post_id, user_id, content, parent_comment_id) VALUES (?, ?, ?, ?)";
  db.query(q, [req.params.id, user.id, content, parent_comment_id], (err, result) => {
    if (err) return res.status(500).json("Comment failed");
    res.status(201).json({ commentId: result.insertId });
  });
};

export const updateCommunityComment = (req, res) => {
  const user = req.user;
  const { content } = req.body;

  db.query("SELECT user_id FROM community_comments WHERE id = ?", [req.params.commentId], (err, data) => {
    if (err || !data.length) return res.status(404).json("Comment not found");
    if (data[0].user_id !== user.id && user.role !== "admin") return res.status(403).json("Access denied");

    db.query("UPDATE community_comments SET content=? WHERE id=?", [content, req.params.commentId], err => {
      if (err) return res.status(500).json("Update failed");
      res.status(200).json("Comment updated");
    });
  });
};

export const deleteCommunityComment = (req, res) => {
  const user = req.user;

  db.query("SELECT user_id FROM community_comments WHERE id = ?", [req.params.commentId], (err, data) => {
    if (err || !data.length) return res.status(404).json("Comment not found");
    if (data[0].user_id !== user.id && user.role !== "admin") return res.status(403).json("Access denied");

    db.query("DELETE FROM community_comments WHERE id = ?", [req.params.commentId], err => {
      if (err) return res.status(500).json("Delete failed");
      res.status(200).json("Comment deleted");
    });
  });
};

export const upvoteCommunityComment = (req, res) => {
  const user = req.user;

  const q = "INSERT INTO community_comment_upvotes (user_id, comment_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE id=id";
  db.query(q, [user.id, req.params.commentId], err => {
    if (err) return res.status(500).json("Upvote failed");
    res.status(200).json("Comment upvoted");
  });
};

export const downvoteCommunityComment = (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  const q = "DELETE FROM community_comment_upvotes WHERE user_id = ? AND comment_id = ?";
  db.query(q, [user.id, req.params.commentId], (err, result) => {
    if (err) {
      console.error("Error removing comment upvote:", err); 
      return res.status(500).json({ error: "Failed to remove comment upvote" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Comment upvote not found" });
    }

    res.status(200).json({ success: true, message: "Comment upvote removed" });
  });
};

export const reportCommunityComment = (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  const { reason } = req.body;
  const q = `
    INSERT INTO community_comment_reports (comment_id, user_id, reason)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE reason = VALUES(reason)
  `;
  db.query(q, [req.params.commentId, user.id, reason], err => {
    if (err) return res.status(500).json({ error: "Report failed" });
    res.status(200).json({ message: "Comment reported" });
  });
};

export const getCommentsForPost = (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  const postId = req.params.id;
  const { limit = 1000, offset = 0 } = req.query;

  const q = `
    SELECT c.*, u.username,
      (SELECT COUNT(*) FROM community_comment_upvotes WHERE comment_id = c.id) AS upvotes,
      EXISTS (
        SELECT 1 FROM community_comment_upvotes 
        WHERE comment_id = c.id AND user_id = ?
      ) AS isUpvoted
    FROM community_comments c
    JOIN users u ON c.user_id = u.id
    WHERE c.post_id = ?
    ORDER BY c.created_at ASC
    LIMIT ? OFFSET ?
  `;

  db.query(q, [user.id, postId, Number(limit), Number(offset)], (err, rawComments) => {
    if (err) return res.status(500).json({ error: "Failed to fetch comments" });

    const commentMap = {};
    rawComments.forEach((c) => {
      c.replies = [];
      c.isUpvoted = !!c.isUpvoted;
      commentMap[c.id] = c;
    });

    const buildTree = () => {
      const roots = [];
      rawComments.forEach((c) => {
        if (c.parent_comment_id) {
          const parent = commentMap[c.parent_comment_id];
          if (parent) parent.replies.push(c);
        } else {
          roots.push(c);
        }
      });
      return roots;
    };

    const nestedComments = buildTree();
    res.status(200).json({ comments: nestedComments });
  });
};
