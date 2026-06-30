const mongoose = require('mongoose');

// Key-Value settings database model for dynamic Frontend CMS administration
const SettingSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    value: {
        type: Object,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Setting', SettingSchema);
