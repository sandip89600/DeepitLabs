const ErrorResponse = require('../utils/errorResponse');
const logger = require('../config/logger');

/**
 * Generic Request Validation Middleware using Zod.
 * Validates request body, query params, and route parameters dynamically.
 */
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });
        next();
    } catch (err) {
        // If it is a Zod validation error, it will contain issues/errors array
        const errorList = err.errors || err.issues;
        
        if (errorList) {
            const errors = errorList
                .map((e) => {
                    // Strip the parent path namespaces (e.g. 'body') for clean outputs
                    const path = e.path.filter((p) => p !== 'body').join('.');
                    return `${path ? `${path}: ` : ''}${e.message}`;
                })
                .join(', ');
                
            return next(new ErrorResponse(`Validation Error - ${errors}`, 400));
        }
        
        // Fallback for general unexpected parsing/runtime issues
        logger.error('Unexpected non-validation error caught in validate middleware:', err);
        next(err);
    }
};

module.exports = validate;
