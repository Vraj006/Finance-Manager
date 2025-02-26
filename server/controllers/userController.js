// server/controllers/userController.js
const User = require('../models/User');

exports.updateBudget = async (req, res) => {
    try {
        const { monthlyBudget } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { monthlyBudget },
            { new: true }
        );
        res.json({ monthlyBudget: user.monthlyBudget });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getUserBudget = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json({ monthlyBudget: user.monthlyBudget });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
