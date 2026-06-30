const express = require('express');
const router = express.Router();
const { createPayment, getPayments, getUserPayments } = require('../controllers/paymentController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect); // All billing routes require login session

router.route('/')
    .post(createPayment)
    .get(authorize('admin'), getPayments); // Only admin can read global ledger

router.get('/my-payments', getUserPayments);

module.exports = router;
