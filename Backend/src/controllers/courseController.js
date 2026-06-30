const Course = require('../models/Course');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Create new course
// @route   POST /api/v1/courses
// @access  Private (Admins and Mentors only)
const createCourse = asyncHandler(async (req, res, next) => {
    // Add user ID to req.body (from req.user assigned by protect middleware)
    req.body.user = req.user.id;

    const course = await Course.create(req.body);

    res.status(201).json({
        success: true,
        data: course
    });
});

// @desc    Get all courses
// @route   GET /api/v1/courses
// @access  Public
const getCourses = asyncHandler(async (req, res, next) => {
    // If advancedResults middleware ran, return its output
    res.status(200).json(res.advancedResults);
});

// @desc    Get stats of courses (Aggregation Pipeline)
// @route   GET /api/v1/courses/stats
// @access  Public
const getCourseStats = asyncHandler(async (req, res, next) => {
    const stats = await Course.aggregate([
        {
            // Group courses by minimumSkill level
            $group: {
                _id: '$minimumSkill',
                averageTuition: { $avg: '$tuition' },
                minTuition: { $min: '$tuition' },
                maxTuition: { $max: '$tuition' },
                courseCount: { $sum: 1 }
            }
        },
        {
            // Sort by average tuition cost descending
            $sort: { averageTuition: -1 }
        }
    ]);

    res.status(200).json({
        success: true,
        data: stats
    });
});

module.exports = {
    createCourse,
    getCourses,
    getCourseStats
};
