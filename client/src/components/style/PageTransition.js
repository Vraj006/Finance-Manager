import React from 'react';
import { Box } from '@mui/material';

const PageTransition = ({ children }) => {
  return (
    <Box
      sx={{
        animation: 'fadeInUp 0.3s ease',
        '@keyframes fadeInUp': {
          '0%': {
            opacity: 0,
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)'
          }
        }
      }}
    >
      {children}
    </Box>
  );
};

export default PageTransition;