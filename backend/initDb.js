// this part only necessary for production not for manually creating database
const db = require("./models/db");
// Create users table with additional fields
db.query(
  `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      firstname VARCHAR(255) NOT NULL,
      lastname VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      contact VARCHAR(20) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `,
  (err) => {
    if (err) throw err;
    console.log("Users table created or already exists");
  }
);

// Create tasks table remains the same
db.query(
  `
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `,
  (err) => {
    if (err) throw err;
    console.log("Tasks table created or already exists");
    process.exit();
  }
);
