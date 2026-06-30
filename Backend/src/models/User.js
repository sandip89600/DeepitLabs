const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email address'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false // Prevents returning the password field in query results by default
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        enum: {
            values: ['user', 'mentor', 'admin', 'client', 'developer'],
            message: '{VALUE} is not a valid role. Allowed roles are: user, mentor, admin, client, developer'
        },
        default: 'user'
    },
    age: {
        type: Number,
        min: [10, 'You must be at least 10 years old'],
        max: [120, 'Age cannot exceed 120 years']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    avatar: {
        type: String,
        default: 'default-avatar.png'
    },
    avatarPublicId: {
        type: String
    }
}, {
    timestamps: true // Automatically creates createdAt and updatedAt
});

// Encrypt password using bcrypt before saving
userSchema.pre('save', async function() {
    // Only run this if password was modified
    if (!this.isModified('password')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT Access Token (default short-lived 15 minutes)
userSchema.methods.getSignedJwtToken = function(expiresIn = '15m') {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn
    });
};

// Sign JWT Refresh Token (default long-lived 30 days)
userSchema.methods.getSignedRefreshToken = function(expiresIn = '30d') {
    return jwt.sign({ id: this._id }, process.env.JWT_REFRESH_SECRET || 'refreshsecret123', {
        expiresIn
    });
};

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
