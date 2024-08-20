const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "your_jwt_secret";

/**
 * Generate a JWT token
 * @param {string} username Username of the user
 * @returns {string} JWT token
 */
const generateToken = (username) => {
  return jwt.sign({ username }, secret, { expiresIn: "1h" });
};

module.exports = {
  generateToken,
};
