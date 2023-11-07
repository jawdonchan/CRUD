import Typography from '@mui/material/Typography';
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

export default function Navbar(){
    const navigate = useNavigate();

    const handleUsersClick = () => {
      navigate('/users');
    }

    const handleSeatingClick = () => {
      navigate('/seatingplan');
    };
    const handleStudentlistClick = () => {
      navigate('/admin');
    };

    const handleEventsClick = () => {
      navigate('/events');
    }



      const handleLogoutClick = () => {
          // Remove the specific item from local storage
          localStorage.removeItem('username'); // Replace 'yourSessionStorageKey' with the actual key you want to remove
      
          // Make sure the key has been removed before navigating
          if (!localStorage.getItem('username')) {
              // Redirect to the login or home page
              navigate('/login'); // Replace 'login' with the path to your login page
          }   
        }   
    return (
      
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <Button color="inherit" onClick = {handleUsersClick}>User List</Button>
            {/* <Button color="inherit" onClick={handleStudentlistClick}>
              Student List
            </Button> */}
            <Button color="inherit" onClick={handleEventsClick}>
              Events
            </Button>
            <Button color="inherit" onClick={handleSeatingClick}>
              Seating
            </Button>
            <Button color="inherit" onClick={handleLogoutClick}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
    );
}