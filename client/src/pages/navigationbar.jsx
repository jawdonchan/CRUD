import Typography from '@mui/material/Typography';
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

export default function Navbar(){
    const navigate = useNavigate();

    const handleSeatingClick = () => {
      navigate('/seatingplan');
    };

    const handleAddAccountClick = () => {
        navigate('/addAccount');
      };
  
    return (
      
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <Button color="inherit" onClick={handleSeatingClick}>
              Seating
            </Button>
            <Button color="inherit" onClick={handleAddAccountClick}>
              Add New Account
            </Button>
          </Toolbar>
        </AppBar>
    );
}