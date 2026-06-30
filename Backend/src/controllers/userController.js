const User = require('../models/User');
const Setting = require('../models/Setting');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');

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

// @desc    Get frontend configuration settings
// @route   GET /api/v1/users/frontend-config
// @access  Public
const getFrontendConfig = asyncHandler(async (req, res, next) => {
    let config = await Setting.findOne({ key: 'frontend_config' });
    
    if (!config) {
        // Create initial default settings
        const defaultConfig = {
            brandName: 'Deep IT Labs',
            contactEmail: 'info@deepitlabs.in',
            contactPhone: '+91 7058222107',
            headquarters: 'Nashik, Maharashtra, India',
            heroTitle: 'Engineering Premium Custom Web Applications',
            heroDesc: 'Deep IT Labs builds production-ready software solutions, high-speed dashboards, and custom SaaS platforms designed exactly for your scale.',
            stats: [
                { value: '150+', label: 'Projects Completed' },
                { value: '98%', label: 'Client Retention' },
                { value: '15+', label: 'Years Experience' },
                { value: '40+', label: 'Core Developers' }
            ],
            services: [
                { title: 'MERN Stack Applications', desc: 'Custom engineered web applications utilizing React, Node.js, Express, and MongoDB for fast, scalable solutions.', icon: '💻' },
                { title: 'Custom CRM & ERP Platforms', desc: 'Custom workforce administration software, CRM, and ERP modules tailored to optimize your workflow.', icon: '🏢' },
                { title: 'Dashboards & Admin Panels', desc: 'High-speed, responsive dashboards presenting real-time business aggregations and data metrics.', icon: '📊' },
                { title: 'Enterprise API Development', desc: 'Safe, microservices-driven RESTful APIs and integrations developed using industry-standard architectures.', icon: '🔗' },
                { title: 'Mobile App Engineering', desc: 'Seamless hybrid and native mobile apps built using React Native and Flutter for iOS and Android platforms.', icon: '📱' },
                { title: 'UI/UX Design Studio', desc: 'Visual mockups, wireframing, and premium product designs built with high focus on human-centered interaction.', icon: '🎨' }
            ],
            aboutMission: 'To empower companies with customized, secure, and production-ready digital products. We eliminate technical debt by writing modular, scalable architectures and performing strict validation logic before deployment.',
            aboutVision: 'To become a global leader in bespoke web engineering and MERN stack systems. We aim to bridge the gap between design vision and database persistence with clean software engineering.',
            aboutValues: [
                { title: 'Quality First', desc: 'We deliver clean, scalable, and optimized code that complies with standard architectural patterns.', icon: '🏆' },
                { title: 'Data Security', desc: 'Vulnerability shielding, encryption, and parameter sanitization are engineered directly in the root logic.', icon: '🛡️' },
                { title: 'Agile Cycles', desc: 'Weekly iterations, live stage reviews, and direct Slack communication keep us fully aligned.', icon: '🤝' },
                { title: 'Client Focus', desc: 'Every feature is modeled to solve a real business problem, optimizing workflows and conversions.', icon: '🎯' }
            ],
            projects: [
                { title: 'SaaS Analytics Dashboard', category: 'SaaS', image: 'https://as2.ftcdn.net/v2/jpg/03/64/25/69/1000_F_364256948_PrTDg9ViiZqcJ8nCIZNhgrnHNA1fYeVn.jpg', desc: 'A real-time analytics platform built using the MERN Stack with advanced charts, authentication, and optimized database queries.', tags: ['React', 'Node.js', 'MongoDB', 'Chart.js'], metric: '+45%', metricTitle: 'Rendering Speed' },
                { title: 'Global Supply Chain CRM', category: 'ERP/CRM', image: 'https://www.sistemaimpulsa.com/blog/wp-content/uploads/2024/01/Automatizar-procesos-de-venta-con-un-CRM-1536x1024.jpg', desc: 'Enterprise CRM solution for logistics companies with warehouse management, order tracking and reporting.', tags: ['MERN', 'Docker', 'Cloudinary', 'JWT'], metric: '99.9%', metricTitle: 'System Uptime' },
                { title: 'Fintech Payment Gateway', category: 'API Integration', image: 'https://tse3.mm.bing.net/th/id/OIP.xgBM7J05KZS8nXZxOwX9LgHaEt?rs=1&pid=ImgDetMain&o=7&rm=3', desc: 'Secure payment gateway with JWT authentication, Helmet security, Rate Limiting and API monitoring.', tags: ['Express', 'Helmet', 'JWT', 'Redis'], metric: '500K+', metricTitle: 'Transactions' },
                { title: 'EdTech Learning Platform', category: 'SaaS', image: 'https://tse1.mm.bing.net/th/id/OIP.Ns0hzsNAINabHxLIwUU0QgHaD4?rs=1&pid=ImgDetMain&o=7&rm=3', desc: 'Modern learning platform supporting student dashboards, course management and file uploads.', tags: ['React', 'MongoDB', 'Tailwind', 'AWS'], metric: '25K+', metricTitle: 'Students' }
            ]
        };

        config = await Setting.create({
            key: 'frontend_config',
            value: defaultConfig
        });
    }

    res.status(200).json({
        success: true,
        data: config.value
    });
});

// @desc    Update frontend configuration settings
// @route   PUT /api/v1/users/frontend-config
// @access  Private/Admin
const updateFrontendConfig = asyncHandler(async (req, res, next) => {
    let config = await Setting.findOne({ key: 'frontend_config' });
    
    if (!config) {
        config = new Setting({ key: 'frontend_config' });
    }

    config.value = req.body;
    await config.save();

    res.status(200).json({
        success: true,
        data: config.value
    });
});

// @desc    Get server log file contents
// @route   GET /api/v1/users/logs
// @access  Private/Admin
const getLogs = asyncHandler(async (req, res, next) => {
    const logPath = path.join(__dirname, '../../logs/combined.log');
    if (!fs.existsSync(logPath)) {
        return res.status(200).json({
            success: true,
            data: 'No logs generated yet.'
        });
    }

    const logContent = fs.readFileSync(logPath, 'utf8');
    res.status(200).json({
        success: true,
        data: logContent
    });
});

module.exports = {
    createUser,
    getUsers,
    uploadAvatar,
    updateProfile,
    deleteUser,
    getAdminStats,
    getFrontendConfig,
    updateFrontendConfig,
    getLogs
};
