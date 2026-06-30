const ErrorResponse = require('../utils/errorResponse');
const logger = require('../config/logger');

/**
 * Global centralized error-handling middleware.
 * Intercepts all errors passed down using next(err) and formats a standard JSON response.
 */
const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    
    // Copy the message property since it is non-enumerable and won't copy with spread operator
    error.message = err.message;

    // Log the full error using Winston logger
    logger.error(err);

    // 1. Mongoose Bad ObjectId (CastError)
    // Occurs when an invalid MongoDB ObjectId is requested (e.g. invalid length or chars)
    if (err.name === 'CastError') {
        const message = `Resource not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    // 2. Mongoose Duplicate Key Error (code 11000)
    // Occurs when a field marked as unique: true gets a duplicate entry (e.g. duplicate email)
    if (err.code === 11000) {
        const message = 'Duplicate field value entered. Email already exists.';
        error = new ErrorResponse(message, 400);
    }

    // 3. Mongoose Validation Error (ValidationError)
    // Occurs when mongoose schema validation fails (e.g. required, minlength, etc.)
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message).join(', ');
        error = new ErrorResponse(message, 400);
    }

    // Send final structured error response
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
};

module.exports = errorHandler;
