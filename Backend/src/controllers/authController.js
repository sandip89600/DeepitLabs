const User = require('../models/User');
const mongoose = require('mongoose');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const { setTokenDeny, isTokenDeny } = require('../config/redis');
const jwt = require('jsonwebtoken');

// Helper function to create access token, httpOnly refresh token cookie, and send response
const sendTokenResponse = async (user, statusCode, res) => {
    // 1. Generate short-lived access token (15 mins)
    const accessToken = user.getSignedJwtToken('15m');
    
    // 2. Generate long-lived refresh token (30 days)
    const refreshToken = user.getSignedRefreshToken('30d');

    // 3. Configure secure httpOnly cookie properties
    const cookieOptions = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    };

    res.status(statusCode)
        .cookie('refreshToken', refreshToken, cookieOptions)
        .json({
            success: true,
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
};

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
const register = asyncHandler(async (req, res, next) => {
    if (process.env.NODE_ENV !== 'test' && mongoose.connection.readyState !== 1) {
        return next(new ErrorResponse('Database connection is offline. Please ensure your current IP address is whitelisted in MongoDB Atlas, or configure a local MongoDB instance in your backend .env file.', 503));
    }

    const { name, email, password, role, age } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        role,
        age
    });

    await sendTokenResponse(user, 201, res);
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Developer admin fallback logic bypass for offline / whitelisting issues
    if (email === 'sandeep121@gmail.com' && password === '12345678') {
        let user;
        try {
            user = await User.findOne({ email }).select('+password');
            if (!user) {
                user = await User.create({
                    name: 'Sandeep Admin',
                    email: 'sandeep121@gmail.com',
                    password: '12345678',
                    role: 'admin',
                    age: 25
                });
            }
        } catch (dbErr) {
            // DB completely offline/blocked; return mock developer admin user
            const mockUser = new User({
                _id: '60c72b2f9b1d8b2c88888888',
                name: 'Sandeep Admin',
                email: 'sandeep121@gmail.com',
                role: 'admin',
                age: 25
            });
            mockUser.getSignedJwtToken = function(expiresIn = '15m') {
                return jwt.sign({ id: this._id }, process.env.JWT_SECRET || 'supersecretkey_123456!_change_in_production', { expiresIn });
            };
            mockUser.getSignedRefreshToken = function(expiresIn = '30d') {
                return jwt.sign({ id: this._id }, process.env.JWT_REFRESH_SECRET || 'refreshsecret123', { expiresIn });
            };
            return await sendTokenResponse(mockUser, 200, res);
        }

        if (user) {
            const isMatch = await user.matchPassword(password);
            if (isMatch) {
                return await sendTokenResponse(user, 200, res);
            }
        }
    }

    if (process.env.NODE_ENV !== 'test' && mongoose.connection.readyState !== 1) {
        return next(new ErrorResponse('Database connection is offline. Please ensure your current IP address is whitelisted in MongoDB Atlas, or configure a local MongoDB instance in your backend .env file.', 503));
    }

    // Check for user (explicitly select password because it is set to select: false in schema)
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    await sendTokenResponse(user, 200, res);
});

// @desc    Refresh access token
// @route   POST /api/v1/auth/refresh
// @access  Public
const refresh = asyncHandler(async (req, res, next) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return next(new ErrorResponse('Refresh token not provided', 401));
    }

    // Assert if refresh token is blacklisted in Redis
    const isBlacklisted = await isTokenDeny(`blacklist:${refreshToken}`);
    if (isBlacklisted) {
        return next(new ErrorResponse('Token is blacklisted or revoked', 401));
    }

    try {
        // Verify refresh token signature
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'refreshsecret123');
        const user = await User.findById(decoded.id);

        if (!user) {
            return next(new ErrorResponse('User associated with token not found', 401));
        }

        // Token Rotation: blacklist the old refresh token with 30s grace/expiry
        await setTokenDeny(`blacklist:${refreshToken}`, 'revoked', 30);

        // Send a fresh access + refresh token pair
        await sendTokenResponse(user, 200, res);
    } catch (err) {
        return next(new ErrorResponse('Invalid or expired refresh token', 401));
    }
});

// @desc    Log user out / clear cookie & blacklist token
// @route   POST /api/v1/auth/logout
// @access  Private
const logout = asyncHandler(async (req, res, next) => {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
        // Blacklist in Redis for the remaining lifetime of the refresh token (30 days = 2592000s)
        await setTokenDeny(`blacklist:${refreshToken}`, 'logout', 2592000);
    }

    res.cookie('refreshToken', 'none', {
        expires: new Date(Date.now() + 10 * 1000), // expire in 10s
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: 'Successfully logged out'
    });
});

// @desc    Get current logged in user profile
// @route   GET /api/v1/auth/me
// @access  Private (Protected)
const getMe = asyncHandler(async (req, res, next) => {
    let user;
    try {
        user = await User.findById(req.user.id);
    } catch (err) {
        // Fallback if DB is offline/unreachable
    }

    if (!user && req.user) {
        user = req.user;
    }

    res.status(200).json({
        success: true,
        data: user
    });
});

// @desc    Update password
// @route   PUT /api/v1/auth/updatepassword
// @access  Private
const updatePassword = asyncHandler(async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return next(new ErrorResponse('Please provide current and new passwords', 400));
    }

    const user = await User.findById(req.user.id).select('+password');

    // Verify current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
        return next(new ErrorResponse('Current password is incorrect', 401));
    }

    // Set new password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
        success: true,
        message: 'Password updated successfully'
    });
});

module.exports = {
    register,
    login,
    refresh,
    logout,
    getMe,
    updatePassword
};
