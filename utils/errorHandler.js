// /backend/utils/errorHandler.js

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
    // Log the error for debugging purposes
    console.error(err.stack);
  
    res.status(statusCode).json({
      success: false,
      error: {
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🍰' : err.stack,
      },
    });
  };
  
  module.exports = errorHandler;
  