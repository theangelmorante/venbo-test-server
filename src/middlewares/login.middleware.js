/**
 * Validate login request
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Callback function
 */
const validateLogin = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  next();
};

module.exports = validateLogin;
