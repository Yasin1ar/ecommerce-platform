/**
 * Authentication module providing user registration and login functionality.
 * Uses bcrypt for password hashing and JWT for token generation.
 *
 * @module auth
 * @requires bcryptjs
 * @requires jsonwebtoken
 * @requires ../models/User
 *
 * @exports register - Creates new user account with hashed password
 * @exports login - Authenticates user and generates JWT token
 */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.registerUser = async (req, res) => {
  /**
 * Registers a new user with hashed password in the database.
 * 
 * @async
 * @param {Object} req - Express request object containing username, email and password
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with success message and user data or error
 * @throws {Error} Returns 500 status if registration fails
 */
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  /**
 * Authenticates user login and generates JWT token.
 * Validates email and password against database records.
 * 
 * @param {Object} req - Express request object containing email and password
 * @param {Object} res - Express response object
 * @returns {Object} Response with JWT token or error message
 * @throws {401} If email/password invalid
 * @throws {500} If server error occurs
 */
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.status(200).json({ message: "Logged in successfully", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
