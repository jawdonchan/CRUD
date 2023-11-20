import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Seating from './seating/seatingPlan';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Guest from './student/guest'; // Import your dashboard components here
import Student from './student/students'; // Import your dashboard components here
import Navbar from './navigationbar';
export default function Dashboard() {
  const navigate = useNavigate();

//   const handleGuestClick = () => {
//     navigate('/seatingplan');
//   };

  return (
    <div>
    
        <Navbar></Navbar>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        {/* <Typography variant="h5">Welcome to the Dashboard</Typography> */}
        {/* Include your dashboard components here */}
        <Student />
      </Box>
    </div>
  );
}