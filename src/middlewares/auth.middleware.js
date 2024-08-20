const jwt = require("jsonwebtoken");

/**
 * Middleware to authenticate the user
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Callback function
 */
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send({ error: "Invalid token." });
  }
};

module.exports = authMiddleware;
