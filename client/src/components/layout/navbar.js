// // src/components/layout/Navbar.js
// import React from 'react';
// import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
// import { Link, useNavigate } from 'react-router-dom';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const isAuthenticated = localStorage.getItem('token');

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//           Finance Manager
//         </Typography>
//         <Box>
//           {isAuthenticated ? (
//             <>
//               <Button color="inherit" component={Link} to="/">
//                 Home
//               </Button>
//               <Button color="inherit" component={Link} to="/investments">
//                 Investments
//               </Button>
//               <Button color="inherit" component={Link} to="/dashboard">
//                 Dashboard
//               </Button>
//               <Button color="inherit" onClick={handleLogout}>
//                 Logout
//               </Button>
//             </>
//           ) : (
//             <>
//               <Button color="inherit" component={Link} to="/login">
//                 Login
//               </Button>
//               <Button color="inherit" component={Link} to="/register">
//                 Register
//               </Button>
//             </>
//           )}
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;


import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  useTheme
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useThemeMode } from '../style/ThemeProvider';


const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token');
  const { mode } = useThemeMode();
  const theme = useTheme();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  
  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        background: mode === 'light' 
          ? 'linear-gradient(90deg, #2196F3, #4CAF50)'
          : 'linear-gradient(90deg, #1E3A8A, #065F46)',
        borderRadius: 0,
        zIndex: 1100
      }}
    >
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 'bold',
            fontSize: '1.5rem'
          }}
        >
          Finance Manager
        </Typography>
        <Box>
          
          {isAuthenticated ? (
            <>
              <Button 
                color="inherit" 
                component={Link} 
                to="/"
                sx={{
                  mx: 0.5,
                  fontSize:"1.1rem",
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Home
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/investments"
                sx={{
                  mx: 0.5,
                  fontSize:"1.1rem",
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Investments
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/dashboard"
                sx={{
                  mx: 0.5,
                  fontSize:"1.1rem",
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Dashboard
              </Button>
              <Button 
                color="inherit" 
                onClick={handleLogout}
                sx={{
                  ml: 0.5,
                  fontSize:"1.1rem",
                  // bgcolor: 'rgba(255, 255, 255, 0.15)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.25)'
                  }
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                color="inherit" 
                component={Link} 
                to="/login"
                sx={{
                  mx: 0.5,
                  fontSize:"1.1rem",
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Login
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/register"
                sx={{
                  ml: 0.5,
                  fontSize:"1.1rem",
                  // fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.25)'
                  }
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;