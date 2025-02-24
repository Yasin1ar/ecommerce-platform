/**
 * Authentication module providing user registration and login functionality.
 * Uses bcrypt for password hashing and JWT for token generation.
 *
 * @exports register - Creates new user account with hashed password
 * @exports login - Authenticates user and generates JWT token
 */

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.registerUser = async (req, res) => {
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
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    // if there is no user in db
    if (!user) {
      return res.status(401).json({ error: "Invalid email" });
    }
    //  if the password from user doesn't match the from db 
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }
    // sign the token to validate later
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
