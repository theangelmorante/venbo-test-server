const { generateToken } = require("./utils/jwt");

const login = (req, res) => {
  const { username, password } = req.body;

  if (username === process.env.USERNAME && password === process.env.PASSWORD) {
    const token = generateToken(username);

    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ error: "Invalid credentials" });
  }
};

module.exports = {
  login,
};
