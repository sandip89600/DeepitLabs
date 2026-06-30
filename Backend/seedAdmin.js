const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./src/models/User');

async function seedAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB Atlas');

        // Delete ALL existing accounts with this email (clean slate)
        const deleted = await User.deleteMany({ email: 'sandeep121@gmail.com' });
        console.log(`Deleted ${deleted.deletedCount} existing account(s)`);

        // Create fresh admin account — password will be hashed by pre-save hook
        const user = await User.create({
            name: 'Sandeep Admin',
            email: 'sandeep121@gmail.com',
            password: '12345678',
            role: 'admin',
            age: 25
        });

        // Verify the password hash works correctly
        const testUser = await User.findOne({ email: 'sandeep121@gmail.com' }).select('+password');
        const isMatch = await testUser.matchPassword('12345678');
        console.log('Password verification test:', isMatch ? 'PASSED ✓' : 'FAILED ✗');

        console.log('\n--- Admin Account Ready ---');
        console.log('Email:    sandeep121@gmail.com');
        console.log('Password: 12345678');
        console.log('Role:     admin');
        console.log('ID:       ' + user._id);

        await mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        await mongoose.connection.close();
        process.exit(1);
    }
}

seedAdmin();
