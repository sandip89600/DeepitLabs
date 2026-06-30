const mongoose = require('mongoose');

// Mongoose schema for persistent user transactional payments tracking
const PaymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['succeeded', 'pending', 'failed'],
        default: 'succeeded'
    },
    cardBrand: {
        type: String,
        default: 'Visa'
    },
    last4: {
        type: String,
        default: '4821'
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);
