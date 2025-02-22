/**
 * Express router for authentication endpoints.
 * Handles user registration and login routes.
 * Routes:
 * - POST /register: Create new user account
 * - POST /login: Authenticate existing user
 */
const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;
