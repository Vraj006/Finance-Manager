import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Paper, Typography, CircularProgress } from '@mui/material';
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
const ALPHA_VANTAGE_API_KEY = 'IWI7R8YBA56AD3IV';

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

const StockHistory = ({ symbol }) => {
    const [historicalData, setHistoricalData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistoricalData = async () => {
            if (!symbol) {
                setError('No symbol provided');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`);
                const data = await response.json();
                
                if (data['Time Series (Daily)']) {
                    setHistoricalData(data['Time Series (Daily)']);
                    setError(null);
                } else {
                    setError('No data available');
                }
            } catch (err) {
                setError('Error fetching data');
                console.error('Error fetching historical data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchHistoricalData();
    }, [symbol]);

    if (loading) {
        return (
            <Paper sx={{ p: 2, mt: 2, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Paper>
        );
    }

    if (error || !historicalData) {
        return (
            <Paper sx={{ p: 2, mt: 2 }}>
                <Typography color="error">
                    {error || 'No historical data available'}
                </Typography>
            </Paper>
        );
    }

    // Format data for chart
    const dates = Object.keys(historicalData).slice(0, 30); // Last 30 days
    const prices = dates.map(date => parseFloat(historicalData[date]['4. close']));

    const chartData = {
        labels: dates,
        datasets: [{
            label: `${symbol} Price History`,
            data: prices,
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
                text: `${symbol} - 30 Day Price History`
            }
        }
    };

    return (
        <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" gutterBottom>
                {symbol} Price History
            </Typography>
            <Line data={chartData} options={options} />
        </Paper>
    );
};

export default StockHistory;