const express = require('express');
const router = express.Router();
const { 
    createUser, 
    getUsers, 
    uploadAvatar, 
    updateProfile, 
    deleteUser, 
    getAdminStats,
    getFrontendConfig,
    updateFrontendConfig,
    getLogs
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const User = require('../models/User');
const advancedResults = require('../middleware/advancedResults');

// Public settings route
router.get('/frontend-config', getFrontendConfig);

// Admin-protected configuration routes
router.put('/frontend-config', protect, authorize('admin'), updateFrontendConfig);
router.get('/logs', protect, authorize('admin'), getLogs);

router.route('/')
    .post(createUser)
    .get(protect, authorize('admin', 'mentor'), advancedResults(User), getUsers);

// Route for avatar upload
router.put('/avatar', protect, upload.single('avatar'), uploadAvatar);

// Route for profile updates
router.put('/profile', protect, updateProfile);

// Stats route must be BEFORE the /:id route to avoid conflict
router.get('/stats', protect, authorize('admin'), getAdminStats);

router.delete('/:id', protect, authorize('admin'), deleteUser);

module.exports = router;
