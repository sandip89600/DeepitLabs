const multer = require('multer');
const ErrorResponse = require('../utils/errorResponse');

// Set up memory storage (stores file as a Buffer in memory)
const storage = multer.memoryStorage();

// File type validation filter
const fileFilter = (req, file, cb) => {
    // Check mime type (only jpeg, jpg, png, webp)
    const allowedTypes = /jpeg|jpg|png|webp/;
    const isMimeMatch = allowedTypes.test(file.mimetype);

    if (isMimeMatch) {
        cb(null, true);
    } else {
        cb(new ErrorResponse('Only image files (jpeg, jpg, png, webp) are allowed', 400), false);
    }
};

// Initialize multer with storage, limits, and filter
const upload = multer({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024 // 2MB size limit
    },
    fileFilter
});

module.exports = upload;
