const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const cloudinary = require('../config/cloudinary');

// Helper function to upload buffer stream to Cloudinary
const uploadFromBuffer = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'avatars', resource_type: 'image' },
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );
        stream.end(fileBuffer);
    });
};

// @desc    Create new user
// @route   POST /api/v1/users
// @access  Public
const createUser = asyncHandler(async (req, res, next) => {
    const { name, email, password, role, age, isActive } = req.body;
    
    const user = await User.create({
        name,
        email,
        password,
        role,
        age,
        isActive
    });

    res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: user
    });
});

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Public
const getUsers = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc    Upload user avatar
// @route   PUT /api/v1/users/avatar
// @access  Private
const uploadAvatar = asyncHandler(async (req, res, next) => {
    // Check if file was uploaded by multer
    if (!req.file) {
        return next(new ErrorResponse('Please upload an image file', 400));
    }

    const user = await User.findById(req.user.id);
    if (!user) {
        return next(new ErrorResponse('User not found', 404));
    }

    // Delete the previous avatar image from Cloudinary if exists
    if (user.avatarPublicId) {
        try {
            await cloudinary.uploader.destroy(user.avatarPublicId);
        } catch (destroyError) {
            console.error(`Failed to delete old avatar: ${destroyError.message}`);
            // Non-blocking error, we still proceed to upload the new one
        }
    }

    // Upload the file buffer to Cloudinary
    let uploadResult;
    try {
        uploadResult = await uploadFromBuffer(req.file.buffer);
    } catch (uploadError) {
        return next(new ErrorResponse(`Cloudinary Upload Failed: ${uploadError.message}`, 500));
    }

    // Update the database records
    user.avatar = uploadResult.secure_url;
    user.avatarPublicId = uploadResult.public_id;
    await user.save();

    res.status(200).json({
        success: true,
        message: 'Avatar uploaded and updated successfully',
        avatarUrl: user.avatar
    });
});

// @desc    Update user profile details
// @route   PUT /api/v1/users/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res, next) => {
    const { name, age } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
        return next(new ErrorResponse('User not found', 404));
    }

    if (name) user.name = name;
    if (age) user.age = age;

    await user.save();

    res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: user
    });
});

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorResponse(`User not found with id ${req.params.id}`, 404));
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'User deleted successfully' });
});

// @desc    Get admin dashboard statistics
// @route   GET /api/v1/users/stats
// @access  Private/Admin
const getAdminStats = asyncHandler(async (req, res, next) => {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const roleStats = await User.aggregate([
        { $group: { _id: '$role', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
    ]);
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5).select('name email role createdAt');
    const monthlyGrowth = await User.aggregate([
        { $group: { _id: { $month: '$createdAt' }, count: { $sum: 1 } } },
        { $sort: { '_id': 1 } }
    ]);
    res.status(200).json({
        success: true,
        data: { totalUsers, activeUsers, roleStats, recentUsers, monthlyGrowth }
    });
});

module.exports = {
    createUser,
    getUsers,
    uploadAvatar,
    updateProfile,
    deleteUser,
    getAdminStats
};
