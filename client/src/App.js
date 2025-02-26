import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ThemeProvider } from '@mui/material';
// import { createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Import components
import Navbar from './components/layout/navbar';
import Login from './pages/Login';
import Register from './pages/Register';
// In your App.js, add the Dashboard import and route
import Dashboard from './pages/Dashboard';
import InvestmentDashboard from './components/InvestmentDashboard';
// In your routes

// import theme from './theme';
import Footer from './components/layout/footer';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import { Box } from '@mui/material';
import ThemeProvider from './components/style/ThemeProvider';


function App() {
  return (
    <ThemeProvider>
            <CssBaseline />
            <Router>
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    minHeight: '100vh'
                }}>
                    <Navbar />
                    <Box component="main" sx={{ flexGrow: 1 }}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/dashboard" element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            } />
                            <Route path="/investments" element={
                                <ProtectedRoute>
                                    <InvestmentDashboard />
                                </ProtectedRoute>
                            } />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                    </Box>
                    <Footer />
                </Box>
            </Router>
        </ThemeProvider>
  );
}

export default App;