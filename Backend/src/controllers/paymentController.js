const Payment = require('../models/Payment');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Simulate/Create a user payment
// @route   POST /api/v1/payments
// @access  Private
const createPayment = asyncHandler(async (req, res, next) => {
    const { amount, description, cardBrand, last4 } = req.body;

    if (!amount || !description) {
        return next(new ErrorResponse('Please add an amount and description', 400));
    }

    const payment = await Payment.create({
        user: req.user.id,
        amount,
        description,
        cardBrand: cardBrand || 'Visa',
        last4: last4 || '4821',
        status: 'succeeded'
    });

    res.status(201).json({
        success: true,
        data: payment
    });
});

// @desc    Get all payments
// @route   GET /api/v1/payments
// @access  Private/Admin
const getPayments = asyncHandler(async (req, res, next) => {
    // Populate user name and email
    const payments = await Payment.find()
        .populate('user', 'name email')
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: payments.length,
        data: payments
    });
});

// @desc    Get logged in user's payments
// @route   GET /api/v1/payments/my-payments
// @access  Private
const getUserPayments = asyncHandler(async (req, res, next) => {
    const payments = await Payment.find({ user: req.user.id })
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: payments.length,
        data: payments
    });
});

module.exports = {
    createPayment,
    getPayments,
    getUserPayments
};
