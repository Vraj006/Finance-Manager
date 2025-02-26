import React from 'react';
import Box from '@mui/material/Box';

const WaveBorder = ({ color, mode, position = 'bottom' }) => {
  const fillColor = color || (mode === 'light' ? '#fff' : '#121212');
  const isTop = position === 'top';
  
  return (
    <Box sx={{ 
      position: 'absolute', 
      [position]: -1, 
      left: 0, 
      right: 0, 
      height: 50, 
      overflow: 'hidden',
      transform: isTop ? 'rotate(180deg)' : 'none'
    }}>
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
          fill={fillColor} 
          fillOpacity="1" 
          d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,144C960,117,1056,107,1152,96C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
    </Box>
  );
};

export default WaveBorder;