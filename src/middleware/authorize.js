// middlewares/authorize.js

module.exports = (requiredRoles) => {
  return (req, res, next) => {


    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Please login or register first' });
    }

    if (!requiredRoles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden: Insufficient permissions' });
    }

    console.log('Authorization Passed'); // Debugging Line
    next();
  };
};
