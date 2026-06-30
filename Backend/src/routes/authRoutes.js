const express = require('express');
const router = express.Router();
const { register, login, refresh, logout, getMe, updatePassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { registerSchema, loginSchema } = require('../utils/validators');

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password, age]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Alex Doe
 *               email:
 *                 type: string
 *                 example: alex@example.com
 *               password:
 *                 type: string
 *                 example: securepass123
 *               role:
 *                 type: string
 *                 enum: [user, admin, mentor, client, developer]
 *                 default: user
 *               age:
 *                 type: number
 *                 example: 22
 *     responses:
 *       201:
 *         description: User registered successfully, returns access token
 */
router.post('/register', validate(registerSchema), register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login an existing user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: alex@example.com
 *               password:
 *                 type: string
 *                 example: securepass123
 *     responses:
 *       200:
 *         description: Login successful, returns access token
 */
router.post('/login', validate(loginSchema), login);

/**
 * @openapi
 * /auth/refresh:
 *   post:
 *     summary: Rotate and refresh JWT access token using httpOnly cookie
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Rotation success, returns a new access token
 */
router.post('/refresh', refresh);

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     summary: Revoke session refresh token and clear cookie
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged out
 */
router.post('/logout', protect, logout);

/**
 * @openapi
 * /auth/me:
 *   get:
 *     summary: Get current authenticated user profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns current user document
 */
router.get('/me', protect, getMe);

/**
 * @openapi
 * /auth/updatepassword:
 *   put:
 *     summary: Update password for current logged-in user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [currentPassword, newPassword]
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: oldpassword123
 *               newPassword:
 *                 type: string
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: Password updated successfully
 */
router.put('/updatepassword', protect, updatePassword);

module.exports = router;
