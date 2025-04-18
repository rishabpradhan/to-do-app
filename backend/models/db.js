// connecting database with node js
require("dotenv").config();
const mysql = require("mysql2");
let db;
try {
  db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  console.log("database has created and connected");
} catch (err) {
  console.log("error while connecting", err.message);
}
module.exports = db;
