// import React from 'react';
// import { Card, CardContent, Typography, Box } from '@mui/material';

// const StatisticsCard = ({ title, value, icon, color }) => {
//   return (
//     <Card
//       sx={{ 
//         bgcolor: `${color}.light`,
//         color: `${color}.dark`,
//         position: 'relative',
//         overflow: 'hidden',
//         transition: 'all 0.3s ease',
//         '&:hover': {
//           transform: 'translateY(-4px)',
//           boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
//         }
//       }}
//     >
//       <CardContent>
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//           {icon}
//           <Typography variant="h6" sx={{ ml: 1 }}>
//             {title}
//           </Typography>
//         </Box>
//         <Typography variant="h4">
//           ${Number(value).toFixed(2)}
//         </Typography>
//       </CardContent>
//       <Box
//         sx={{
//           position: 'absolute',
//           top: -20,
//           right: -20,
//           width: 100,
//           height: 100,
//           borderRadius: '50%',
//           bgcolor: `${color}.main`,
//           opacity: 0.1
//         }}
//       />
//     </Card>
//   );
// };

// export default StatisticsCard;











import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const StatisticsCard = ({ title, value, icon, color }) => {
  return (
    <Card
      sx={{ 
        bgcolor: `${color}.light`,
        color: `${color}.dark`,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {icon}
          <Typography variant="h6" sx={{ ml: 1 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h4">
          {value}
        </Typography>
      </CardContent>
      <Box
        sx={{
          position: 'absolute',
          top: -20,
          right: -20,
          width: 100,
          height: 100,
          borderRadius: '50%',
          bgcolor: `${color}.main`,
          opacity: 0.1
        }}
      />
    </Card>
  );
};

export default StatisticsCard;