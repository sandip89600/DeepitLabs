const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add a course title']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    weeks: {
        type: Number,
        required: [true, 'Please add number of weeks']
    },
    tuition: {
        type: Number,
        required: [true, 'Please add a tuition cost']
    },
    minimumSkill: {
        type: String,
        required: [true, 'Please add a minimum skill level'],
        enum: ['beginner', 'intermediate', 'advanced']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true // Automatically create createdAt and updatedAt
});

// Index user reference for fast populate joins
CourseSchema.index({ user: 1 });

// Compound index for optimizing queries that filter by tuition and skill level
CourseSchema.index({ tuition: 1, minimumSkill: 1 });

module.exports = mongoose.model('Course', CourseSchema);
