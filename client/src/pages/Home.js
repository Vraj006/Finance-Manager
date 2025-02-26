// // import React from 'react';
// // import { 
// //     Container, 
// //     Typography, 
// //     Grid, 
// //     Card, 
// //     CardContent, 
// //     CardActions, 
// //     Button,
// //     Box 
// // } from '@mui/material';
// // import { useNavigate } from 'react-router-dom';
// // import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// // import ShowChartIcon from '@mui/icons-material/ShowChart';
// // import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
// // import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// // const Home = () => {
// //     const navigate = useNavigate();
// //     const [openAuthDialog, setOpenAuthDialog] = React.useState(false);
// //     const token = localStorage.getItem('token');

// //     const features = [
// //         {
// //             title: 'Expense Tracking',
// //             description: 'Track your daily expenses and categorize them efficiently. Get insights into your spending patterns.',
// //             icon: <MonetizationOnIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
// //             path: '/dashboard'
// //         },
// //         {
// //             title: 'Investment Portfolio',
// //             description: 'Manage your investment portfolio with real-time stock tracking and performance analytics.',
// //             icon: <ShowChartIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
// //             path: '/investments'
// //         },
// //         {
// //             title: 'Budget Management',
// //             description: 'Set and manage budgets with smart alerts and recommendations for better financial planning.',
// //             icon: <AccountBalanceWalletIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
// //             path: '/dashboard'
// //         },
// //         {
// //             title: 'AI-Powered Insights',
// //             description: 'Get personalized financial insights and investment recommendations powered by AI.',
// //             icon: <TrendingUpIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
// //             path: '/investments'
// //         }
// //     ];

// //     return (
// //         <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
// //             {/* Hero Section */}
// //             <Box 
// //                 sx={{ 
// //                     bgcolor: 'primary.main', 
// //                     color: 'white', 
// //                     py: 8,
// //                     mb: 6
// //                 }}
// //             >
// //                 <Container maxWidth="lg">
// //                     <Typography variant="h2" component="h1" gutterBottom>
// //                         Finance Manager
// //                     </Typography>
// //                     <Typography variant="h5" component="h2" sx={{ mb: 4 }}>
// //                         Your all-in-one solution for personal finance management and investment tracking
// //                     </Typography>
// //                     {token ? (
// //                         // If logged in, show "Go to Dashboard" button
// //                         <Button 
// //                             variant="contained" 
// //                             color="secondary" 
// //                             size="large"
// //                             onClick={() => navigate('/dashboard')}
// //                         >
// //                             Go to Dashboard
// //                         </Button>
// //                     ) : (
// //                         // If not logged in, show "Get Started" button
// //                         <Button 
// //                             variant="contained" 
// //                             color="secondary" 
// //                             size="large"
// //                             onClick={() => navigate('/register')}
// //                         >
// //                             Get Started
// //                         </Button>
// //                     )}
// //                 </Container>
// //             </Box>

// //             {/* Features Section */}
// //             <Container maxWidth="lg" sx={{ mb: 6 }}>
// //                 <Grid container spacing={4}>
// //                     {features.map((feature, index) => (
// //                         <Grid item xs={12} md={6} key={index}>
// //                             <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
// //                                 <CardContent sx={{ flexGrow: 1 }}>
// //                                     <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
// //                                         {feature.icon}
// //                                     </Box>
// //                                     <Typography gutterBottom variant="h5" component="h2" align="center">
// //                                         {feature.title}
// //                                     </Typography>
// //                                     <Typography align="center">
// //                                         {feature.description}
// //                                     </Typography>
// //                                 </CardContent>
// //                                 <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
// //                                     <Button 
// //                                         variant="outlined" 
// //                                         color="primary"
// //                                         onClick={() => navigate(feature.path)}
// //                                     >
// //                                         Learn More
// //                                     </Button>
// //                                 </CardActions>
// //                             </Card>
// //                         </Grid>
// //                     ))}
// //                 </Grid>
// //             </Container>
// //         </Box>
// //     );
// // };

// // export default Home;








// import React, { useState, useEffect } from 'react';
// import { 
//     Container, 
//     Typography, 
//     Grid, 
//     Card, 
//     CardContent, 
//     CardActions, 
//     Button,
//     Box,
//     IconButton,
//     Tooltip
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// import ShowChartIcon from '@mui/icons-material/ShowChart';
// import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
// import { useThemeMode } from '../components/style/ThemeProvider';
// import DashboardIcon from '@mui/icons-material/Dashboard';

// const Home = () => {
//     const navigate = useNavigate();
//     const [openAuthDialog, setOpenAuthDialog] = useState(false);
//     const token = localStorage.getItem('token');
//     const { mode, toggleTheme } = useThemeMode();
//     const [user, setUser] = useState({ name: '' });

//     const taglines = [
//         "Your financial journey starts here.",
//         "Smart money management made simple.",
//         "Track, analyze, and grow your wealth.",
//         "Empowering your financial decisions."
//     ];
//     const [currentTagline, setCurrentTagline] = useState(taglines[0]);

//     // Rotate taglines every 5 seconds
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentTagline(taglines[Math.floor(Math.random() * taglines.length)]);
//         }, 5000);
//         return () => clearInterval(interval);
//     }, []);

//     // Fetch user data if logged in
//     useEffect(() => {
//         if (token) {
//             const fetchUser = async () => {
//                 try {
//                     const response = await fetch('http://localhost:5000/api/auth/user', {
//                         headers: {
//                             'Authorization': `Bearer ${token}`
//                         }
//                     });
//                     if (response.ok) {
//                         const data = await response.json();
//                         setUser(data);
//                     } else {
//                         console.error('Failed to fetch user data');
//                     }
//                 } catch (error) {
//                     console.error('Error fetching user data:', error);
//                 }
//             };
//             fetchUser();
//         }
//     }, [token]);

//     const features = [
//         {
//             title: 'Expense Tracking',
//             description: 'Track your daily expenses and categorize them efficiently. Get insights into your spending patterns.',
//             icon: <MonetizationOnIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
//             path: '/dashboard'
//         },
//         {
//             title: 'Investment Portfolio',
//             description: 'Manage your investment portfolio with real-time stock tracking and performance analytics.',
//             icon: <ShowChartIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
//             path: '/investments'
//         },
//         {
//             title: 'Budget Management',
//             description: 'Set and manage budgets with smart alerts and recommendations for better financial planning.',
//             icon: <AccountBalanceWalletIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
//             path: '/dashboard'
//         },
//         {
//             title: 'AI-Powered Insights',
//             description: 'Get personalized financial insights and investment recommendations powered by AI.',
//             icon: <TrendingUpIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
//             path: '/investments'
//         }
//     ];

//     return (
//         <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
//             {/* Dark Mode Toggle Button */}
//             <Box sx={{ position: 'absolute', top: 72, right: 16 }}>
//                 <Tooltip title={mode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}>
//                     <IconButton onClick={toggleTheme} color="inherit">
//                         {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
//                     </IconButton>
//                 </Tooltip>
//             </Box>

//             {/* Hero Section */}
//             <Box 
//                 sx={{ 
//                     background: mode === 'light' ? 'linear-gradient(135deg, #2196F3, #4CAF50)' : 'linear-gradient(135deg, #1E3A8A, #065F46)', 
//                     color: 'white', 
//                     py: 8,
//                     mb: 6,
//                     borderRadius: 2,
//                     textAlign: 'center'
//                 }}
//             >
//                 <Container maxWidth="lg">
//                     <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
//                         {token ? `Welcome back, ${user.name}!` : 'Take Control of Your Finances'}
//                     </Typography>
//                     <Typography variant="h5" component="h2" sx={{ mb: 4 }}>
//                         {currentTagline}
//                     </Typography>
//                     {token ? (
//                         <Button 
//                             variant="contained" 
//                             color="secondary" 
//                             size="large"
//                             startIcon={<DashboardIcon />}
//                             onClick={() => navigate('/dashboard')}
//                         >
//                             Go to Dashboard
//                         </Button>
//                     ) : (
//                         <Button 
//                             variant="contained" 
//                             color="secondary" 
//                             size="large"
//                             startIcon={<HowToRegIcon />}
//                             onClick={() => navigate('/register')}
//                         >
//                             Get Started
//                         </Button>
//                     )}
//                 </Container>
//             </Box>

//             {/* Features Section */}
//             <Container maxWidth="lg" sx={{ mb: 6 }}>
//                 <Grid container spacing={4}>
//                     {features.map((feature, index) => (
//                         <Grid item xs={12} md={6} key={index}>
//                             <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//                                 <CardContent sx={{ flexGrow: 1 }}>
//                                     <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
//                                         {feature.icon}
//                                     </Box>
//                                     <Typography gutterBottom variant="h5" component="h2" align="center">
//                                         {feature.title}
//                                     </Typography>
//                                     <Typography align="center">
//                                         {feature.description}
//                                     </Typography>
//                                 </CardContent>
//                                 <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
//                                     <Button 
//                                         variant="outlined" 
//                                         color="primary"
//                                         onClick={() => navigate(feature.path)}
//                                     >
//                                         Learn More
//                                     </Button>
//                                 </CardActions>
//                             </Card>
//                         </Grid>
//                     ))}
//                 </Grid>
//             </Container>
//         </Box>
//     );
// };

// export default Home;



import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Typography, 
    Grid, 
    Card, 
    CardContent, 
    CardActions, 
    Button,
    Box,
    IconButton,
    Tooltip,
    Paper,
    Avatar,
    Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import WaveBorder from '../components/style/WaveBorder'; // You'll need to create this component
import { useThemeMode } from '../components/style/ThemeProvider';

const Home = () => {
    const navigate = useNavigate();
    const [openAuthDialog, setOpenAuthDialog] = useState(false);
    const token = localStorage.getItem('token');
    const { mode, toggleTheme } = useThemeMode();
    const [user, setUser] = useState({ name: '' });

    const taglines = [
        "Your financial journey starts here.",
        "Smart money management made simple.",
        "Track, analyze, and grow your wealth.",
        "Empowering your financial decisions."
    ];
    const [currentTagline, setCurrentTagline] = useState(taglines[0]);
    const [taglineIndex, setTaglineIndex] = useState(0);

    // Rotate taglines with smooth transition
    useEffect(() => {
        const interval = setInterval(() => {
            setTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setCurrentTagline(taglines[taglineIndex]);
    }, [taglineIndex]);

    // Fetch user data if logged in
    useEffect(() => {
        if (token) {
            const fetchUser = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/user`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setUser(data);
                    } else {
                        console.error('Failed to fetch user data');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };
            fetchUser();
        }
    }, [token]);

    const features = [
        {
            title: 'Expense Tracking',
            description: 'Track your daily expenses and categorize them efficiently. Get insights into your spending patterns.',
            icon: <MonetizationOnIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
            path: '/dashboard'
        },
        {
            title: 'Investment Portfolio',
            description: 'Manage your investment portfolio with real-time stock tracking and performance analytics.',
            icon: <ShowChartIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
            path: '/investments'
        },
        {
            title: 'Budget Management',
            description: 'Set and manage budgets with smart alerts and recommendations for better financial planning.',
            icon: <AccountBalanceWalletIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
            path: '/dashboard'
        },
        {
            title: 'AI-Powered Insights',
            description: 'Get personalized financial insights and investment recommendations powered by AI.',
            icon: <TrendingUpIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
            path: '/investments'
        }
    ];

    // Create the WaveBorder component in a separate file
    // This will be needed for the wave effect at the bottom of the hero section

    return (
        
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            
            {/* Dark Mode Toggle Button - Moved to a more integrated position */}
            <Box sx={{ position: 'absolute', top: 125, right: 16, zIndex: 10 }}>
                <Paper 
                    elevation={4} 
                    sx={{ 
                        borderRadius: '50%', 
                        width: 40, 
                        height: 40, 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.5)'
                    }}
                >
                    <Tooltip title={mode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}>
                        <IconButton onClick={toggleTheme} size="small">
                            {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                        </IconButton>
                    </Tooltip>
                </Paper>
            </Box>

            {/* Hero Section - Completely redesigned */}
            <Box 
                sx={{ 
                    position: 'relative',
                    overflow: 'hidden',
                    mt: 0, // Remove margin top to eliminate gap with navbar
                    pt: 12, // Add padding top to account for navbar height
                    pb: 16, // Extra padding at bottom for the wave effect
                    background: mode === 'light' 
                        ? 'radial-gradient(circle at 30% 20%, #2196F3, #4CAF50)'
                        : 'radial-gradient(circle at 30% 20%, #1E3A8A, #065F46)',
                    color: 'white',
                }}
            >
                <WaveBorder color="#000" position="top" />
                {/* Decorative Elements */}
                <Box 
                    sx={{ 
                        position: 'absolute', 
                        top: '10%', 
                        left: '5%', 
                        width: 200, 
                        height: 200, 
                        borderRadius: '50%', 
                        backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    }} 
                />
                <Box 
                    sx={{ 
                        position: 'absolute', 
                        bottom: '20%', 
                        right: '10%', 
                        width: 150, 
                        height: 150, 
                        borderRadius: '50%', 
                        backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    }} 
                />
                
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                                <Typography 
                                    variant="h2" 
                                    component="h1" 
                                    gutterBottom 
                                    sx={{ 
                                        fontWeight: 'bold',
                                        textShadow: '0px 2px 4px rgba(0,0,0,0.2)',
                                        fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' }
                                    }}
                                >
                                    {token ? `Welcome back, ${user.name}!` : 'Take Control of Your Finances'}
                                </Typography>
                                
                                <Box sx={{ 
                                    minHeight: '3rem',
                                    display: 'flex',
                                    alignItems: 'center', 
                                    justifyContent: { xs: 'center', md: 'flex-start' },
                                    mb: 4
                                }}>
                                    <Typography 
                                        variant="h5" 
                                        component="h2" 
                                        sx={{ 
                                            opacity: 0.9,
                                            transition: 'opacity 0.5s ease'
                                        }}
                                    >
                                        {currentTagline}
                                    </Typography>
                                </Box>
                                
                                <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                    {token ? (
                                        <Button 
                                            variant="contained" 
                                            color="secondary" 
                                            size="large"
                                            startIcon={<DashboardIcon />}
                                            onClick={() => navigate('/dashboard')}
                                            sx={{ 
                                                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                                                borderRadius: '28px',
                                                px: 4,
                                                py: 1.5,
                                                fontWeight: 'bold',
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
                                                    transition: 'all 0.3s ease'
                                                }
                                            }}
                                        >
                                            Go to Dashboard
                                        </Button>
                                    ) : (
                                        <Button 
                                            variant="contained" 
                                            color="secondary" 
                                            size="large"
                                            startIcon={<HowToRegIcon />}
                                            onClick={() => navigate('/register')}
                                            sx={{ 
                                                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                                                borderRadius: '28px',
                                                px: 4,
                                                py: 1.5,
                                                fontWeight: 'bold',
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
                                                    transition: 'all 0.3s ease'
                                                }
                                            }}
                                        >
                                            Get Started
                                        </Button>
                                    )}
                                </Box>
                            </Box>
                        </Grid>
                        
                        {/* Hero Image/Illustration on the right side */}
                        <Grid item xs={12} md={6}>
                        
                            <Box 
                                sx={{ 
                                    display: { xs: 'none', md: 'flex' },
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%'
                                }}
                            >
                                <Paper 
                                    elevation={6} 
                                    sx={{ 
                                        width: '90%',
                                        height: 340,
                                        borderRadius: 4,
                                        overflow: 'hidden',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.6)',
                                        transform: 'rotate(-3deg)',
                                        boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                                        position: 'relative'
                                    }}
                                >
                                    {/* Mock dashboard UI */}
                                    <Box sx={{ p: 2, color: mode === 'light' ? 'text.primary' : 'white' }}>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Financial Dashboard</Typography>
                                        <Divider sx={{ mb: 2 }} />
                                        
                                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                            <Paper sx={{ 
                                                flex: 1, 
                                                p: 1.5, 
                                                bgcolor: mode === 'light' ? 'primary.light' : 'primary.dark',
                                                color: 'white',
                                                textAlign: 'center'
                                            }}>
                                                <Typography variant="body2">Monthly Savings</Typography>
                                                <Typography variant="h6">$1,240</Typography>
                                            </Paper>
                                            <Paper sx={{ 
                                                flex: 1, 
                                                p: 1.5, 
                                                bgcolor: mode === 'light' ? 'secondary.light' : 'secondary.dark',
                                                color: 'white',
                                                textAlign: 'center'
                                            }}>
                                                <Typography variant="body2">Investments</Typography>
                                                <Typography variant="h6">$8,650</Typography>
                                            </Paper>
                                        </Box>
                                        
                                        <Typography variant="subtitle2" sx={{ mb: 1 }}>Recent Transactions</Typography>
                                        {[1, 2, 3].map(item => (
                                            <Box key={item} sx={{ 
                                                display: 'flex', 
                                                justifyContent: 'space-between', 
                                                alignItems: 'center',
                                                p: 1,
                                                mb: 1,
                                                borderRadius: 1,
                                                bgcolor: mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.05)'
                                            }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Avatar sx={{ 
                                                        width: 24, 
                                                        height: 24, 
                                                        bgcolor: item % 2 === 0 ? 'primary.main' : 'secondary.main',
                                                        mr: 1
                                                    }}>
                                                        {item % 2 === 0 ? <MonetizationOnIcon fontSize="small" /> : <ShoppingCartIcon fontSize="small" />}
                                                    </Avatar>
                                                    <Typography variant="body2">
                                                        {item % 2 === 0 ? 'Grocery Shopping' : 'Salary Deposit'}
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                    {item % 2 === 0 ? '-$85.20' : '+$2,750.00'}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Paper>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
                


                {/* Wave border at the bottom */}
                <Box sx={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: 50, overflow: 'hidden' }}>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 1440 320" 
                        style={{ 
                            position: 'absolute', 
                            bottom: 0, 
                            width: '100%', 
                            height: 'auto'
                        }}
                    >
                        <path 
                            fill={mode === 'light' ? '#fff' : '#121212'} 
                            fillOpacity="1" 
                            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,144C960,117,1056,107,1152,96C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        />
                    </svg>
                </Box>
                            <WaveBorder color="#000" position="bottom" />
            </Box>
            
            {/* Features Section */}
            <Container maxWidth="lg" sx={{ my: 8, position: 'relative', zIndex: 1 }}>
                
                <Grid container spacing={4}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <Card 
                                sx={{ 
                                    height: '100%', 
                                    display: 'flex', 
                                    flexDirection: 'column',
                                    borderRadius: 3,
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: 8
                                    }
                                }}
                            >
                                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                    <Box sx={{ 
                                        display: 'flex', 
                                        justifyContent: 'center', 
                                        mb: 2,
                                        p: 1.5,
                                        bgcolor: mode === 'light' ? 'rgba(33, 150, 243, 0.1)' : 'rgba(33, 150, 243, 0.05)',
                                        borderRadius: '50%',
                                        width: 80,
                                        height: 80,
                                        mx: 'auto',
                                        alignItems: 'center'
                                    }}>
                                        {feature.icon}
                                    </Box>
                                    <Typography gutterBottom variant="h5" component="h2" align="center" sx={{ fontWeight: 'bold' }}>
                                        {feature.title}
                                    </Typography>
                                    <Typography align="center" variant="body1" color="text.secondary">
                                        {feature.description}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                                    <Button 
                                        variant="outlined" 
                                        color="primary"
                                        onClick={() => navigate(feature.path)}
                                        sx={{ 
                                            borderRadius: '20px',
                                            px: 3,
                                            '&:hover': {
                                                bgcolor: 'primary.main',
                                                color: 'white'
                                            }
                                        }}
                                    >
                                        Learn More
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Home;