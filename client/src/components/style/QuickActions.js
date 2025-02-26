import React, { useState } from 'react';
import { 
  SpeedDial, 
  SpeedDialAction, 
  SpeedDialIcon,
  useTheme 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const actions = [
    { icon: <ShowChartIcon />, name: 'Add Investment', action: () => navigate('/investments') },
    { icon: <AccountBalanceWalletIcon />, name: 'Add Expense', action: () => navigate('/dashboard') }
  ];

  return (
    <SpeedDial
      ariaLabel="Quick Actions"
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        '& .MuiSpeedDial-fab': {
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1)'
          }
        },
        '& .MuiSpeedDialAction-fab': {
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1)'
          }
        }
      }}
      icon={<SpeedDialIcon openIcon={<AddIcon />} />}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.action}
        />
      ))}
    </SpeedDial>
  );
};

export default QuickActions;