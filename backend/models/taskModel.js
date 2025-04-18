// to do task schema design
const db = require("./db");

module.exports = {
  createTask: (userId, title, description, callback) => {
    const sql =
      "INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)";
    db.query(sql, [userId, title, description], (err, result) => {
      callback(err, result.insertId);
    });
  },

  getTasksByUser: (userId, callback) => {
    const sql = "SELECT * FROM tasks WHERE user_id = ?";
    db.query(sql, [userId], (err, results) => {
      callback(err, results);
    });
  },

  deleteTask: (userId, taskId, callback) => {
    const sql = "DELETE FROM tasks WHERE id = ? AND user_id = ?";
    db.query(sql, [taskId, userId], (err, result) => {
      callback(err, result.affectedRows > 0);
    });
  },
};
