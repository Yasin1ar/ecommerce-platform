const errorHandler = (err, req, res, next) => {
    /**
 * Global error handling middleware for Express applications
 * @param {Error} err - Error object thrown from previous middleware/route
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object 
 * @param {NextFunction} next - Express next middleware function
 * @returns {Response} JSON response with error details
 */
    console.error(err.stack);
  
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || 'Server Error',
    });
  };
  
  module.exports = errorHandler;
  