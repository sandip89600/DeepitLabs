// Trigger server restart with updated Atlas env
require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');
const { connectRedis } = require('./src/config/redis');
const logger = require('./src/config/logger');

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Connect to Redis Client
connectRedis();

app.listen(PORT, () => {
    logger.info(`Server is Running on Port ${PORT}`);
});