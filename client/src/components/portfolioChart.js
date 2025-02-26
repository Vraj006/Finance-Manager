import React from 'react';
import { Line } from 'react-chartjs-2';
import { Paper, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PortfolioChart = ({ portfolio }) => {
    // Add null check for portfolio
    if (!portfolio || !portfolio.stocks || portfolio.stocks.length === 0) {
        return (
            <Paper sx={{ p: 2, mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Portfolio Performance
                </Typography>
                <Typography color="textSecondary">
                    No portfolio data available
                </Typography>
            </Paper>
        );
    }

    const chartData = {
        labels: portfolio.stocks.map(stock => stock.symbol),
        datasets: [{
            label: 'Investment Amount ($)',
            data: portfolio.stocks.map(stock => stock.totalInvestment),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Portfolio Distribution'
            }
        }
    };

    return (
        <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" gutterBottom>
                Portfolio Performance
            </Typography>
            <Line data={chartData} options={options} />
        </Paper>
    );
};

export default PortfolioChart;