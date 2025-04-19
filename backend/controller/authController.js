const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  const { firstname, lastname, password, email, contact } = req.body;

  try {
    if (!firstname || !lastname || !password || !email || !contact) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    userModel.createUser(
      firstname,
      lastname,
      hashedPassword,
      email,
      contact,
      (err) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            if (err.sqlMessage && err.sqlMessage.includes("email")) {
              return res.status(400).json({ message: "Email already exists" });
            } else if (err.sqlMessage && err.sqlMessage.includes("contact")) {
              return res
                .status(400)
                .json({ message: "Contact already exists" });
            }
          } else {
            return res.status(400).json({ message: "Duplicate entry" });
          }
        }
        res.status(201).json({ message: "User registered successfully" });
      }
    );
  } catch (error) {
    console.log("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    userModel.findUserByEmail(email, async (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Server error" });
      }

      if (!results || results.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const user = results[0];
      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const tokenPayload = {
        id: user.id,
        email: user.email,
      };
      console.log("Creating token with payload:", tokenPayload); // Debug log

      const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "1d" });

      const { password: _, ...userData } = user;

      res
        .cookie("token", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          secure: false,
          sameSite: "lax",
        })
        .json({
          message: "Login successful",
          user: userData,
        });
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.logout = (req, res) => {
  res.clearCookie("token").json({ message: "Logged out successfully" });
};

exports.getMe = (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    userModel.findUserById(decoded.id, (err, user) => {
      if (err || !user) {
        return res.status(401).json({ message: "User not found" });
      }
      res.json(user);
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
