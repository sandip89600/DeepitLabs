/**
 * asyncHandler is a wrapper function that eliminates the need for try-catch blocks
 * in every async route handler. It accepts an async function, returns a standard
 * Express middleware, resolves the async function, and catches any error, forwarding
 * it automatically to Express's next() error handling middleware.
 */
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
