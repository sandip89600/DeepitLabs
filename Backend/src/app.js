const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('./middleware/nosqlSanitize');
const xss = require('./middleware/xssClean');
const compression = require('compression');

// Import swagger config
const { swaggerUi, swaggerSpec } = require('./config/swagger');

// Import routes
const homeRoutes = require('./routes/homeRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Import error handler middleware
const errorHandler = require('./middleware/error');

const app = express();

// ========================================================
// 1. GLOBAL PERFORMANCE, SECURITY & LOGGING MIDDLEWARES
// ========================================================

// Enforce Gzip compression on response payloads
app.use(compression());

// Set security headers using Helmet
app.use(helmet());

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
    'https://www.deepitlabs.in'
];

if (process.env.CLIENT_URL) {
    process.env.CLIENT_URL.split(',').forEach(url => {
        const trimmed = url.trim();
        if (trimmed && !allowedOrigins.includes(trimmed)) {
            allowedOrigins.push(trimmed);
        }
    });
}

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, postman, or curl)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`Origin ${origin} not allowed by CORS`), false);
        }
    },
    credentials: true // Crucial to allow transfer of secure refresh token cookies
}));

// Prevent NoSQL Query Injection by sanitizing body, query, and params in-place
app.use(mongoSanitize());

// Prevent Cross-Site Scripting (XSS) by recursively escaping string inputs in-place
app.use(xss());

// Parse incoming HTTP Cookies (crucial to extract secure httpOnly refresh tokens)
app.use(cookieParser());

// Rate Limiting: Limit requests from the same IP (100 requests per 10 minutes)
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // Max 100 requests per window
    message: 'Too many requests from this IP, please try again after 10 minutes'
});
app.use('/api', limiter);

// Dev HTTP request logger (runs in development mode only)
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

// Body parser middleware (must be registered before routes)
app.use(express.json());

// ========================================================
// 2. ROUTE REGISTRATIONS
// ========================================================

// Swagger API documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", homeRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/payments", paymentRoutes);

// ========================================================
// 3. CENTRALIZED ERROR HANDLING MIDDLEWARE
// ========================================================
// Must be registered after all route handlers
app.use(errorHandler);

module.exports = app;