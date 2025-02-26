// import React, { useState, useEffect } from 'react';
// import { 
//     Container, 
//     Grid, 
//     Paper, 
//     Typography, 
//     Box, 
//     Button, 
//     TextField, 
//     MenuItem, 
//     List, 
//     ListItem, 
//     ListItemText, 
//     Dialog, 
//     DialogTitle, 
//     DialogContent, 
//     DialogActions,
//     IconButton 
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
// import ExpenseCharts from '../components/ExpenseChart';
// import { generateBudgetTips } from '../utils/budgetAnalyzer';
// import { Alert, AlertTitle } from '@mui/material';
// import PageTransition from '../components/style/PageTransition';
// import StatisticsCard from '../components/style/StatisticsCard';
// import QuickActions from '../components/style/QuickActions';
// import { useThemeMode } from '../components/style/ThemeProvider';
// import Toast from '../components/style/Toast';
// import SkeletonLoader from '../components/style/SkeletonLoader';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
// import api from '../services/api';

// const Dashboard = () => {
//     const [expense, setExpense] = useState({
//         description: '',
//         amount: '',
//         category: 'food',
//         date: new Date().toISOString().split('T')[0]
//     });

//     const [expenses, setExpenses] = useState([]);
//     const [totalExpenses, setTotalExpenses] = useState(0);
//     const [monthlyBudget, setMonthlyBudget] = useState(0);
//     const [openBudgetDialog, setOpenBudgetDialog] = useState(false);
//     const [newBudget, setNewBudget] = useState('');
//     const [budgetTips, setBudgetTips] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
//     const { mode, toggleTheme } = useThemeMode();

//     const categories = [
//         'food', 'rent', 'utilities', 'entertainment', 'transportation', 'shopping', 'savings', 'others'
//     ];

//     // Fetch expenses and budget
//     // const fetchData = async () => {
//     //     try {
//     //         const token = localStorage.getItem('token');
//     //         const [expensesRes, budgetRes] = await Promise.all([
//     //             axios.get('http://localhost:5000/api/expenses', {
//     //                 headers: { 'x-auth-token': token }
//     //             }),
//     //             axios.get('http://localhost:5000/api/users/budget', {
//     //                 headers: { 'x-auth-token': token }
//     //             })
//     //         ]);

//     //         setExpenses(expensesRes.data);
//     //         setTotalExpenses(expensesRes.data.reduce((acc, curr) => acc + curr.amount, 0));
//     //         setMonthlyBudget(budgetRes.data.monthlyBudget);
//     //     } catch (error) {
//     //         console.error('Error fetching data:', error);
//     //     }
//     // };

//     const fetchData = async () => {
//         // try {
//         //     const [expensesRes, budgetRes] = await Promise.all([
//         //         api.get('/expenses'),
//         //         api.get('/users/budget')
//         //     ]);
    
//         //     setExpenses(expensesRes.data);
//         //     setTotalExpenses(expensesRes.data.reduce((acc, curr) => acc + curr.amount, 0));
//         //     setMonthlyBudget(budgetRes.data.monthlyBudget);
            
//         //     // Generate budget tips
//         //     const tips = generateBudgetTips(expensesRes.data, budgetRes.data.monthlyBudget);
//         //     setBudgetTips(tips);
//         // } catch (error) {
//         //     console.error('Error fetching data:', error);
//         // }
//         setLoading(true);
//         try {
//             const [expensesRes, budgetRes] = await Promise.all([
//                 api.get('/expenses'),
//                 api.get('/users/budget')
//             ]);
    
//             setExpenses(expensesRes.data);
//             setTotalExpenses(expensesRes.data.reduce((acc, curr) => acc + curr.amount, 0));
//             setMonthlyBudget(budgetRes.data.monthlyBudget);
            
//             const tips = generateBudgetTips(expensesRes.data, budgetRes.data.monthlyBudget);
//             setBudgetTips(tips);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             setToast({
//                 open: true,
//                 message: 'Error fetching data',
//                 severity: 'error'
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDeleteExpense = async (expenseId) => {
//         try {
//             await api.delete(`/expenses/${expenseId}`);
//             // Update the expenses list and total
//             const updatedExpenses = expenses.filter(exp => exp._id !== expenseId);
//             setExpenses(updatedExpenses);
//             setTotalExpenses(updatedExpenses.reduce((acc, curr) => acc + curr.amount, 0));
//         } catch (error) {
//             console.error('Error deleting expense:', error);
//         }
//     };
    

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const handleChange = (e) => {
//         setExpense({
//             ...expense,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await api.post('/expenses', expense);
//             setExpense({
//                 description: '',
//                 amount: '',
//                 category: 'food',
//                 date: new Date().toISOString().split('T')[0]
//             });
//             fetchData(); // Refresh expenses list
//         } catch (error) {
//             console.error('Error adding expense:', error);
//         }
//     };

//     const handleBudgetSubmit = async () => {
//         try {
//             await api.put('/users/budget', { monthlyBudget: Number(newBudget) });
//             setMonthlyBudget(Number(newBudget));
//             setOpenBudgetDialog(false);
//             setNewBudget('');
//         } catch (error) {
//             console.error('Error updating budget:', error);
//         }
//     };

//     if (loading) {
//         return <SkeletonLoader />;
//     }


//     return (
//         <PageTransition>
//             <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//                 {/* <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
//                     Financial Overview
//                 </Typography> */}
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
//                     <Typography variant="h4" gutterBottom>
//                         Financial Overview
//                     </Typography>
//                     <IconButton onClick={toggleTheme} color="inherit">
//                         {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
//                     </IconButton>
//                 </Box>

//                 {/* Statistics Cards */}
//                 <Grid container spacing={3} sx={{ mb: 4 }}>
//                     <Grid item xs={12} md={4}>
//                         <StatisticsCard
//                             title="Total Expenses"
//                             value={totalExpenses}
//                             icon={<MonetizationOnIcon />}
//                             color="error"
//                         />
//                     </Grid>
//                     <Grid item xs={12} md={4}>
//                         <StatisticsCard
//                             title="Monthly Budget"
//                             value={monthlyBudget}
//                             icon={<AccountBalanceIcon />}
//                             color="primary"
//                         />
//                     </Grid>
//                     <Grid item xs={12} md={4}>
//                         <StatisticsCard
//                             title="Remaining Budget"
//                             value={monthlyBudget - totalExpenses}
//                             icon={<TrendingUpIcon />}
//                             color="success"
//                         />
//                     </Grid>
//                 </Grid>

//                 {/* Add Expense Form and Recent Expenses */}
//                 <Grid container spacing={3}>
//                     <Grid item xs={12} md={6}>
//                         <Paper 
//                             elevation={3}
//                             sx={{ 
//                                 p: 3, 
//                                 borderRadius: 2,
//                                 transition: 'transform 0.2s, box-shadow 0.2s',
//                                 '&:hover': {
//                                     transform: 'translateY(-4px)',
//                                     boxShadow: 4
//                                 }
//                             }}
//                         >
//                             <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
//                                 Add New Expense
//                             </Typography>
//                             <form onSubmit={handleSubmit}>
//                                 <TextField
//                                     fullWidth
//                                     label="Description"
//                                     name="description"
//                                     value={expense.description}
//                                     onChange={handleChange}
//                                     margin="normal"
//                                     required
//                                     sx={{ mb: 2 }}
//                                 />
//                                 <TextField
//                                     fullWidth
//                                     label="Amount"
//                                     name="amount"
//                                     type="number"
//                                     value={expense.amount}
//                                     onChange={handleChange}
//                                     margin="normal"
//                                     required
//                                     sx={{ mb: 2 }}
//                                 />
//                                 <TextField
//                                     fullWidth
//                                     select
//                                     label="Category"
//                                     name="category"
//                                     value={expense.category}
//                                     onChange={handleChange}
//                                     margin="normal"
//                                     required
//                                     sx={{ mb: 2 }}
//                                 >
//                                     {categories.map((category) => (
//                                         <MenuItem key={category} value={category}>
//                                             {category.charAt(0).toUpperCase() + category.slice(1)}
//                                         </MenuItem>
//                                     ))}
//                                 </TextField>
//                                 <TextField
//                                     fullWidth
//                                     label="Date"
//                                     name="date"
//                                     type="date"
//                                     value={expense.date}
//                                     onChange={handleChange}
//                                     margin="normal"
//                                     required
//                                     sx={{ mb: 3 }}
//                                 />
//                                 <Button
//                                     type="submit"
//                                     variant="contained"
//                                     color="primary"
//                                     fullWidth
//                                     sx={{ 
//                                         py: 1.5,
//                                         textTransform: 'none',
//                                         fontSize: '1.1rem'
//                                     }}
//                                 >
//                                     Add Expense
//                                 </Button>
//                             </form>
//                         </Paper>
//                     </Grid>

//                     <Grid item xs={12} md={6}>
//                         <Paper 
//                             elevation={3}
//                             sx={{ 
//                                 p: 3, 
//                                 borderRadius: 2,
//                                 maxHeight: 480,
//                                 overflow: 'auto',
//                                 transition: 'transform 0.2s, box-shadow 0.2s',
//                                 '&:hover': {
//                                     transform: 'translateY(-4px)',
//                                     boxShadow: 4
//                                 }
//                             }}
//                         >
//                             <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
//                                 Recent Expenses
//                             </Typography>
//                             <List>
//                                 {expenses.length > 0 ? (
//                                     expenses.map((exp) => (
//                                         <ListItem 
//                                             key={exp._id} 
//                                             divider
//                                             sx={{
//                                                 transition: 'background-color 0.2s',
//                                                 '&:hover': {
//                                                     backgroundColor: 'rgba(0, 0, 0, 0.04)'
//                                                 }
//                                             }}
//                                             secondaryAction={
//                                                 <IconButton 
//                                                     edge="end" 
//                                                     aria-label="delete"
//                                                     onClick={() => handleDeleteExpense(exp._id)}
//                                                     sx={{ 
//                                                         color: 'error.main',
//                                                         '&:hover': {
//                                                             color: 'error.dark'
//                                                         }
//                                                     }}
//                                                 >
//                                                     <DeleteIcon />
//                                                 </IconButton>
//                                             }
//                                         >
//                                             <ListItemText
//                                                 primary={exp.description}
//                                                 secondary={`${exp.category} - ${new Date(exp.date).toLocaleDateString()}`}
//                                             />
//                                             <Typography variant="body1" sx={{ mr: 2, fontWeight: 'medium' }}>
//                                                 ${exp.amount.toFixed(2)}
//                                             </Typography>
//                                         </ListItem>
//                                     ))
//                                 ) : (
//                                     <Typography color="textSecondary" align="center">
//                                         No expenses recorded yet
//                                     </Typography>
//                                 )}
//                             </List>
//                         </Paper>
//                     </Grid>
//                 </Grid>

//                 {/* Budget Tips */}
//                 <Grid item xs={12} sx={{ mt: 3 }}>
//                     <Paper 
//                         elevation={3}
//                         sx={{ 
//                             p: 3, 
//                             borderRadius: 2,
//                             transition: 'transform 0.2s, box-shadow 0.2s',
//                             '&:hover': {
//                                 transform: 'translateY(-4px)',
//                                 boxShadow: 4
//                             }
//                         }}
//                     >
//                         <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
//                             Smart Budget Tips
//                         </Typography>
//                         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//                             {budgetTips.map((tip, index) => (
//                                 <Alert 
//                                     key={index} 
//                                     severity={tip.type}
//                                     sx={{ 
//                                         '& .MuiAlert-message': { width: '100%' },
//                                         transition: 'transform 0.2s',
//                                         '&:hover': {
//                                             transform: 'translateX(8px)'
//                                         }
//                                     }}
//                                 >
//                                     <AlertTitle>
//                                         {tip.type === 'warning' ? 'Warning' : 
//                                          tip.type === 'success' ? 'Good News' : 'Tip'}
//                                     </AlertTitle>
//                                     {tip.message}
//                                 </Alert>
//                             ))}
//                         </Box>
//                     </Paper>
//                 </Grid>

//                 {/* Charts */}
//                 <Grid item xs={12} sx={{ mt: 3 }}>
//                     <Paper 
//                         elevation={3}
//                         sx={{ 
//                             p: 3, 
//                             borderRadius: 2,
//                             transition: 'transform 0.2s, box-shadow 0.2s',
//                             '&:hover': {
//                                 transform: 'translateY(-4px)',
//                                 boxShadow: 4
//                             }
//                         }}
//                     >
//                         <ExpenseCharts expenses={expenses} />
//                     </Paper>
//                 </Grid>

//                 <QuickActions />

//                 {/* Budget Update Dialog */}
//                 <Dialog open={openBudgetDialog} onClose={() => setOpenBudgetDialog(false)}>
//                     <DialogTitle>Update Monthly Budget</DialogTitle>
//                     <DialogContent>
//                         <TextField
//                             autoFocus
//                             margin="dense"
//                             label="Monthly Budget"
//                             type="number"
//                             fullWidth
//                             value={newBudget}
//                             onChange={(e) => setNewBudget(e.target.value)}
//                         />
//                     </DialogContent>
//                     <DialogActions>
//                         <Button onClick={() => setOpenBudgetDialog(false)}>Cancel</Button>
//                         <Button onClick={handleBudgetSubmit} variant="contained">
//                             Update
//                         </Button>
//                     </DialogActions>
//                 </Dialog>

//                 <Toast
//                     open={toast.open}
//                     handleClose={() => setToast({ ...toast, open: false })}
//                     message={toast.message}
//                     severity={toast.severity}
//                 />
//             </Container>
//         </PageTransition>
//     );
// };

// export default Dashboard;








import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Grid, 
    Paper, 
    Typography, 
    Box, 
    Button, 
    TextField, 
    MenuItem, 
    List, 
    ListItem, 
    ListItemText, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions,
    IconButton 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ExpenseCharts from '../components/ExpenseChart';
import { generateBudgetTips } from '../utils/budgetAnalyzer';
import { Alert, AlertTitle } from '@mui/material';
import PageTransition from '../components/style/PageTransition';
import StatisticsCard from '../components/style/StatisticsCard';
import QuickActions from '../components/style/QuickActions';
import { useThemeMode } from '../components/style/ThemeProvider';
import Toast from '../components/style/Toast';
import SkeletonLoader from '../components/style/SkeletonLoader';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import api from '../services/api';

const Dashboard = () => {
    const [expense, setExpense] = useState({
        description: '',
        amount: '',
        category: 'food',
        date: new Date().toISOString().split('T')[0]
    });

    const [expenses, setExpenses] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [monthlyBudget, setMonthlyBudget] = useState(0);
    const [openBudgetDialog, setOpenBudgetDialog] = useState(false);
    const [openInitialBudgetDialog, setOpenInitialBudgetDialog] = useState(false);
    const [newBudget, setNewBudget] = useState('');
    const [budgetTips, setBudgetTips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
    const { mode, toggleTheme } = useThemeMode();

    const categories = [
        'food', 'rent', 'utilities', 'entertainment', 'transportation', 'shopping', 'savings', 'others'
    ];

    const fetchData = async () => {
        setLoading(true);
        try {
            const [expensesRes, budgetRes] = await Promise.all([
                api.get('/expenses'),
                api.get('/users/budget')
            ]);
    
            setExpenses(expensesRes.data);
            setTotalExpenses(expensesRes.data.reduce((acc, curr) => acc + curr.amount, 0));
            setMonthlyBudget(budgetRes.data.monthlyBudget);
            
            // Check if user has set a budget yet
            if (budgetRes.data.monthlyBudget === 0) {
                setOpenInitialBudgetDialog(true);
            }
            
            const tips = generateBudgetTips(expensesRes.data, budgetRes.data.monthlyBudget);
            setBudgetTips(tips);
        } catch (error) {
            console.error('Error fetching data:', error);
            setToast({
                open: true,
                message: 'Error fetching data',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteExpense = async (expenseId) => {
        try {
            await api.delete(`/expenses/${expenseId}`);
            // Update the expenses list and total
            const updatedExpenses = expenses.filter(exp => exp._id !== expenseId);
            setExpenses(updatedExpenses);
            setTotalExpenses(updatedExpenses.reduce((acc, curr) => acc + curr.amount, 0));
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {
        setExpense({
            ...expense,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/expenses', expense);
            setExpense({
                description: '',
                amount: '',
                category: 'food',
                date: new Date().toISOString().split('T')[0]
            });
            fetchData(); // Refresh expenses list
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    const handleBudgetSubmit = async () => {
        if (!newBudget || isNaN(Number(newBudget)) || Number(newBudget) <= 0) {
            setToast({
                open: true,
                message: 'Please enter a valid budget amount',
                severity: 'error'
            });
            return;
        }

        try {
            await api.put('/users/budget', { monthlyBudget: Number(newBudget) });
            setMonthlyBudget(Number(newBudget));
            setOpenBudgetDialog(false);
            setOpenInitialBudgetDialog(false);
            setToast({
                open: true,
                message: 'Budget updated successfully!',
                severity: 'success'
            });
            setNewBudget('');
        } catch (error) {
            console.error('Error updating budget:', error);
            setToast({
                open: true,
                message: 'Error updating budget',
                severity: 'error'
            });
        }
    };

    const handleOpenBudgetDialog = () => {
        setNewBudget(monthlyBudget.toString());
        setOpenBudgetDialog(true);
    };

    if (loading) {
        return <SkeletonLoader />;
    }

    return (
        <PageTransition>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Financial Overview
                    </Typography>
                    <Box>
                        <Button 
                            variant="outlined" 
                            color="primary" 
                            onClick={handleOpenBudgetDialog}
                            sx={{ mr: 2 }}
                        >
                            Update Budget
                        </Button>
                        <IconButton onClick={toggleTheme} color="inherit">
                            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </Box>
                </Box>

                {/* Statistics Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={4}>
                        <StatisticsCard
                            title="Total Expenses"
                            value={totalExpenses}
                            icon={<MonetizationOnIcon />}
                            color="error"
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <StatisticsCard
                            title="Monthly Budget"
                            value={monthlyBudget}
                            icon={<AccountBalanceIcon />}
                            color="primary"
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <StatisticsCard
                            title="Remaining Budget"
                            value={monthlyBudget - totalExpenses}
                            icon={<TrendingUpIcon />}
                            color="success"
                        />
                    </Grid>
                </Grid>

                {/* Add Expense Form and Recent Expenses */}
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Paper 
                            elevation={3}
                            sx={{ 
                                p: 3, 
                                borderRadius: 2,
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: 4
                                }
                            }}
                        >
                            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                                Add New Expense
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    name="description"
                                    value={expense.description}
                                    onChange={handleChange}
                                    margin="normal"
                                    required
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    label="Amount"
                                    name="amount"
                                    type="number"
                                    value={expense.amount}
                                    onChange={handleChange}
                                    margin="normal"
                                    required
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    select
                                    label="Category"
                                    name="category"
                                    value={expense.category}
                                    onChange={handleChange}
                                    margin="normal"
                                    required
                                    sx={{ mb: 2 }}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category} value={category}>
                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    fullWidth
                                    label="Date"
                                    name="date"
                                    type="date"
                                    value={expense.date}
                                    onChange={handleChange}
                                    margin="normal"
                                    required
                                    sx={{ mb: 3 }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ 
                                        py: 1.5,
                                        textTransform: 'none',
                                        fontSize: '1.1rem'
                                    }}
                                >
                                    Add Expense
                                </Button>
                            </form>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper 
                            elevation={3}
                            sx={{ 
                                p: 3, 
                                borderRadius: 2,
                                maxHeight: 480,
                                overflow: 'auto',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: 4
                                }
                            }}
                        >
                            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                                Recent Expenses
                            </Typography>
                            <List>
                                {expenses.length > 0 ? (
                                    expenses.map((exp) => (
                                        <ListItem 
                                            key={exp._id} 
                                            divider
                                            sx={{
                                                transition: 'background-color 0.2s',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                                }
                                            }}
                                            secondaryAction={
                                                <IconButton 
                                                    edge="end" 
                                                    aria-label="delete"
                                                    onClick={() => handleDeleteExpense(exp._id)}
                                                    sx={{ 
                                                        color: 'error.main',
                                                        '&:hover': {
                                                            color: 'error.dark'
                                                        }
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            }
                                        >
                                            <ListItemText
                                                primary={exp.description}
                                                secondary={`${exp.category} - ${new Date(exp.date).toLocaleDateString()}`}
                                            />
                                            <Typography variant="body1" sx={{ mr: 2, fontWeight: 'medium' }}>
                                                ${exp.amount.toFixed(2)}
                                            </Typography>
                                        </ListItem>
                                    ))
                                ) : (
                                    <Typography color="textSecondary" align="center">
                                        No expenses recorded yet
                                    </Typography>
                                )}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Budget Tips */}
                <Grid item xs={12} sx={{ mt: 3 }}>
                    <Paper 
                        elevation={3}
                        sx={{ 
                            p: 3, 
                            borderRadius: 2,
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: 4
                            }
                        }}
                    >
                        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                            Smart Budget Tips
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {budgetTips.map((tip, index) => (
                                <Alert 
                                    key={index} 
                                    severity={tip.type}
                                    sx={{ 
                                        '& .MuiAlert-message': { width: '100%' },
                                        transition: 'transform 0.2s',
                                        '&:hover': {
                                            transform: 'translateX(8px)'
                                        }
                                    }}
                                >
                                    <AlertTitle>
                                        {tip.type === 'warning' ? 'Warning' : 
                                         tip.type === 'success' ? 'Good News' : 'Tip'}
                                    </AlertTitle>
                                    {tip.message}
                                </Alert>
                            ))}
                        </Box>
                    </Paper>
                </Grid>

                {/* Charts */}
                <Grid item xs={12} sx={{ mt: 3 }}>
                    <Paper 
                        elevation={3}
                        sx={{ 
                            p: 3, 
                            borderRadius: 2,
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: 4
                            }
                        }}
                    >
                        <ExpenseCharts expenses={expenses} />
                    </Paper>
                </Grid>

                <QuickActions />

                {/* Budget Update Dialog */}
                <Dialog open={openBudgetDialog} onClose={() => setOpenBudgetDialog(false)}>
                    <DialogTitle>Update Monthly Budget</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Monthly Budget"
                            type="number"
                            fullWidth
                            value={newBudget}
                            onChange={(e) => setNewBudget(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenBudgetDialog(false)}>Cancel</Button>
                        <Button onClick={handleBudgetSubmit} variant="contained">
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Initial Budget Setup Dialog */}
                <Dialog 
                    open={openInitialBudgetDialog} 
                    onClose={() => {}} // Empty function to prevent closing by clicking outside
                    disableEscapeKeyDown // Prevent closing with ESC key
                >
                    <DialogTitle>Welcome! Set Your Monthly Budget</DialogTitle>
                    <DialogContent>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            To help you track your finances, please set your monthly budget. 
                            This will help us provide personalized spending insights.
                        </Typography>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Monthly Budget"
                            type="number"
                            fullWidth
                            value={newBudget}
                            onChange={(e) => setNewBudget(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleBudgetSubmit} variant="contained" fullWidth>
                            Set Budget
                        </Button>
                    </DialogActions>
                </Dialog>

                <Toast
                    open={toast.open}
                    handleClose={() => setToast({ ...toast, open: false })}
                    message={toast.message}
                    severity={toast.severity}
                />
            </Container>
        </PageTransition>
    );
};

export default Dashboard;