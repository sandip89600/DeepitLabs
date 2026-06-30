const redis = require('redis');
const logger = require('./logger');

let redisClient = null;
let isRedisConnected = false;
const memoryStore = new Map(); // In-memory fallback for local dev environments

/**
 * Initializes Redis connection.
 * Automatically falls back to memory-store if Redis Server is down/unconfigured in development.
 */
const connectRedis = async () => {
    const redisUrl = process.env.REDIS_URL;
    
    if (redisUrl) {
        try {
            redisClient = redis.createClient({ url: redisUrl });

            redisClient.on('error', (err) => {
                logger.error(`Redis Connection Error: ${err.message}`);
            });

            redisClient.on('connect', () => {
                isRedisConnected = true;
                logger.info('Redis connection established successfully');
            });

            await redisClient.connect();
        } catch (err) {
            logger.warn(`Redis connection failed: ${err.message}. Defaulting to in-memory store wrapper.`);
            redisClient = null;
            isRedisConnected = false;
        }
    } else {
        logger.warn('REDIS_URL not specified in env variables. Operating with local in-memory store wrapper.');
    }
};

/**
 * Adds a key to the token denylist (e.g. logouts / rotations).
 */
const setTokenDeny = async (key, val, expireSeconds) => {
    if (isRedisConnected && redisClient) {
        await redisClient.setEx(key, expireSeconds, val);
    } else {
        memoryStore.set(key, val);
        // Cap setTimeout to the max 32-bit signed integer duration (approx 24.8 days) to avoid overflows
        const maxMs = Math.min(expireSeconds * 1000, 2147483647);
        setTimeout(() => {
            memoryStore.delete(key);
        }, maxMs);
    }
};

/**
 * Asserts if a key is denylisted.
 */
const isTokenDeny = async (key) => {
    if (isRedisConnected && redisClient) {
        const val = await redisClient.get(key);
        return !!val;
    } else {
        return memoryStore.has(key);
    }
};

module.exports = {
    connectRedis,
    setTokenDeny,
    isTokenDeny
};
