// // import React, { useState, useEffect } from 'react';
// // import {
// //     Container,
// //     Grid,
// //     Paper,
// //     TextField,
// //     Button,
// //     Typography,
// //     Table,
// //     TableBody,
// //     TableCell,
// //     TableContainer,
// //     TableHead,
// //     TableRow,
// //     CircularProgress,
// //     Dialog,
// //     DialogTitle,
// //     DialogContent,
// //     DialogActions
// // } from '@mui/material';
// // import { Line } from 'react-chartjs-2';
// // import { stockService } from '../services/stockService';
// // import { aiService } from '../services/aiService';
// // // Add imports
// // import PortfolioChart from './portfolioChart';
// // import StockHistory from './StockHistory';

// // const InvestmentDashboard = () => {
// // const [searchQuery, setSearchQuery] = useState('');
// // const [searchResults, setSearchResults] = useState([]);
// // const [searchError, setSearchError] = useState('');
// // const [portfolio, setPortfolio] = useState(null);
// // const [selectedStock, setSelectedStock] = useState(null);
// // const [shares, setShares] = useState('');
// // const [sellShares, setSellShares] = useState('');
// // const [selectedSellStock, setSelectedSellStock] = useState(null);
// // const [recommendations, setRecommendations] = useState('');
// // const [loading, setLoading] = useState(false);

// // const fetchRecommendations = async () => {
// //     if (!portfolio || !portfolio.stocks || portfolio.stocks.length === 0) {
// //         setRecommendations("Add some stocks to your portfolio to get AI recommendations.");
// //         return;
// //       }

// //     setLoading(true);
// //     try {
// //         const riskProfile = 'moderate'; // This could be user-defined
// //         const recommendations = await aiService.getInvestmentRecommendations(
// //             portfolio,
// //             riskProfile
// //         );
// //         setRecommendations(recommendations);
// //     } catch (error) {
// //         console.error('Error fetching recommendations:', error);
// //     } finally {
// //         setLoading(false);
// //     }
// // };

// // useEffect(() => {
// //     if (portfolio) {
// //         fetchRecommendations();
// //     }
// // }, [portfolio]);

// // useEffect(() => {
// //     fetchPortfolio();
// // }, []);

// // const fetchPortfolio = async () => {
// //     try {
// //         const response = await fetch('http://localhost:5000/api/portfolio', {
// //             headers: {
// //                 'Authorization': `Bearer ${localStorage.getItem('token')}`
// //             }
// //         });
// //         const data = await response.json();
// //         setPortfolio(data);
// //     } catch (error) {
// //         console.error('Error fetching portfolio:', error);
// //     }
// // };

// // const handleSearch = async () => {
// //     if (!searchQuery.trim()) return;

// //     setLoading(true);
// //     try {
// //         const results = await stockService.searchStocks(searchQuery);
// //         if (results.length === 0) {
// //             // Show a message when no results are found
// //             setSearchError('No stocks found. Try a different search term.');
// //         } else {
// //             setSearchResults(results);
// //             setSearchError('');
// //         }
// //     } catch (error) {
// //         console.error('Search error:', error);
// //         setSearchError('Error searching for stocks. Please try again.');
// //     } finally {
// //         setLoading(false);
// //     }
// // };

// // const handleStockSelect = async (stock) => {
// //     const quote = await stockService.getStockQuote(stock['1. symbol']);
// //     setSelectedStock({ ...stock, quote });
// // };

// // const handleBuyStock = async () => {
// //     if (!selectedStock || !shares) return;

// //     try {
// //         const response = await fetch('http://localhost:5000/api/portfolio/buy', {
// //             method: 'POST',
// //             headers: {
// //                 'Content-Type': 'application/json',
// //                 'Authorization': `Bearer ${localStorage.getItem('token')}`
// //             },
// //             body: JSON.stringify({
// //                 symbol: selectedStock['1. symbol'],
// //                 companyName: selectedStock['2. name'],
// //                 shares: Number(shares),
// //                 price: Number(selectedStock.quote['05. price'])
// //             })
// //         });

// //         if (response.ok) {
// //             fetchPortfolio();
// //             setShares('');
// //             setSelectedStock(null);
// //         }
// //     } catch (error) {
// //         console.error('Error buying stock:', error);
// //     }
// // };

// // const handleSellStock = async () => {
// //     if (!selectedSellStock || !sellShares) return;

// //     try {
// //         const response = await fetch('http://localhost:5000/api/portfolio/sell', {
// //             method: 'POST',
// //             headers: {
// //                 'Content-Type': 'application/json',
// //                 'Authorization': `Bearer ${localStorage.getItem('token')}`
// //             },
// //             body: JSON.stringify({
// //                 symbol: selectedSellStock.symbol,
// //                 shares: Number(sellShares),
// //                 price: Number(selectedSellStock.currentPrice)
// //             })
// //         });

// //         if (response.ok) {
// //             fetchPortfolio();
// //             setSellShares('');
// //             setSelectedSellStock(null);
// //         }
// //     } catch (error) {
// //         console.error('Error selling stock:', error);
// //     }
// // };

// //     return (
// //         <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
// //             <Grid container spacing={3}>
// //                 {/* Stock Search Section */}
// //                 <Grid item xs={12} md={6}>
// //                     <Paper sx={{ p: 2 }}>
// //                         <Typography variant="h6" gutterBottom>
// //                             Search Stocks
// //                         </Typography>
// //                         <TextField
// //                             fullWidth
// //                             label="Search stocks"
// //                             value={searchQuery}
// //                             onChange={(e) => setSearchQuery(e.target.value)}
// //                             sx={{ mb: 2 }}
// //                             error={Boolean(searchError)}
// //                             helperText={searchError}
// //                         />
// //                         <Button
// //                             variant="contained"
// //                             onClick={handleSearch}
// //                             disabled={loading}
// //                             sx={{ mb: 2 }}
// //                         >
// //                             {loading ? 'Searching...' : 'Search'}
// //                         </Button>
// //                         {loading && <CircularProgress size={24} sx={{ ml: 2 }} />}
// //                         {searchResults.length > 0 && (
// //                             <TableContainer>
// //                                 <Table>
// //                                     <TableHead>
// //                                         <TableRow>
// //                                             <TableCell>Symbol</TableCell>
// //                                             <TableCell>Name</TableCell>
// //                                             <TableCell>Action</TableCell>
// //                                         </TableRow>
// //                                     </TableHead>
// //                                     <TableBody>
// //                                         {searchResults.map((stock) => (
// //                                             <TableRow key={stock['1. symbol']}>
// //                                                 <TableCell>{stock['1. symbol']}</TableCell>
// //                                                 <TableCell>{stock['2. name']}</TableCell>
// //                                                 <TableCell>
// //                                                     <Button
// //                                                         variant="outlined"
// //                                                         onClick={() => handleStockSelect(stock)}
// //                                                     >
// //                                                         Select
// //                                                     </Button>
// //                                                 </TableCell>
// //                                             </TableRow>
// //                                         ))}
// //                                     </TableBody>
// //                                 </Table>
// //                             </TableContainer>
// //                         )}
// //                     </Paper>
// //                 </Grid>

// //                 {/* Stock Purchase Section */}
// //                 <Grid item xs={12} md={6}>
// //                     <Paper sx={{ p: 2 }}>
// //                         <Typography variant="h6" gutterBottom>
// //                             Buy Stocks
// //                         </Typography>
// //                         {selectedStock && (
// //                             <>
// //                                 <Typography>
// //                                     Selected: {selectedStock['2. name']} ({selectedStock['1. symbol']})
// //                                 </Typography>
// //                                 <Typography>
// //                                     Current Price: ${selectedStock.quote?.['05. price']}
// //                                 </Typography>
// //                                 <TextField
// //                                     type="number"
// //                                     label="Number of shares"
// //                                     value={shares}
// //                                     onChange={(e) => setShares(e.target.value)}
// //                                     sx={{ my: 2 }}
// //                                 />
// //                                 <Button
// //                                     variant="contained"
// //                                     onClick={handleBuyStock}
// //                                     disabled={!shares}
// //                                 >
// //                                     Buy
// //                                 </Button>
// //                             </>
// //                         )}
// //                     </Paper>
// //                 </Grid>

// //                 {/* Portfolio Section */}
// //                 <Grid item xs={12}>
// //                     <Paper sx={{ p: 2 }}>
// //                         <Typography variant="h6" gutterBottom>
// //                             Your Portfolio
// //                         </Typography>
// //                         {loading ? (
// //                             <CircularProgress />
// //                         ) : portfolio && portfolio.stocks && portfolio.stocks.length > 0 ? (
// //                             <TableContainer>
// //                                 <Table>
// //                                     <TableHead>
// //                                         <TableRow>
// //                                             <TableCell>Symbol</TableCell>
// //                                             <TableCell>Company</TableCell>
// //                                             <TableCell>Shares</TableCell>
// //                                             <TableCell>Avg. Buy Price</TableCell>
// //                                             <TableCell>Total Investment</TableCell>
// //                                             <TableCell>Actions</TableCell>
// //                                         </TableRow>
// //                                     </TableHead>
// //                                     <TableBody>
// //                                         {portfolio.stocks.map((stock) => (
// //                                             <TableRow key={stock.symbol}>
// //                                                 <TableCell>{stock.symbol}</TableCell>
// //                                                 <TableCell>{stock.companyName}</TableCell>
// //                                                 <TableCell>{stock.shares}</TableCell>
// //                                                 <TableCell>${stock.averageBuyPrice.toFixed(2)}</TableCell>
// //                                                 <TableCell>${stock.totalInvestment.toFixed(2)}</TableCell>
// //                                                 <TableCell>
// //                                                     <Button variant="outlined" color="error" onClick={() => setSelectedSellStock(stock)}>
// //                                                         Sell
// //                                                     </Button>
// //                                                 </TableCell>
// //                                             </TableRow>
// //                                         ))}
// //                                     </TableBody>
// //                                 </Table>
// //                             </TableContainer>
// //                         ) : (
// //                             <Typography>No stocks in portfolio</Typography>
// //                         )}
// //                     </Paper>
// //                 </Grid>

// //                 {portfolio && (
// //                     <Grid item xs={12}>
// //                         <PortfolioChart portfolio={portfolio} />
// //                     </Grid>
// //                 )}

// //                 {portfolio && portfolio.stocks && portfolio.stocks.map(stock => (
// //                     <Grid item xs={12} key={stock.symbol}>
// //                         <StockHistory symbol={stock.symbol} />
// //                     </Grid>
// //                 ))}

// //                 {/* AI Recommendations Section */}
// //                 <Grid item xs={12}>
// //                     <Paper sx={{ p: 2 }}>
// //                         <Typography variant="h6" gutterBottom>
// //                             AI Investment Recommendations
// //                         </Typography>
// //                         {loading ? (
// //                             <CircularProgress />
// //                         ) : (
// //                             <Typography component="div" sx={{ whiteSpace: 'pre-line' }}>
// //     {recommendations}
// // </Typography>
// //                         )}
// //                     </Paper>
// //                 </Grid>
// //                 {/* Add Sell Dialog */}
// //                 {selectedSellStock && (
// //                     <Dialog open={Boolean(selectedSellStock)} onClose={() => setSelectedSellStock(null)}>
// //                         <DialogTitle>Sell {selectedSellStock.symbol}</DialogTitle>
// //                         <DialogContent>
// //                             <TextField
// //                                 type="number"
// //                                 label="Number of shares to sell"
// //                                 value={sellShares}
// //                                 onChange={(e) => setSellShares(e.target.value)}
// //                                 fullWidth
// //                                 margin="normal"
// //                                 inputProps={{
// //                                     max: selectedSellStock.shares,
// //                                     min: 1
// //                                 }}
// //                             />
// //                         </DialogContent>
// //                         <DialogActions>
// //                             <Button onClick={() => setSelectedSellStock(null)}>Cancel</Button>
// //                             <Button
// //                                 onClick={handleSellStock}
// //                                 variant="contained"
// //                                 color="error"
// //                                 disabled={!sellShares || sellShares > selectedSellStock.shares}
// //                             >
// //                                 Sell
// //                             </Button>
// //                         </DialogActions>
// //                     </Dialog>
// //                 )}
// //             </Grid>
// //         </Container>
// //     );
// // };

// // export default InvestmentDashboard;


























// import React, { useState, useEffect } from 'react';
// import {
//     Container,
//     Grid,
//     Paper,
//     TextField,
//     Button,
//     Typography,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     CircularProgress,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Box,
//     IconButton,
//     useTheme
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
// import { Line } from 'react-chartjs-2';
// import { stockService } from '../services/stockService';
// import { aiService } from '../services/aiService';
// import PortfolioChart from './portfolioChart';
// import StockHistory from './StockHistory';
// import { useThemeMode } from '../components/style/ThemeProvider';
// import PageTransition from '../components/style/PageTransition';
// import StatisticsCard from '../components/style/StatisticsCard';

// const InvestmentDashboard = () => {
//     //     // ... existing state declarations ...
//     //     const theme = useTheme();
//     //     const { mode, toggleTheme } = useThemeMode();

//     //     // ... existing useEffect and handler functions ...

//     //     const [searchQuery, setSearchQuery] = useState('');
//     //     const [searchResults, setSearchResults] = useState([]);
//     //     const [searchError, setSearchError] = useState('');
//     //     const [portfolio, setPortfolio] = useState(null);
//     //     const [selectedStock, setSelectedStock] = useState(null);
//     //     const [shares, setShares] = useState('');
//     //     const [sellShares, setSellShares] = useState('');
//     //     const [selectedSellStock, setSelectedSellStock] = useState(null);
//     //     const [recommendations, setRecommendations] = useState('');
//     //     const [loading, setLoading] = useState(false);


//     const [searchQuery, setSearchQuery] = useState('');
//     const [searchResults, setSearchResults] = useState([]);
//     const [searchError, setSearchError] = useState('');
//     const [searchLoading, setSearchLoading] = useState(false);
//     const [portfolio, setPortfolio] = useState({
//         stocks: [],
//         totalValue: 0,
//         totalInvestment: 0,
//         totalReturns: 0
//     });
//     const [selectedStock, setSelectedStock] = useState(null);
//     const [shares, setShares] = useState('');
//     const [sellShares, setSellShares] = useState('');
//     const [selectedSellStock, setSelectedSellStock] = useState(null);
//     const [recommendations, setRecommendations] = useState('');
//     const [loading, setLoading] = useState(true);

//     const theme = useTheme();
//     const { mode, toggleTheme } = useThemeMode();

//     const fetchRecommendations = async () => {
//         if (!portfolio || !portfolio.stocks || portfolio.stocks.length === 0) {
//             setRecommendations("Add some stocks to your portfolio to get AI recommendations.");
//             return;
//         }

//         setLoading(true);
//         try {
//             const riskProfile = 'moderate'; // This could be user-defined
//             const recommendations = await aiService.getInvestmentRecommendations(
//                 portfolio,
//                 riskProfile
//             );
//             setRecommendations(recommendations);
//         } catch (error) {
//             console.error('Error fetching recommendations:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (portfolio) {
//             fetchRecommendations();
//         }
//     }, [portfolio]);

//     useEffect(() => {
//         fetchPortfolio();
//     }, []);

//     // const fetchPortfolio = async () => {
//     //     try {
//     //         const response = await fetch('http://localhost:5000/api/portfolio', {
//     //             headers: {
//     //                 'Authorization': `Bearer ${localStorage.getItem('token')}`
//     //             }
//     //         });
//     //         const data = await response.json();
//     //         setPortfolio(data);
//     //     } catch (error) {
//     //         console.error('Error fetching portfolio:', error);
//     //     }
//     // };

//     // const fetchPortfolio = async () => {
//     //     try {
//     //         setLoading(true);
//     //         const response = await fetch('http://localhost:5000/api/portfolio', {
//     //             headers: {
//     //                 'Authorization': `Bearer ${localStorage.getItem('token')}`
//     //             }
//     //         });
//     //         const data = await response.json();
//     //         if (response.ok) {
//     //             setPortfolio(data);
//     //         } else {
//     //             console.error('Error fetching portfolio:', data.message);
//     //         }
//     //     } catch (error) {
//     //         console.error('Error:', error);
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // };

//     const fetchPortfolio = async () => {
//         try {
//             setLoading(true);
//             const response = await fetch('http://localhost:5000/api/portfolio', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 }
//             });
    
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
    
//             const data = await response.json();
            
//             if (data.success) {
//                 setPortfolio(data.portfolio);
//             } else {
//                 console.error('Error in portfolio data:', data.message);
//             }
//         } catch (error) {
//             console.error('Error fetching portfolio:', error.message);
//             setPortfolio({
//                 stocks: [],
//                 totalValue: 0,
//                 totalInvestment: 0,
//                 totalReturns: 0
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     // const handleSearch = async () => {
//     //     if (!searchQuery.trim()) return;

//     //     setLoading(true);
//     //     try {
//     //         const results = await stockService.searchStocks(searchQuery);
//     //         if (results.length === 0) {
//     //             // Show a message when no results are found
//     //             setSearchError('No stocks found. Try a different search term.');
//     //         } else {
//     //             setSearchResults(results);
//     //             setSearchError('');
//     //         }
//     //     } catch (error) {
//     //         console.error('Search error:', error);
//     //         setSearchError('Error searching for stocks. Please try again.');
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // };

//     const handleSearch = async () => {
//         if (!searchQuery.trim()) return;

//         setSearchLoading(true);
//         setSearchError('');
//         try {
//             const response = await fetch(`/api/stocks/search?query=${searchQuery}`, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 }
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 setSearchResults(data);
//             } else {
//                 setSearchError(data.message);
//             }
//         } catch (error) {
//             setSearchError('Error searching stocks');
//             console.error('Error:', error);
//         } finally {
//             setSearchLoading(false);
//         }
//     };

//     const handleStockSelect = async (stock) => {
//         const quote = await stockService.getStockQuote(stock['1. symbol']);
//         setSelectedStock({ ...stock, quote });
//     };

//     const handleBuyStock = async () => {
//         if (!selectedStock || !shares) return;

//         try {
//             const response = await fetch('http://localhost:5000/api/portfolio/buy', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 },
//                 body: JSON.stringify({
//                     symbol: selectedStock['1. symbol'],
//                     companyName: selectedStock['2. name'],
//                     shares: Number(shares),
//                     price: Number(selectedStock.quote['05. price'])
//                 })
//             });

//             if (response.ok) {
//                 fetchPortfolio();
//                 setShares('');
//                 setSelectedStock(null);
//             }
//         } catch (error) {
//             console.error('Error buying stock:', error);
//         }
//     };

//     const handleSellStock = async () => {
//         if (!selectedSellStock || !sellShares) return;

//         try {
//             const response = await fetch('http://localhost:5000/api/portfolio/sell', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 },
//                 body: JSON.stringify({
//                     symbol: selectedSellStock.symbol,
//                     shares: Number(sellShares),
//                     price: Number(selectedSellStock.currentPrice)
//                 })
//             });

//             if (response.ok) {
//                 fetchPortfolio();
//                 setSellShares('');
//                 setSelectedSellStock(null);
//             }
//         } catch (error) {
//             console.error('Error selling stock:', error);
//         }
//     };



//     const formatCurrency = (value) => {
//         if (value === undefined || value === null) return '$0.00';
//         return `$${Number(value).toFixed(2)}`;
//     };

//     // Helper function to format number
//     const formatNumber = (value) => {
//         if (value === undefined || value === null) return '0';
//         return Number(value).toFixed(2);
//     };


//     return (
//         <PageTransition>
//             <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//                 {/* Header with Theme Toggle */}
//                 <Box sx={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     mb: 4
//                 }}>
//                     <Typography variant="h4" gutterBottom>
//                         Investment Dashboard
//                     </Typography>
//                     <IconButton onClick={toggleTheme} color="inherit">
//                         {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
//                     </IconButton>
//                 </Box>

//                 {/* Portfolio Statistics Cards */}
//                 {/* <Grid container spacing={3} sx={{ mb: 4 }}>
//                     <Grid item xs={12} md={4}>
//                         <StatisticsCard
//                             title="Total Portfolio Value"
//                             value={portfolio.totalValue || 0}
//                             icon={<AccountBalanceIcon />}
//                             color="primary"
//                         />
//                     </Grid>
//                     <Grid item xs={12} md={4}>
//                         <StatisticsCard
//                             title="Total Investments"
//                             value={portfolio.totalInvestment || 0}
//                             icon={<ShoppingCartIcon />}
//                             color="success"
//                         />
//                     </Grid>
//                     <Grid item xs={12} md={4}>
//                         <StatisticsCard
//                             title="Total Returns"
//                             value={(portfolio.totalValue - portfolio?.totalInvestment) || 0}
//                             icon={<TrendingUpIcon />}
//                             color={portfolio?.totalValue - portfolio?.totalInvestment >= 0 ? "success" : "error"}
//                         />
//                     </Grid>
//                 </Grid> */}

//                 {/* <Grid container spacing={3} sx={{ mb: 4 }}>
//                     <Grid item xs={12} md={4}>
//                         <StatisticsCard
//                             title="Total Portfolio Value"
//                             value={portfolio.totalValue}
//                             icon={<AccountBalanceIcon />}
//                             color="primary"
//                         />
//                     </Grid>
//                     <Grid item xs={12} md={4}>
//                         <StatisticsCard
//                             title="Total Investments"
//                             value={portfolio.totalInvestment}
//                             icon={<ShoppingCartIcon />}
//                             color="success"
//                         />
//                     </Grid>
//                     <Grid item xs={12} md={4}>
//                         <StatisticsCard
//                             title="Total Returns"
//                             value={portfolio.totalReturns}
//                             icon={<TrendingUpIcon />}
//                             color={portfolio.totalReturns >= 0 ? "success" : "error"}
//                         />
//                     </Grid>
//                 </Grid> */}

// <Grid container spacing={3} sx={{ mb: 4 }}>
//                     <Grid item xs={12} md={4}>
//                         <StatisticsCard
//                             title="Total Portfolio Value"
//                             value={formatCurrency(portfolio?.totalValue || 0)}
//                             icon={<AccountBalanceIcon />}
//                             color="primary"
//                         />
//                     </Grid>
//                     <Grid item xs={12} md={4}>
//                         <StatisticsCard
//                             title="Total Investments"
//                             value={formatCurrency(portfolio?.totalInvestment || 0)}
//                             icon={<ShoppingCartIcon />}
//                             color="success"
//                         />
//                     </Grid>
//                     <Grid item xs={12} md={4}>
//                         <StatisticsCard
//                             title="Total Returns"
//                             value={formatCurrency(portfolio?.totalReturns || 0)}
//                             icon={<TrendingUpIcon />}
//                             color={portfolio?.totalReturns >= 0 ? "success" : "error"}
//                         />
//                     </Grid>
//                 </Grid>


//                 <Grid container spacing={3}>
//                     {/* Stock Search Section */}
//                     {/* <Grid item xs={12} md={6}>
//                         <Paper sx={{ 
//                             p: 3, 
//                             borderRadius: 2,
//                             transition: 'transform 0.2s',
//                             '&:hover': {
//                                 transform: 'translateY(-4px)',
//                                 boxShadow: 4
//                             }
//                         }}>
//                             <Typography variant="h6" gutterBottom>
//                                 Search Stocks
//                             </Typography>
//                             <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
//                                 <TextField
//                                     fullWidth
//                                     label="Search stocks"
//                                     value={searchQuery}
//                                     onChange={(e) => setSearchQuery(e.target.value)}
//                                     error={Boolean(searchError)}
//                                     helperText={searchError}
//                                     onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//                                 />
//                                 <Button
//                                     variant="contained"
//                                     onClick={handleSearch}
//                                     disabled={loading}
//                                     startIcon={<SearchIcon />}
//                                 >
//                                     Search
//                                 </Button>
//                             </Box>
//                             {loading && (
//                                 <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
//                                     <CircularProgress />
//                                 </Box>
//                             )}
//                             {searchResults.length > 0 && (
//                                 <TableContainer sx={{ 
//                                     maxHeight: 400,
//                                     '&::-webkit-scrollbar': {
//                                         width: '8px',
//                                     },
//                                     '&::-webkit-scrollbar-thumb': {
//                                         backgroundColor: theme.palette.mode === 'dark' ? '#555' : '#ccc',
//                                         borderRadius: '4px',
//                                     }
//                                 }}>
//                                     <Table stickyHeader>
//                                         <TableHead>
//                                             <TableRow>
//                                                 <TableCell>Symbol</TableCell>
//                                                 <TableCell>Name</TableCell>
//                                                 <TableCell align="right">Action</TableCell>
//                                             </TableRow>
//                                         </TableHead>
//                                         <TableBody>
//                                             {searchResults.map((stock) => (
//                                                 <TableRow 
//                                                     key={stock['1. symbol']}
//                                                     hover
//                                                     sx={{
//                                                         cursor: 'pointer',
//                                                         transition: 'background-color 0.2s'
//                                                     }}
//                                                 >
//                                                     <TableCell>{stock['1. symbol']}</TableCell>
//                                                     <TableCell>{stock['2. name']}</TableCell>
//                                                     <TableCell align="right">
//                                                         <Button
//                                                             variant="outlined"
//                                                             size="small"
//                                                             onClick={() => handleStockSelect(stock)}
//                                                         >
//                                                             Select
//                                                         </Button>
//                                                     </TableCell>
//                                                 </TableRow>
//                                             ))}
//                                         </TableBody>
//                                     </Table>
//                                 </TableContainer>
//                             )}
//                         </Paper>
//                     </Grid> */}

//                     {/* <Grid container spacing={3}> */}
//                         {/* <Grid item xs={12} md={6}>
//                             <Paper sx={{ p: 3, borderRadius: 2 }}>
//                                 <Typography variant="h6" gutterBottom>
//                                     Search Stocks
//                                 </Typography>
//                                 <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
//                                     <TextField
//                                         fullWidth
//                                         value={searchQuery}
//                                         onChange={(e) => setSearchQuery(e.target.value)}
//                                         placeholder="Enter stock symbol..."
//                                         variant="outlined"
//                                         size="small"
//                                     />
//                                     <Button
//                                         variant="contained"
//                                         onClick={handleSearch}
//                                         disabled={searchLoading}
//                                         startIcon={<SearchIcon />}
//                                     >
//                                         Search
//                                     </Button>
//                                 </Box>

//                                 {searchLoading && (
//                                     <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
//                                         <CircularProgress />
//                                     </Box>
//                                 )}

//                                 {searchError && (
//                                     <Typography color="error" sx={{ mt: 2 }}>
//                                         {searchError}
//                                     </Typography>
//                                 )}

//                                 {!searchLoading && searchResults && searchResults.length > 0 && (
//                                     <TableContainer>
//                                         <Table>
//                                             <TableHead>
//                                                 <TableRow>
//                                                     <TableCell>Symbol</TableCell>
//                                                     <TableCell>Name</TableCell>
//                                                     <TableCell align="right">Action</TableCell>
//                                                 </TableRow>
//                                             </TableHead>
//                                             <TableBody>
//                                                 {searchResults.map((stock) => (
//                                                     <TableRow key={stock['1. symbol']}>
//                                                         <TableCell>{stock['1. symbol']}</TableCell>
//                                                         <TableCell>{stock['2. name']}</TableCell>
//                                                         <TableCell align="right">
//                                                             <Button
//                                                                 variant="outlined"
//                                                                 size="small"
//                                                                 onClick={() => handleStockSelect(stock)}
//                                                             >
//                                                                 Select
//                                                             </Button>
//                                                         </TableCell>
//                                                     </TableRow>
//                                                 ))}
//                                             </TableBody>
//                                         </Table>
//                                     </TableContainer>
//                                 )}
//                             </Paper>
//                         </Grid> */}



//                         <Grid item xs={12}>
//                         <Paper sx={{ p: 3, borderRadius: 2 }}>
//                             <Typography variant="h6" gutterBottom>
//                                 Your Portfolio
//                             </Typography>
//                             <TableContainer>
//                                 <Table>
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell>Symbol</TableCell>
//                                             <TableCell>Company</TableCell>
//                                             <TableCell align="right">Shares</TableCell>
//                                             <TableCell align="right">Avg. Buy Price</TableCell>
//                                             <TableCell align="right">Current Price</TableCell>
//                                             <TableCell align="right">Total Value</TableCell>
//                                             <TableCell align="right">Returns</TableCell>
//                                             <TableCell align="right">Actions</TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {portfolio.stocks.map((stock) => (
//                                             <TableRow key={stock.symbol}>
//                                                 <TableCell>{stock.symbol}</TableCell>
//                                                 <TableCell>{stock.companyName}</TableCell>
//                                                 <TableCell align="right">
//                                                     {formatNumber(stock.shares)}
//                                                 </TableCell>
//                                                 <TableCell align="right">
//                                                     {formatCurrency(stock.averageBuyPrice)}
//                                                 </TableCell>
//                                                 <TableCell align="right">
//                                                     {formatCurrency(stock.currentPrice)}
//                                                 </TableCell>
//                                                 <TableCell align="right">
//                                                     {formatCurrency(stock.currentValue)}
//                                                 </TableCell>
//                                                 <TableCell 
//                                                     align="right"
//                                                     sx={{ 
//                                                         color: (stock.returns || 0) >= 0 
//                                                             ? 'success.main' 
//                                                             : 'error.main'
//                                                     }}
//                                                 >
//                                                     {formatCurrency(stock.returns)}
//                                                 </TableCell>
//                                                 <TableCell align="right">
//                                                     <Button
//                                                         variant="contained"
//                                                         color="error"
//                                                         size="small"
//                                                         onClick={() => setSelectedSellStock(stock)}
//                                                     >
//                                                         Sell
//                                                     </Button>
//                                                 </TableCell>
//                                             </TableRow>
//                                         ))}
//                                     </TableBody>
//                                 </Table>
//                             </TableContainer>
//                         </Paper>
//                     </Grid>

//                         {/* Stock Purchase Section */}
//                         <Grid item xs={12} md={6}>
//                             <Paper sx={{
//                                 p: 3,
//                                 borderRadius: 2,
//                                 height: '100%',
//                                 transition: 'transform 0.2s',
//                                 '&:hover': {
//                                     transform: 'translateY(-4px)',
//                                     boxShadow: 4
//                                 }
//                             }}>
//                                 <Typography variant="h6" gutterBottom>
//                                     Buy Stocks
//                                 </Typography>
//                                 {selectedStock ? (
//                                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//                                         <Typography variant="subtitle1" color="primary">
//                                             {selectedStock['2. name']} ({selectedStock['1. symbol']})
//                                         </Typography>
//                                         <Typography variant="h5">
//                                             ${selectedStock.quote?.['05. price']}
//                                         </Typography>
//                                         <TextField
//                                             type="number"
//                                             label="Number of shares"
//                                             value={shares}
//                                             onChange={(e) => setShares(e.target.value)}
//                                             fullWidth
//                                         />
//                                         <Button
//                                             variant="contained"
//                                             onClick={handleBuyStock}
//                                             disabled={!shares}
//                                             startIcon={<ShoppingCartIcon />}
//                                             sx={{ mt: 2 }}
//                                         >
//                                             Buy Shares
//                                         </Button>
//                                     </Box>
//                                 ) : (
//                                     <Typography color="textSecondary" sx={{ mt: 2 }}>
//                                         Select a stock to purchase
//                                     </Typography>
//                                 )}
//                             </Paper>
//                         </Grid>

//                         {/* Portfolio Section */}
//                         {/* <Grid item xs={12}>
//                         <Paper sx={{ 
//                             p: 3, 
//                             borderRadius: 2,
//                             transition: 'transform 0.2s',
//                             '&:hover': {
//                                 transform: 'translateY(-4px)',
//                                 boxShadow: 4
//                             }
//                         }}>
//                             <Typography variant="h6" gutterBottom>
//                                 Your Portfolio
//                             </Typography>
//                             {loading ? (
//                                 <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
//                                     <CircularProgress />
//                                 </Box>
//                             ) : portfolio?.stocks?.length > 0 ? (
//                                 <TableContainer>
//                                     <Table>
//                                         <TableHead>
//                                             <TableRow>
//                                                 <TableCell>Symbol</TableCell>
//                                                 <TableCell>Company</TableCell>
//                                                 <TableCell align="right">Shares</TableCell>
//                                                 <TableCell align="right">Avg. Price</TableCell>
//                                                 <TableCell align="right">Total Value</TableCell>
//                                                 <TableCell align="right">Actions</TableCell>
//                                             </TableRow>
//                                         </TableHead>
//                                         <TableBody>
//                                             {portfolio.stocks.map((stock) => (
//                                                 <TableRow 
//                                                     key={stock.symbol}
//                                                     hover
//                                                     sx={{
//                                                         '&:last-child td, &:last-child th': { border: 0 }
//                                                     }}
//                                                 >
//                                                     <TableCell component="th" scope="row">
//                                                         <Typography color="primary" fontWeight="medium">
//                                                             {stock.symbol}
//                                                         </Typography>
//                                                     </TableCell>
//                                                     <TableCell>{stock.companyName}</TableCell>
//                                                     <TableCell align="right">{stock.shares}</TableCell>
//                                                     <TableCell align="right">
//                                                         ${stock.averageBuyPrice.toFixed(2)}
//                                                     </TableCell>
//                                                     <TableCell align="right">
//                                                         ${stock.totalInvestment.toFixed(2)}
//                                                     </TableCell>
//                                                     <TableCell align="right">
//                                                         <Button
//                                                             variant="outlined"
//                                                             color="error"
//                                                             size="small"
//                                                             onClick={() => setSelectedSellStock(stock)}
//                                                         >
//                                                             Sell
//                                                         </Button>
//                                                     </TableCell>
//                                                 </TableRow>
//                                             ))}
//                                         </TableBody>
//                                     </Table>
//                                 </TableContainer>
//                             ) : (
//                                 <Typography color="textSecondary" sx={{ textAlign: 'center', my: 3 }}>
//                                     No stocks in portfolio
//                                 </Typography>
//                             )}
//                         </Paper>
//                     </Grid> */}


//                         {portfolio.stocks.length > 0 && (
//                             <Grid item xs={12}>
//                                 <Paper sx={{ p: 3, borderRadius: 2 }}>
//                                     <Typography variant="h6" gutterBottom>
//                                         Your Portfolio
//                                     </Typography>
//                                     <TableContainer>
//                                         <Table>
//                                             <TableHead>
//                                                 <TableRow>
//                                                     <TableCell>Symbol</TableCell>
//                                                     <TableCell>Company</TableCell>
//                                                     <TableCell align="right">Shares</TableCell>
//                                                     <TableCell align="right">Avg. Buy Price</TableCell>
//                                                     <TableCell align="right">Current Price</TableCell>
//                                                     <TableCell align="right">Total Value</TableCell>
//                                                     <TableCell align="right">Returns</TableCell>
//                                                     <TableCell align="right">Actions</TableCell>
//                                                 </TableRow>
//                                             </TableHead>
//                                             <TableBody>
//                                                 {portfolio.stocks.map((stock) => (
//                                                     <TableRow key={stock.symbol}>
//                                                         <TableCell>{stock.symbol}</TableCell>
//                                                         <TableCell>{stock.companyName}</TableCell>
//                                                         <TableCell align="right">{stock.shares}</TableCell>
//                                                         <TableCell align="right">${stock.averageBuyPrice.toFixed(2)}</TableCell>
//                                                         <TableCell align="right">${stock.currentPrice.toFixed(2)}</TableCell>
//                                                         <TableCell align="right">${stock.currentValue.toFixed(2)}</TableCell>
//                                                         <TableCell
//                                                             align="right"
//                                                             sx={{
//                                                                 color: stock.returns >= 0 ? 'success.main' : 'error.main'
//                                                             }}
//                                                         >
//                                                             ${stock.returns.toFixed(2)}
//                                                         </TableCell>
//                                                         <TableCell align="right">
//                                                             <Button
//                                                                 variant="contained"
//                                                                 color="error"
//                                                                 size="small"
//                                                                 onClick={() => setSelectedSellStock(stock)}
//                                                             >
//                                                                 Sell
//                                                             </Button>
//                                                         </TableCell>
//                                                     </TableRow>
//                                                 ))}
//                                             </TableBody>
//                                         </Table>
//                                     </TableContainer>
//                                 </Paper>
//                             </Grid>
//                         )}


//                         {/* Charts Section */}
//                         {/* {portfolio && (
//                         <>
//                             <Grid item xs={12}>
//                                 <Paper sx={{ 
//                                     p: 3, 
//                                     borderRadius: 2,
//                                     transition: 'transform 0.2s',
//                                     '&:hover': {
//                                         transform: 'translateY(-4px)',
//                                         boxShadow: 4
//                                     }
//                                 }}>
//                                     <Typography variant="h6" gutterBottom>
//                                         Portfolio Performance
//                                     </Typography>
//                                     <PortfolioChart portfolio={portfolio} />
//                                 </Paper>
//                             </Grid>
//                             {portfolio.stocks.map(stock => (
//                                 <Grid item xs={12} md={6} key={stock.symbol}>
//                                     <Paper sx={{ 
//                                         p: 3, 
//                                         borderRadius: 2,
//                                         transition: 'transform 0.2s',
//                                         '&:hover': {
//                                             transform: 'translateY(-4px)',
//                                             boxShadow: 4
//                                         }
//                                     }}>
//                                         <Typography variant="h6" gutterBottom>
//                                             {stock.symbol} History
//                                         </Typography>
//                                         <StockHistory symbol={stock.symbol} />
//                                     </Paper>
//                                 </Grid>
//                             ))}
//                         </>
//                     )} */}

//                         {portfolio.stocks.length > 0 && (
//                             <>
//                                 <Grid item xs={12}>
//                                     <Paper sx={{ p: 3, borderRadius: 2 }}>
//                                         <Typography variant="h6" gutterBottom>
//                                             Portfolio Performance
//                                         </Typography>
//                                         <PortfolioChart portfolio={portfolio} />
//                                     </Paper>
//                                 </Grid>
//                                 {portfolio.stocks.map(stock => (
//                                     <Grid item xs={12} md={6} key={stock.symbol}>
//                                         <Paper sx={{ p: 3, borderRadius: 2 }}>
//                                             <Typography variant="h6" gutterBottom>
//                                                 {stock.symbol} History
//                                             </Typography>
//                                             <StockHistory symbol={stock.symbol} />
//                                         </Paper>
//                                     </Grid>
//                                 ))}
//                             </>
//                         )}

//                         {/* AI Recommendations Section */}
                    //     <Grid item xs={12}>
                    //         <Paper sx={{
                    //             p: 3,
                    //             borderRadius: 2,
                    //             transition: 'transform 0.2s',
                    //             '&:hover': {
                    //                 transform: 'translateY(-4px)',
                    //                 boxShadow: 4
                    //             }
                    //         }}>
                    //             <Typography variant="h6" gutterBottom>
                    //                 AI Investment Recommendations
                    //             </Typography>
                    //             {loading ? (
                    //                 <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
                    //                     <CircularProgress />
                    //                 </Box>
                    //             ) : (
                    //                 <Typography
                    //                     component="div"
                    //                     sx={{
                    //                         whiteSpace: 'pre-line',
                    //                         p: 2,
                    //                         borderRadius: 1,
                    //                         bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'
                    //                     }}
                    //                 >
                    //                     {recommendations}
                    //                 </Typography>
                    //             )}
                    //         </Paper>
                    //     </Grid>
                    // </Grid>

//                     {/* Sell Dialog */}
//                     <Dialog
//                         open={Boolean(selectedSellStock)}
//                         onClose={() => setSelectedSellStock(null)}
//                         PaperProps={{
//                             sx: {
//                                 borderRadius: 2,
//                                 minWidth: 300
//                             }
//                         }}
//                     >
//                         <DialogTitle>
//                             Sell {selectedSellStock?.symbol}
//                         </DialogTitle>
//                         <DialogContent>
//                             <TextField
//                                 type="number"
//                                 label="Number of shares to sell"
//                                 value={sellShares}
//                                 onChange={(e) => setSellShares(e.target.value)}
//                                 fullWidth
//                                 margin="normal"
//                                 inputProps={{
//                                     max: selectedSellStock?.shares,
//                                     min: 1
//                                 }}
//                             />
//                         </DialogContent>
//                         <DialogActions sx={{ p: 2 }}>
//                             <Button onClick={() => setSelectedSellStock(null)}>
//                                 Cancel
//                             </Button>
//                             <Button
//                                 onClick={handleSellStock}
//                                 variant="contained"
//                                 color="error"
//                                 disabled={!sellShares || sellShares > selectedSellStock?.shares}
//                             >
//                                 Sell
//                             </Button>
//                         </DialogActions>
//                     </Dialog>
//             </Container>
//         </PageTransition>
//     );
// };

// export default InvestmentDashboard;
































import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    Paper,
    TextField,
    Button,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    IconButton,
    useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeMode } from '../components/style/ThemeProvider';
import PageTransition from '../components/style/PageTransition';
import StatisticsCard from '../components/style/StatisticsCard';
import PortfolioChart from './portfolioChart';
import StockHistory from './StockHistory';
// Add this import at the top of your file, with the other imports
import { stockService } from '../services/stockService';
// Add this with your other imports
import { aiService } from '../services/aiService';

// ... rest of your code remains the same ...

const InvestmentDashboard = () => {
    // State declarations
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchError, setSearchError] = useState('');
    const [searchLoading, setSearchLoading] = useState(false);
    const [portfolio, setPortfolio] = useState({
        stocks: [],
        totalValue: 0,
        totalInvestment: 0,
        totalReturns: 0
    });
    const [selectedStock, setSelectedStock] = useState(null);
    const [shares, setShares] = useState('');
    const [sellShares, setSellShares] = useState('');
    const [selectedSellStock, setSelectedSellStock] = useState(null);
    const [recommendations, setRecommendations] = useState('');
    const [loading, setLoading] = useState(true);

    const theme = useTheme();
    const { mode, toggleTheme } = useThemeMode();

    // Helper functions for formatting
    const formatCurrency = (value) => {
        if (isNaN(value) || value === null || value === undefined) {
            return '$0.00';
        }
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    };
    const formatNumber = (value) => {
        if (value === undefined || value === null) return '0';
        return Number(value).toFixed(2);
    };

    // Fetch portfolio data
    useEffect(() => {
        fetchPortfolio();
    }, []);

    const fetchRecommendations = async () => {
                if (!portfolio || !portfolio.stocks || portfolio.stocks.length === 0) {
                    setRecommendations("Add some stocks to your portfolio to get AI recommendations.");
                    return;
                }
        
                setLoading(true);
                try {
                    const riskProfile = 'moderate'; // This could be user-defined
                    const recommendations = await aiService.getInvestmentRecommendations(
                        portfolio,
                        riskProfile
                    );
                    setRecommendations(recommendations);
                } catch (error) {
                    console.error('Error fetching recommendations:', error);
                } finally {
                    setLoading(false);
                }
            };
    
    // Add this useEffect to trigger recommendations when portfolio changes
    useEffect(() => {
        if (portfolio) {
            fetchRecommendations();
        }
    }, [portfolio]);

    // const fetchPortfolio = async () => {
    //     try {
    //         setLoading(true);
    //         const response = await fetch('http://localhost:5000/api/portfolio', {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${localStorage.getItem('token')}`
    //             }
    //         });

    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }

    //         const data = await response.json();
    //         if (data.success) {
    //             setPortfolio(data.portfolio);
    //         } else {
    //             console.error('Error in portfolio data:', data.message);
    //         }
    //         console.log('Fetched portfolio data:', data);
    //     } catch (error) {
    //         console.error('Error fetching portfolio:', error.message);
    //         setPortfolio({
    //             stocks: [],
    //             totalValue: 0,
    //             totalInvestment: 0,
    //             totalReturns: 0
    //         });
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const fetchPortfolio = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/api/portfolio', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            if (data.success) {
                setPortfolio(data.portfolio);
            } else {
                console.error('Error in portfolio data:', data.message);
                // Initialize an empty portfolio if no data is returned
                setPortfolio({
                    stocks: [],
                    totalValue: 0,
                    totalInvestment: 0,
                    totalReturns: 0
                });
            }
            console.log('Fetched portfolio data:', data);
        } catch (error) {
            console.error('Error fetching portfolio:', error.message);
            // Initialize an empty portfolio if an error occurs
            setPortfolio({
                stocks: [],
                totalValue: 0,
                totalInvestment: 0,
                totalReturns: 0
            });
        } finally {
            setLoading(false);
        }
    };

    // const handleSearch = async () => {
    //     if (!searchQuery.trim()) return;

    //     setSearchLoading(true);
    //     setSearchError('');
    //     try {
    //         const response = await fetch(`http://localhost:5000/api/stocks/search?query=${searchQuery}`, {
    //             headers: {
    //                 'Authorization': `Bearer ${localStorage.getItem('token')}`
    //             }
    //         });
    //         const data = await response.json();
    //         if (response.ok) {
    //             setSearchResults(data);
    //         } else {
    //             setSearchError(data.message);
    //         }
    //     } catch (error) {
    //         setSearchError('Error searching stocks');
    //         console.error('Error:', error);
    //     } finally {
    //         setSearchLoading(false);
    //     }
    // };

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
    
        setSearchLoading(true);
        setSearchError('');
        try {
            const results = await stockService.searchStocks(searchQuery);
            if (results.length === 0) {
                setSearchError('No stocks found. Try a different search term.');
            } else {
                setSearchResults(results);
                setSearchError('');
            }
        } catch (error) {
            console.error('Search error:', error);
            setSearchError(error.message || 'Error searching for stocks. Please try again.');
        } finally {
            setSearchLoading(false);
        }
    };

    const handleStockSelect = (stock) => {
        setSelectedStock(stock);
        setSearchResults([]);
        setSearchQuery('');
    };

    // const handleBuyStock = async () => {
    //     if (!selectedStock || !shares) return;

    //     try {
    //         const response = await fetch('http://localhost:5000/api/portfolio/buy', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${localStorage.getItem('token')}`
    //             },
    //             body: JSON.stringify({
    //                 symbol: selectedStock['1. symbol'],
    //                 companyName: selectedStock['2. name'],
    //                 shares: Number(shares),
    //                 price: Number(selectedStock.quote?.['05. price'])
    //             })
    //         });

    //         if (response.ok) {
    //             await fetchPortfolio();
    //             setShares('');
    //             setSelectedStock(null);
    //         } else {
    //             const error = await response.json();
    //             console.error('Error buying stock:', error.message);
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };

    // const handleBuyStock = async () => {
    //     if (!selectedStock || !shares) return;
    
    //     try {
    //         const quote = await stockService.getStockQuote(selectedStock['1. symbol']);
    //         if (!quote) {
    //             throw new Error('Could not fetch current stock price');
    //         }
    
    //         const currentPrice = Number(quote['05. price']);
            
    //         const response = await fetch('http://localhost:5000/api/portfolio/buy', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${localStorage.getItem('token')}`
    //             },
    //             body: JSON.stringify({
    //                 symbol: selectedStock['1. symbol'],
    //                 companyName: selectedStock['2. name'],
    //                 shares: Number(shares),
    //                 averageBuyPrice: currentPrice,
    //                 currentPrice: currentPrice,
    //                 price: currentPrice
    //             })
    //         });
    
    //         if (!response.ok) {
    //             const errorData = await response.json();
    //             throw new Error(errorData.message || 'Failed to buy stock');
    //         }
    
    //         // Force refresh the portfolio data
    //         await fetchPortfolio();
    //         setShares('');
    //         setSelectedStock(null);
            
    //         // Trigger AI recommendations
    //         fetchRecommendations();
    //         await updatePortfolioValues();
    //     } catch (error) {
    //         console.error('Error buying stock:', error);
    //     }
    // };

    const handleBuyStock = async () => {
        if (!selectedStock || !shares) return;
    
        try {
            const quote = await stockService.getStockQuote(selectedStock['1. symbol']);
            if (!quote) {
                throw new Error('Could not fetch current stock price');
            }
    
            const currentPrice = Number(quote['05. price']);
    
            const response = await fetch('http://localhost:5000/api/portfolio/buy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    symbol: selectedStock['1. symbol'],
                    companyName: selectedStock['2. name'],
                    shares: Number(shares),
                    price: currentPrice
                })
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to buy stock');
            }
    
            // Force refresh the portfolio data
            await fetchPortfolio();
            setShares('');
            setSelectedStock(null);
    
            // Trigger AI recommendations
            fetchRecommendations();
            await updatePortfolioValues();
        } catch (error) {
            console.error('Error buying stock:', error);
        }
    };

    const handleSellStock = async () => {
        if (!selectedSellStock || !sellShares) return;

        try {
            const response = await fetch('http://localhost:5000/api/portfolio/sell', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    symbol: selectedSellStock.symbol,
                    shares: Number(sellShares),
                    price: selectedSellStock.currentPrice
                })
            });

            if (response.ok) {
                await fetchPortfolio();
                setSellShares('');
                setSelectedSellStock(null);
            } else {
                const error = await response.json();
                console.error('Error selling stock:', error.message);
            }
        await updatePortfolioValues(); // Update portfolio values after selling

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const updatePortfolioValues = async () => {
        console.log('Updating portfolio values'); // Add this log
        try {
            const response = await fetch('http://localhost:5000/api/portfolio/update-values', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log('Updated portfolio:', data); // Add this log
            setPortfolio(data);
        } catch (error) {
            console.error('Error updating portfolio values:', error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            updatePortfolioValues(); // Update portfolio values every 5 minutes
        }, 5 * 60 * 1000); // 5 minutes in milliseconds
    
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <PageTransition>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                {/* Header with Theme Toggle */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 4
                }}>
                    <Typography variant="h4" gutterBottom>
                        Investment Dashboard
                    </Typography>
                    <IconButton onClick={toggleTheme} color="inherit">
                        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Box>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        {/* Portfolio Statistics Cards */}
                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            <Grid item xs={12} md={4}>
                                <StatisticsCard
                                    title="Total Portfolio Value"
                                    value={formatCurrency(portfolio?.totalValue || 0)}
                                    icon={<AccountBalanceIcon />}
                                    color="primary"
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <StatisticsCard
                                    title="Total Investments"
                                    value={formatCurrency(portfolio?.totalInvestment || 0)}
                                    icon={<ShoppingCartIcon />}
                                    color="success"
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <StatisticsCard
                                    title="Total Returns"
                                    value={formatCurrency(portfolio?.totalReturns || 0)}
                                    icon={<TrendingUpIcon />}
                                    color={portfolio?.totalReturns >= 0 ? "success" : "error"}
                                />
                            </Grid>
                        </Grid>

                        {/* Main Content Grid */}
                        <Grid container spacing={3}>
                            {/* Search and Buy Section */}
                            <Grid item xs={12} md={6}>
                                <Paper sx={{ p: 3, borderRadius: 2, transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: 4
                                } }}>
                                    <Typography variant="h6" gutterBottom>
                                        Search Stocks
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                        <TextField
                                            fullWidth
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Enter stock symbol..."
                                            variant="outlined"
                                            size="small"
                                        />
                                        <Button
                                            variant="contained"
                                            onClick={handleSearch}
                                            disabled={searchLoading}
                                            startIcon={<SearchIcon />}
                                        >
                                            Search
                                        </Button>
                                    </Box>

                                    {searchLoading && (
                                        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                                            <CircularProgress />
                                        </Box>
                                    )}

                                    {searchError && (
                                        <Typography color="error" sx={{ mt: 2 }}>
                                            {searchError}
                                        </Typography>
                                    )}

                                    {!searchLoading && searchResults && searchResults.length > 0 && (
                                        <TableContainer>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Symbol</TableCell>
                                                        <TableCell>Name</TableCell>
                                                        <TableCell align="right">Action</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {searchResults.map((stock) => (
                                                        <TableRow key={stock['1. symbol']}>
                                                            <TableCell>{stock['1. symbol']}</TableCell>
                                                            <TableCell>{stock['2. name']}</TableCell>
                                                            <TableCell align="right">
                                                                <Button
                                                                    variant="outlined"
                                                                    size="small"
                                                                    onClick={() => handleStockSelect(stock)}
                                                                >
                                                                    Select
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    )}

                                    {selectedStock && (
                                        <Box sx={{ mt: 3 }}>
                                            <Typography variant="subtitle1" gutterBottom>
                                                Selected Stock: {selectedStock['2. name']} ({selectedStock['1. symbol']})
                                            </Typography>
                                            <TextField
                                                type="number"
                                                label="Number of shares"
                                                value={shares}
                                                onChange={(e) => setShares(e.target.value)}
                                                fullWidth
                                                sx={{ mt: 2 }}
                                            />
                                            <Button
                                                variant="contained"
                                                onClick={handleBuyStock}
                                                disabled={!shares}
                                                fullWidth
                                                sx={{ mt: 2 }}
                                            >
                                                Buy Shares
                                            </Button>
                                        </Box>
                                    )}
                                </Paper>
                            </Grid>

                            {/* Portfolio Table */}
                            {portfolio?.stocks && portfolio.stocks.length > 0 && (
                                <Grid item xs={12}>
                                    <Paper sx={{ p: 3, borderRadius: 2, transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: 4
                                }}}>
                                        <Typography variant="h6" gutterBottom>
                                            Your Portfolio
                                        </Typography>
                                        <TableContainer>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Symbol</TableCell>
                                                        <TableCell>Company</TableCell>
                                                        <TableCell align="right">Shares</TableCell>
                                                        <TableCell align="right">Avg. Buy Price</TableCell>
                                                        <TableCell align="right">Current Price</TableCell>
                                                        <TableCell align="right">Total Value</TableCell>
                                                        <TableCell align="right">Returns</TableCell>
                                                        <TableCell align="right">Actions</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {portfolio.stocks.map((stock) => (
                                                        <TableRow key={stock.symbol}>
                                                            <TableCell>{stock.symbol}</TableCell>
                                                            <TableCell>{stock.companyName}</TableCell>
                                                            <TableCell align="right">
                                                                {formatNumber(stock.shares)}
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {formatCurrency(stock.averageBuyPrice)}
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {formatCurrency(stock.currentPrice)}
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {formatCurrency(stock.currentValue)}
                                                            </TableCell>
                                                            <TableCell 
                                                                align="right"
                                                                sx={{ 
                                                                    color: (stock.returns || 0) >= 0 
                                                                        ? 'success.main' 
                                                                        : 'error.main'
                                                                }}
                                                            >
                                                                {formatCurrency(stock.returns)}
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <Button
                                                                    variant="contained"
                                                                    color="error"
                                                                    size="small"
                                                                    onClick={() => setSelectedSellStock(stock)}
                                                                >
                                                                    Sell
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Paper>
                                </Grid>
                            )}

                            {/* Charts Section */}
                            {portfolio?.stocks && portfolio.stocks.length > 0 && (
                                <>
                                    <Grid item xs={12}>
                                        <Paper sx={{ p: 3, borderRadius: 2 , transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: 4
                                }}}>
                                            <Typography variant="h6" gutterBottom>
                                                Portfolio Performance
                                            </Typography>
                                            <PortfolioChart portfolio={portfolio} />
                                        </Paper>
                                    </Grid>
                                    {portfolio.stocks.map(stock => (
                                        <Grid item xs={12} md={6} key={stock.symbol}>
                                            <Paper sx={{ p: 3, borderRadius: 2, transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: 4
                                } }}>
                                                <Typography variant="h6" gutterBottom>
                                                    {stock.symbol} History
                                                </Typography>
                                                <StockHistory symbol={stock.symbol} />
                                            </Paper>
                                        </Grid>
                                    ))}
                                </>
                            )}
                        </Grid>
                    </>
                )}


                        <Grid item xs={12} sx={{ pt: 4 }}>
                            <Paper sx={{
                                p: 3,
                                borderRadius: 2,
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: 4
                                }
                            }}>
                                <Typography variant="h6" gutterBottom>
                                    AI Investment Recommendations
                                </Typography>
                                {loading ? (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
                                        <CircularProgress />
                                    </Box>
                                ) : (
                                    <Typography
                                        component="div"
                                        sx={{
                                            whiteSpace: 'pre-line',
                                            p: 2,
                                            borderRadius: 1,
                                            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'
                                        }}
                                    >
                                        {recommendations}
                                    </Typography>
                                )}
                            </Paper>
                        </Grid>
            

                {/* Sell Dialog */}
                <Dialog
                    open={Boolean(selectedSellStock)}
                    onClose={() => setSelectedSellStock(null)}
                >
                    <DialogTitle>
                        Sell {selectedSellStock?.symbol}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            type="number"
                            label="Number of shares to sell"
                            value={sellShares}
                            onChange={(e) => setSellShares(e.target.value)}
                            fullWidth
                            margin="normal"
                            inputProps={{
                                max: selectedSellStock?.shares,
                                min: 1
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setSelectedSellStock(null)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSellStock}
                            variant="contained"
                            color="error"
                            disabled={!sellShares || sellShares > selectedSellStock?.shares}
                        >
                            Sell
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </PageTransition>
    );
};

export default InvestmentDashboard;
