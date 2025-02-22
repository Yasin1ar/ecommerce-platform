const authorize = (roles = []) => {
    /**
   * Middleware function that checks if user has required role authorization
   * @param {Array} roles - Array of allowed roles
   * @returns {Function} Express middleware that validates user role
   * @throws {Object} Returns 403 status with error message if unauthorized
   */
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden: Access Denied' });
      }
      next();
    };
  };
  
  module.exports = authorize;
  