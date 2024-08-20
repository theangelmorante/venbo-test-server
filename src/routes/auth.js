const express = require("express");
const router = express.Router();
const { login } = require("../controllers/auth/auth.controller");
const validateLogin = require("../middlewares/login.middleware");

router.post("/login", validateLogin, login);

module.exports = router;
