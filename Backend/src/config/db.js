const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        logger.info(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        logger.error(`Database connection error: ${error.message}`);
        logger.warn('Server is running, but database connection failed. Mongoose will auto-reconnect when MongoDB starts.');
    }
};

module.exports = connectDB;
