/**
 * Custom XSS Protection Middleware.
 * Recursively escapes HTML tag characters (<, >, &, ", ', /) in string inputs
 * within req.body, req.query, and req.params to prevent Cross-Site Scripting (XSS).
 * Mutates string values in-place for Express 5 compatibility (avoiding req.query getter crashes).
 */
const cleanString = (str) => {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
};

const sanitize = (obj) => {
    if (obj instanceof Object) {
        for (const key in obj) {
            if (typeof obj[key] === 'string') {
                obj[key] = cleanString(obj[key]);
            } else if (obj[key] instanceof Object) {
                sanitize(obj[key]);
            }
        }
    }
    return obj;
};

const xssClean = () => {
    return (req, res, next) => {
        if (req.body) sanitize(req.body);
        if (req.params) sanitize(req.params);
        if (req.query) {
            // Mutates keys inside req.query in-place to avoid Express 5 read-only assignment crash
            sanitize(req.query);
        }
        next();
    };
};

module.exports = xssClean;
