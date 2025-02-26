import React, { useMemo } from 'react';
import {
  Paper,
  Typography,
  Box,
  useTheme
} from '@mui/material';
import {
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

const ExpenseCharts = ({ expenses }) => {
  const theme = useTheme();

  // Calculate category-wise totals for pie chart
  const categoryData = useMemo(() => {
    const totals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    return Object.entries(totals).map(([category, amount]) => ({
      category: category.charAt(0).toUpperCase() + category.slice(1),
      amount
    }));
  }, [expenses]);

  // Prepare data for trend line chart (last 7 days)
  const trendData = useMemo(() => {
    const last7Days = [...Array(7)].map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    const dailyTotals = expenses.reduce((acc, expense) => {
      const date = expense.date.split('T')[0];
      acc[date] = (acc[date] || 0) + expense.amount;
      return acc;
    }, {});

    return last7Days.map(date => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      amount: dailyTotals[date] || 0
    }));
  }, [expenses]);

  // Colors for pie chart
  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'
  ];

  return (
    <Paper sx={{ p: 2, height: '100%',mt:3 }}>
      <Typography variant="h6" gutterBottom>
        Expense Analysis
      </Typography>
      
      <Box sx={{ height: 300, mb: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          Category Distribution
        </Typography>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ category, percent }) => 
                `${category} ${(percent * 100).toFixed(0)}%`
              }
            >
              {categoryData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => `$${value.toFixed(2)}`}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      <Box sx={{ height: 300,pb:3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Daily Expense Trend (Last 7 Days)
        </Typography>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            <Legend />
            <Line
              type="monotone"
              dataKey="amount"
              stroke={theme.palette.primary.main}
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default ExpenseCharts;