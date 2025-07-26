import { db } from "../db.js";
import bcrypt from "bcryptjs";

// GET user profile
export const getUserProfile = (req, res) => {
  const q = `
    SELECT id, name, username, email, img, role, birthday, memberSince
    FROM users
    WHERE id = ?
  `;

  db.query(q, [req.user.id], (err, data) => {
    if (err) {
      console.error("Database error during user profile lookup:", err);
      return res.status(500).json("An unexpected error occurred.");
    }
    if (data.length === 0) return res.status(404).json("User not found");
    res.status(200).json(data[0]);
  });
};

// UPDATE user profile
export const updateUserProfile = async (req, res) => {
  const { name, email, img, newPassword } = req.body;

  try {
    let query = "UPDATE users SET name = ?, email = ?, img = ?";
    const values = [name, email, img];

    if (newPassword) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(newPassword, salt);
      query += ", password = ?";
      values.push(hashedPassword);
    }

    query += " WHERE id = ?";
    values.push(req.user.id);

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Database error during profile update:", err);
        return res.status(500).json("Profile update failed.");
      }
      if (result.affectedRows === 0) {
        return res.status(404).json("User not found or no changes made.");
      }
      return res.status(200).json("Profile updated successfully");
    });
  } catch (error) {
    console.error("Error during profile update:", error);
    return res.status(500).json("An unexpected error occurred.");
  }
};

// DELETE user
export const deleteUser = (req, res) => {
  const q = "DELETE FROM users WHERE id = ?";

  db.query(q, [req.user.id], (err, data) => {
    if (err) {
      console.error("Database error during user deletion:", err);
      return res.status(500).json("User deletion failed.");
    }
    if (data.affectedRows === 0) {
      return res.status(404).json("User not found or already deleted.");
    }

    res
      .clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' || process.env.COOKIE_SECURE_DEV === 'true',
        sameSite: 'Lax',
        path: '/',
      })
      .status(200)
      .json("User deleted successfully.");
  });
};