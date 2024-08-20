const express = require("express");
const router = express.Router();
const { login } = require("../controllers/auth/auth.controller");
const validateLogin = require("../middlewares/login.middleware");

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login and get a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the user.
 *                 example: "admin"
 *               password:
 *                 type: string
 *                 description: Password of the user.
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Authentication successful, returns JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Bad request, usually due to missing username or password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Username and password are required."
 *       401:
 *         description: Unauthorized, invalid credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Invalid credentials."
 *       500:
 *         description: Internal server error.
 */

router.post("/login", validateLogin, login);

module.exports = router;
