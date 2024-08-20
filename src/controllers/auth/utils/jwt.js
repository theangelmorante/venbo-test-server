const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "your_jwt_secret";

const generateToken = (username) => {
  return jwt.sign({ username }, secret, { expiresIn: "1h" });
};

module.exports = {
  generateToken,
};
