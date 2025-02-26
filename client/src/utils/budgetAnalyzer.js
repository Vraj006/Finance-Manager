export const generateBudgetTips = (expenses, monthlyBudget) => {
    const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const remainingBudget = monthlyBudget - totalExpenses;
    const daysInMonth = new Date(new Date().getYear(), new Date().getMonth() + 1, 0).getDate();
    const remainingDays = daysInMonth - new Date().getDate();
    
    const tips = [];

    // Budget utilization tip
    const budgetUsagePercentage = (totalExpenses / monthlyBudget) * 100;
    if (budgetUsagePercentage > 80) {
        tips.push({
            type: 'warning',
            message: `You've used ${budgetUsagePercentage.toFixed(1)}% of your monthly budget. Consider reducing non-essential expenses.`
        });
    } else if (budgetUsagePercentage < 30) {
        tips.push({
            type: 'success',
            message: 'Great job managing your expenses! Consider saving the extra money.'
        });
    }

    // Daily spending limit tip
    if (remainingBudget > 0 && remainingDays > 0) {
        const dailyLimit = remainingBudget / remainingDays;
        tips.push({
            type: 'info',
            message: `To stay within budget, limit daily spending to $${dailyLimit.toFixed(2)} for the rest of the month.`
        });
    }

    // Category-specific tips
    const categoryTotals = expenses.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
    }, {});

    const highestCategory = Object.entries(categoryTotals)
        .sort(([,a], [,b]) => b - a)[0];

    if (highestCategory) {
        tips.push({
            type: 'info',
            message: `Your highest spending category is ${highestCategory[0]} ($${highestCategory[1].toFixed(2)}). Consider setting a category-specific budget.`
        });
    }

    return tips;
};