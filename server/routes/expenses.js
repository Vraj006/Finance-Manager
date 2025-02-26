// server/routes/expenses.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { addExpense, getExpenses, deleteExpense } = require('../controllers/expenseController');

router.post('/', auth, addExpense);
router.get('/', auth, getExpenses);
router.delete('/:id', auth, deleteExpense);

module.exports = router;