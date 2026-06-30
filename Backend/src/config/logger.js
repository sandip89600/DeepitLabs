const winston = require('winston');
const path = require('path');

// Custom layout format for development console logging
const devFormat = winston.format.printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`;
});

// Configure Winston logger settings
const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }), // Automatically parses error stack traces
        winston.format.json() // Production standard JSON format
    ),
    transports: [
        // 1. Log errors to error.log
        new winston.transports.File({ 
            filename: path.join(__dirname, '../../logs/error.log'), 
            level: 'error' 
        }),
        // 2. Log all levels info, warn, error to combined.log
        new winston.transports.File({ 
            filename: path.join(__dirname, '../../logs/combined.log') 
        })
    ]
});

// 3. For development environment, also print logs to console with colors and simple formats
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            devFormat
        )
    }));
}

module.exports = logger;
