/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication endpoints
 */
const express = require('express');
const router = express.Router();
const { register, login,refreshToken,logout } = require('../controller/auth.controller');
/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: User register
 *     description: Register user and store deatils in DB
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 format: email
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               role:
 *                 type: string
 *                 format: role
 *             example:
 *               name: test user
 *               email: user@example.com
 *               password: password123
 *               role: user
 *     responses:
 *       200:
 *         description: Successfully register
 *         content:
 *           application/json:
 *             example:
 *               accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               role: "user"
 *       401:
 *         description: Invalid credentials
 */
router.post('/register', register);
/**
 * @swagger
 * components:
 *   parameters:
 *     AuthorizationHeader:
 *       name: Authorization
 *       in: header
 *       description: JWT token in format 'Bearer <token>'
 *       required: true
 *       schema:
 *         type: string
 *   responses:
 *     InvalidTokenError:
 *       description: Invalid or expired authentication token
 *       content:
 *         application/json:
 *           example:
 *             message: Invalid token
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Authenticate user
 *     description: Returns JWT token for authenticated users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *                 role:
 *                   type: string
 *       401:
 *         description: Authentication failed
 *         content:
 *           application/json:
 *             examples:
 *               invalidCredentials:
 *                 value:
 *                   message: Invalid credentials
 *               userNotFound:
 *                 value:
 *                   message: User not found
 */
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);
module.exports = router;
