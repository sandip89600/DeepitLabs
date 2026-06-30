const express = require('express');
const router = express.Router();
const { createCourse, getCourses, getCourseStats } = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/authMiddleware');
const Course = require('../models/Course');
const advancedResults = require('../middleware/advancedResults');

// GET /stats must be registered BEFORE GET / (otherwise stats matches as an id, if there were parameterized id routes)
router.get('/stats', getCourseStats);

router.route('/')
    .get(advancedResults(Course, { path: 'user', select: 'name email' }), getCourses)
    .post(protect, authorize('admin', 'mentor'), createCourse);

module.exports = router;
