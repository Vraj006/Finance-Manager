// server/routes/auth.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Add this line
const User = require('../models/User');
const { register, login } = require('../controllers/authController');



router.get('/user', auth, async (req, res) => {
    try {
        console.log('Fetching user data for user ID:', req.user.id);
        const user = await User.findById(req.user.id).select('-password'); // Fetch user data
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user); // Return user data
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/register', register);
router.post('/login', login);

module.exports = router;