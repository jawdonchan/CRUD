import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Seating from './seatingPlan';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Guest from './guest'; // Import your dashboard components here
import Student from './students'; // Import your dashboard components here

export default function Dashboard() {
  const navigate = useNavigate();

  const handleGuestClick = () => {
    navigate('/seatingplan');
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button color="inherit" onClick={handleGuestClick}>
            Seating
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h5">Welcome to the Dashboard</Typography>
        {/* Include your dashboard components here */}
        <Student />
      </Box>
    </div>
  );
}