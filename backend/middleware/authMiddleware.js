const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const JWT_SECRET = process.env.JWT_SECRET;

exports.protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Full decoded token:", decoded); // Debug entire token

    // Validate the ID exists and is a number
    if (typeof decoded.id === "undefined") {
      console.error("Token missing ID field");
      throw new Error("Invalid token payload");
    }

    const userId = parseInt(decoded.id, 10);
    if (isNaN(userId)) {
      console.error("Invalid user ID in token:", decoded.id);
      throw new Error("Invalid user ID");
    }

    userModel.findUserById(userId, (err, user) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Server error" });
      }

      if (!user) {
        console.log(`No user found for ID: ${userId}`);
        return res
          .status(401)
          .json({ message: "Not authorized, user not found" });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    console.error("Authentication error:", error);
    res.clearCookie("token");
    return res.status(401).json({
      message: "Not authorized, token failed",
      details: error.message,
    });
  }
};
