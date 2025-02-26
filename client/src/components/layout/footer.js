// import React from 'react';
// import { Box, Container, Typography, IconButton, Link } from '@mui/material';
// import GitHubIcon from '@mui/icons-material/GitHub';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';

// const Footer = () => {
//     return (
//         <Box 
//             component="footer" 
//             sx={{
//                 py: 3,
//                 px: 2,
//                 mt: 'auto',
//                 backgroundColor: (theme) =>
//                     theme.palette.mode === 'light'
//                         ? theme.palette.grey[200]
//                         : theme.palette.grey[800],
//             }}
//         >
//             <Container maxWidth="lg">
//                 <Box sx={{ 
//                     display: 'flex', 
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     flexWrap: 'wrap'
//                 }}>
//                     <Typography variant="body1">
//                         © {new Date().getFullYear()} Finance Manager. All rights reserved.
//                     </Typography>
//                     <Box>
//                         <IconButton 
//                             component={Link}
//                             href="https://github.com/YourGitHubUsername"
//                             target="_blank"
//                             color="inherit"
//                         >
//                             <GitHubIcon />
//                         </IconButton>
//                         <IconButton
//                             component={Link}
//                             href="https://linkedin.com/in/YourLinkedInUsername"
//                             target="_blank"
//                             color="inherit"
//                         >
//                             <LinkedInIcon />
//                         </IconButton>
//                     </Box>
//                 </Box>
//             </Container>
//         </Box>
//     );
// };

// export default Footer;




import React from 'react';
import { Box, Container, Typography, IconButton, Link, useTheme } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useThemeMode } from '../style/ThemeProvider';

const Footer = () => {
    const { mode } = useThemeMode();
    const theme = useTheme();

    return (
        <Box 
            component="footer" 
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                background: mode === 'light' 
                    ? 'linear-gradient(90deg, #2196F3, #4CAF50)'
                    : 'linear-gradient(90deg, #1E3A8A, #065F46)',
                color: 'white',
                borderRadius: 0,
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        © {new Date().getFullYear()} Finance Manager. All rights reserved.
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton 
                            component={Link}
                            href="https://github.com/YourGitHubUsername"
                            target="_blank"
                            sx={{ 
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)'
                                }
                            }}
                        >
                            <GitHubIcon />
                        </IconButton>
                        <IconButton
                            component={Link}
                            href="https://linkedin.com/in/YourLinkedInUsername"
                            target="_blank"
                            sx={{ 
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)'
                                }
                            }}
                        >
                            <LinkedInIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;