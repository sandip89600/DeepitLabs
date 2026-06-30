/**
 * Custom NoSQL Query Injection Protection Middleware.
 * Recursively removes keys starting with '$' or containing '.' from req.body, req.query, and req.params.
 * Mutates objects in-place to ensure full compatibility with Express 5's read-only req.query getter.
 * Returns a factory function to match standard middleware registration.
 */
const sanitize = (obj) => {
    if (obj instanceof Object) {
        for (const key in obj) {
            if (/^\$|\./.test(key)) {
                delete obj[key];
            } else {
                sanitize(obj[key]);
            }
        }
    }
    return obj;
};

const nosqlSanitize = () => {
    return (req, res, next) => {
        if (req.body) sanitize(req.body);
        if (req.params) sanitize(req.params);
        if (req.query) {
            // Mutates key properties inside req.query in-place without reassigning the object reference
            sanitize(req.query);
        }
        next();
    };
};

module.exports = nosqlSanitize;
