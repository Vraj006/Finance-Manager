// server/routes/users.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { updateBudget, getUserBudget } = require('../controllers/userController');

router.put('/budget', auth, updateBudget);
router.get('/budget', auth, getUserBudget);

// routes/users.js
router.get('/income', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('monthlyIncome');
        res.json({ monthlyIncome: user.monthlyIncome });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;