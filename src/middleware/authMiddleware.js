/**
 * Middleware to protect routes by validating JWT tokens.
 * Extracts bearer token from authorization header, verifies it,
 * and attaches decoded user data to request object.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @throws {401} - If token is invalid or missing
 */
const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
