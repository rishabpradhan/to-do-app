// user schema design
const db = require("../models/db");

const userModel = {
  createUser: (firstname, lastname, password, email, contact, callback) => {
    const sql = `
      INSERT INTO users (firstname, lastname, password, email, contact)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(
      sql,
      [firstname, lastname, password, email, contact],
      (err, result) => {
        if (err) return callback(err);
        callback(null, result.insertId); // Return inserted user ID
      }
    );
  },

  findUserByEmail: (email, callback) => {
    const sql = `SELECT id, firstname, lastname, email, password FROM users WHERE email = ?`;
    db.query(sql, [email], (err, result) => {
      if (err) {
        console.error("Database error in findUserByEmail:", err);
        return callback(err);
      }
      console.log("User found by email:", result[0]); // Debug log
      callback(null, result);
    });
  },

  findUserById: (id, callback) => {
    console.log(`Looking for users with ID: ${id} (type: ${typeof id})`);
    const sql = `SELECT id, firstname, lastname, email FROM users WHERE id = ?`;
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return callback(err);
      }
      console.log("Query results:", result);
      callback(null, result[0]);
    });
  },
};

module.exports = userModel;
